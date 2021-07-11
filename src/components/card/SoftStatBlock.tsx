import React from 'react';
import jsPDF from 'jspdf';
import { CardSettings } from '../../CardSettings';
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
	SoftStatModifierLayout,
	SoftStatModifierPDF,
	SoftStatModifierProps,
	SoftStatModifierSVG,
} from './SoftStatModifier';
import { FontNames } from '../../enums/FontNames';

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
	static headerHeight: number = pt(1.9, 'mm');
	static innerMargin: number = pt(0.5, 'mm');
	static width: number = pt(23, 'mm');
	static innerWidth: number = SoftStatBlockLayout.width - (2 * SoftStatBlockLayout.innerMargin);
	static headerFontSize: number = 4;

	static calcHeight(stat: SoftStat, isComponent = false): number {
		let height = 0;
		height += SoftStatBlockLayout.headerHeight;
		height += CardSettings.STROKE_WIDTH;
		height += SoftStatBaseRatingLayout.height;
		if (!isComponent) {
			height += (CardSettings.STROKE_WIDTH + SoftStatModifierLayout.height) * stat.modifiers.length;
		}
		height += CardSettings.STROKE_WIDTH; // Bottom space
		height += CardSettings.STROKE_WIDTH; // Bottom border
		return height;
	}

	constructor(readonly props: SoftStatBlockProps) {}

	get frameProps(): FrameProps {
		return {
			...this.props,
			...SoftStatBlockLayout,
			border: { top: SoftStatBlockLayout.headerHeight },
			fill: CardSettings.COLOR_WHITE,
			fillOpacity: 0.5,
			height: SoftStatBlockLayout.calcHeight(this.props.stat, this.props.isComponent),
			radius: CardSettings.CORNER_RADIUS,
			stroke: this.props.accentColor,
		};
	}

	get headerProps(): TextProps {
		return {
			...this.props,
			...SoftStatBlockLayout,
			align: 'center',
			color: CardSettings.COLOR_WHITE,
			font: FontNames.OPEN_SANS_BOLD,
			fontSize: SoftStatBlockLayout.headerFontSize,
			height: SoftStatBlockLayout.headerHeight,
			lineHeight: SoftStatBlockLayout.headerHeight,
			text: this.props.attribute === 'hitOn' ? 'IS HIT ON' : this.props.attribute.toUpperCase(),
		};
	}

	get softStatBaseRatingProps(): SoftStatBaseRatingProps {
		const ratingEnum = SoftStatBaseRatingLayout.getRatingEnum(this.props.attribute);
		const numberEnum = SoftStatBaseRatingLayout.getNumberEnum(this.props.attribute);
		const baseRating = this.props.stat.baseRating;

		return {
			label: !this.props.isComponent ? `${ratingEnum[ baseRating ]}`.toUpperCase() : 'AS PER UNIT',
			value: !this.props.isComponent && numberEnum[ baseRating ],
			x: this.props.x + pt(0.5, 'mm'),
			y: this.props.y + SoftStatBlockLayout.headerHeight + CardSettings.STROKE_WIDTH,
		};
	}

	getSoftStatModifierProps(i: number): SoftStatModifierProps {
		let y = this.props.y;
		y += SoftStatBlockLayout.headerHeight;
		y += CardSettings.STROKE_WIDTH;
		y += SoftStatBaseRatingLayout.height;
		y += CardSettings.STROKE_WIDTH;
		y += i * (SoftStatModifierLayout.height + CardSettings.STROKE_WIDTH);
		return {
			modifier: this.props.stat.modifiers[ i ],
			x: this.props.x + pt(0.5, 'mm'),
			y,
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
			{!props.isComponent && props.stat.modifiers.map((_modifier, i) => (
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
	if (!props.isComponent) {
		props.stat.modifiers.forEach((_modifier, i) => (
			SoftStatModifierPDF(doc, layout.getSoftStatModifierProps(i))
		));
	}
};
