import React from 'react';
import jsPDF from 'jspdf';
import { Settings } from '../../Settings';
import { SoftStat } from '../../typing/SoftStat';
import { pt } from '../../utils/convertDistance';
import { FramePDF, FrameProps, FrameSVG } from './generic/Frame';
import { TextPDF, TextProps, TextSVG } from './generic/Text';
import {
	SoftStatBaseRatingLayout,
	SoftStatBaseRatingPDF,
	SoftStatBaseRatingProps,
	SoftStatBaseRatingSVG,
} from './SoftStatBaseRating';
import { SoftStatModifierPDF, SoftStatModifierProps, SoftStatModifierSVG } from './SoftStatModifier';

export interface SoftStatBlockProps {
	attribute: string;
	stat: SoftStat;
	x: number;
	y: number;
	accentColor: string;
	isComponent: boolean;
}

export class SoftStatBlockLayout {
	static innerMargin = pt(0.5, 'mm');
	static innerWidth = Settings.STAT_BLOCK_WIDTH - (2 * SoftStatBlockLayout.innerMargin);
	static headerHeight = pt(1.9, 'mm');

	static calcHeight(stat: SoftStat): number {
		let height = 0;
		height += SoftStatBlockLayout.headerHeight;
		height += Settings.STROKE_WIDTH;
		height += Settings.SOFT_STAT_PRIMARY_RATING_HEIGHT;
		height += (Settings.STROKE_WIDTH + Settings.SOFT_STAT_SECONDARY_RATING_HEIGHT) * stat.modifiers.length;
		height += Settings.STROKE_WIDTH; // Bottom space
		height += Settings.STROKE_WIDTH; // Bottom border
		return height;
	}

	static calcModifierY(i: number, yStart = 0): number {
		let y = 0;
		y += yStart;
		y += SoftStatBlockLayout.headerHeight;
		y += Settings.STROKE_WIDTH;
		y += Settings.SOFT_STAT_PRIMARY_RATING_HEIGHT;
		y += Settings.STROKE_WIDTH;
		y += i * (Settings.SOFT_STAT_SECONDARY_RATING_HEIGHT + Settings.STROKE_WIDTH);
		return y;
	};

	attribute: string;
	stat: SoftStat;
	x: number;
	y: number;
	width: number = Settings.STAT_BLOCK_WIDTH;
	accentColor: string;
	isComponent: boolean;

	constructor(props: SoftStatBlockProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
		});
	}

	get height(): number {
		let height = 0;
		height += SoftStatBlockLayout.headerHeight;
		height += Settings.STROKE_WIDTH;
		height += Settings.SOFT_STAT_PRIMARY_RATING_HEIGHT;
		height += (Settings.STROKE_WIDTH + Settings.SOFT_STAT_SECONDARY_RATING_HEIGHT) * this.stat.modifiers.length;
		height += Settings.STROKE_WIDTH; // Bottom space
		height += Settings.STROKE_WIDTH; // Bottom border
		return height;
	}

	get frameProps(): FrameProps {
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			radius: Settings.CORNER_RADIUS,
			border: {
				top: SoftStatBlockLayout.headerHeight,
			},
			stroke: this.accentColor,
		};
	}

	get headerProps(): TextProps {
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: SoftStatBlockLayout.headerHeight,
			text: this.attribute === 'hitOn' ? 'IS HIT ON' : this.attribute.toUpperCase(),
			fontSize: Settings.STAT_HEADER_FONT_SIZE,
			color: '#FFFFFF',
			font: 'OpenSans-Bold',
			align: 'center',
			lineHeight: SoftStatBlockLayout.headerHeight,
		};
	}

	get softStatBaseRatingProps(): SoftStatBaseRatingProps {
		const ratingEnum = SoftStatBaseRatingLayout.getRatingEnum(this.attribute);
		const numberEnum = SoftStatBaseRatingLayout.getNumberEnum(this.attribute);
		const baseRating = this.stat.baseRating;

		return {
			x: this.x + pt(0.5, 'mm'),
			y: this.y + SoftStatBlockLayout.headerHeight + Settings.STROKE_WIDTH,
			label: !this.isComponent ? `${ratingEnum[ baseRating ]}`.toUpperCase() : 'AS PER UNIT',
			value: !this.isComponent && numberEnum[ baseRating ],
		};
	}

	getSoftStatModifierProps(i: number): SoftStatModifierProps {
		return {
			x: this.x + pt(0.5, 'mm'),
			y: SoftStatBlockLayout.calcModifierY(i, this.y),
			modifier: this.stat.modifiers[ i ],
		};
	}
}

export const SoftStatBlockSVG: React.FC<SoftStatBlockProps> = (props: SoftStatBlockProps) => {
	const layout = new SoftStatBlockLayout(props);
	return (
		<>
			<FrameSVG {...layout.frameProps} />
			<TextSVG {...layout.headerProps} />
			<SoftStatBaseRatingSVG {...layout.softStatBaseRatingProps} />
			{props.stat.modifiers.map((_modifier, i) => (
				<SoftStatModifierSVG key={i} {...layout.getSoftStatModifierProps(i)} />
			))}
		</>
	);
};

export const SoftStatBlockPDF = (doc: jsPDF, props: SoftStatBlockProps) => {
	const layout = new SoftStatBlockLayout(props);
	FramePDF(doc, layout.frameProps);
	TextPDF(doc, layout.headerProps);
	SoftStatBaseRatingPDF(doc, layout.softStatBaseRatingProps);
	props.stat.modifiers.forEach((_modifier, i) => (
		SoftStatModifierPDF(doc, layout.getSoftStatModifierProps(i))
	));
};
