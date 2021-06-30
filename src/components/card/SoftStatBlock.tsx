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
import {
	SoftStatModifierPDF,
	SoftStatModifierProps,
	SoftStatModifierSVG,
} from './SoftStatModifier';

// Generic
export interface SoftStatBlockProps {
	accentColor: string;
	attribute: string;
	isComponent: boolean;
	stat: SoftStat;
	x: number;
	y: number;
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

	constructor(readonly props: SoftStatBlockProps) {}

	get height(): number {
		let height = 0;
		height += SoftStatBlockLayout.headerHeight;
		height += Settings.STROKE_WIDTH;
		height += Settings.SOFT_STAT_PRIMARY_RATING_HEIGHT;
		// eslint-disable-next-line max-len
		height += (Settings.STROKE_WIDTH + Settings.SOFT_STAT_SECONDARY_RATING_HEIGHT) * this.props.stat.modifiers.length;
		height += Settings.STROKE_WIDTH; // Bottom space
		height += Settings.STROKE_WIDTH; // Bottom border
		return height;
	}

	get frameProps(): FrameProps {
		return {
			x: this.props.x,
			y: this.props.y,
			width: Settings.STAT_BLOCK_WIDTH,
			height: this.height,
			radius: Settings.CORNER_RADIUS,
			border: {
				top: SoftStatBlockLayout.headerHeight,
			},
			stroke: this.props.accentColor,
			fill: '#FFFFFF',
			fillOpacity: 0.5,
		};
	}

	get headerProps(): TextProps {
		return {
			x: this.props.x,
			y: this.props.y,
			width: Settings.STAT_BLOCK_WIDTH,
			height: SoftStatBlockLayout.headerHeight,
			text: this.props.attribute === 'hitOn' ? 'IS HIT ON' : this.props.attribute.toUpperCase(),
			fontSize: Settings.STAT_HEADER_FONT_SIZE,
			color: '#FFFFFF',
			font: 'OpenSans-Bold',
			align: 'center',
			lineHeight: SoftStatBlockLayout.headerHeight,
		};
	}

	get softStatBaseRatingProps(): SoftStatBaseRatingProps {
		const ratingEnum = SoftStatBaseRatingLayout.getRatingEnum(this.props.attribute);
		const numberEnum = SoftStatBaseRatingLayout.getNumberEnum(this.props.attribute);
		const baseRating = this.props.stat.baseRating;

		return {
			x: this.props.x + pt(0.5, 'mm'),
			y: this.props.y + SoftStatBlockLayout.headerHeight + Settings.STROKE_WIDTH,
			label: !this.props.isComponent ? `${ratingEnum[ baseRating ]}`.toUpperCase() : 'AS PER UNIT',
			value: !this.props.isComponent && numberEnum[ baseRating ],
		};
	}

	getSoftStatModifierProps(i: number): SoftStatModifierProps {
		let y = this.props.y;
		y += SoftStatBlockLayout.headerHeight;
		y += Settings.STROKE_WIDTH;
		y += Settings.SOFT_STAT_PRIMARY_RATING_HEIGHT;
		y += Settings.STROKE_WIDTH;
		y += i * (Settings.SOFT_STAT_SECONDARY_RATING_HEIGHT + Settings.STROKE_WIDTH);
		return {
			x: this.props.x + pt(0.5, 'mm'),
			y,
			modifier: this.props.stat.modifiers[ i ],
		};
	}
}

// React
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

// jsPDF
export const SoftStatBlockPDF = (doc: jsPDF, props: SoftStatBlockProps) => {
	const layout = new SoftStatBlockLayout(props);
	FramePDF(doc, layout.frameProps);
	TextPDF(doc, layout.headerProps);
	SoftStatBaseRatingPDF(doc, layout.softStatBaseRatingProps);
	props.stat.modifiers.forEach((_modifier, i) => (
		SoftStatModifierPDF(doc, layout.getSoftStatModifierProps(i))
	));
};
