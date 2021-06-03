import jsPDF from 'jspdf';
import React from 'react';
import { LabeledRectangle, LabeledRectangleProps } from '../../drawing/LabeledRectangle';
import { RoundedRectangle, RoundedRectangleProps, RoundedRectangleSVG } from '../../drawing/RoundedRectangle';
import { Settings } from '../../Settings';
import { Unit } from '../../typing/Unit';
import { pt } from '../../utils/convertDistance';
import { TextPDF, TextProps, TextSVG } from './primitives/Text';

export interface Area {
	x: number;
	y: number;
	w: number;
	h: number;
}
export interface AreaRound extends Area {
	r: number;
}

export interface ArmorBlockProps {
	unit: Unit;
	x: number;
	y: number;
}

export class ArmorBlockLayout {
	unit: Unit;
	x: number;
	y: number;

	// eslint-disable-next-line max-len
	static height: number  = Settings.STAT_BLOCK_HEADER_HEIGHT + 5 * Settings.STROKE_WIDTH + 3 * Settings.ARMOR_RATING_TANK_HEIGHT;

	constructor(props: ArmorBlockProps) {
		this.unit = props.unit;
		this.x = props.x;
		this.y = props.y;
	}

	get outerArea(): AreaRound {
		return {
			x: this.x,
			y: this.y,
			w: Settings.STAT_BLOCK_WIDTH,
			h: ArmorBlockLayout.height,
			r: Settings.CORNER_RADIUS,
		};
	}

	get innerArea(): Area {
		return { x: 0, y: 0, w: 0, h: 0 };
	}

	get frameProps(): LabeledRectangleProps {
		return {
			...this.outerArea,
			text: this.headerText,
			headerHeight: Settings.STAT_BLOCK_HEADER_HEIGHT,
			fontSize: Settings.STAT_HEADER_FONT_SIZE,
			r: Settings.CORNER_RADIUS,
			stroke: this.unit.accentColor,
			fill: '#FFFFFF',
		};
	}

	get headerText(): string {
		return 'ARMOUR';
	}

	calcRatingNameArea(i: number): RoundedRectangleProps {
		const offsetPerRating = Settings.STROKE_WIDTH + Settings.ARMOR_RATING_TANK_HEIGHT;
		return {
			x: this.x + Settings.STAT_BLOCK_INNER_MARGIN,
			y: this.y + Settings.STAT_BLOCK_HEADER_HEIGHT + Settings.STROKE_WIDTH + (i * offsetPerRating),
			w: pt(17, 'mm'),
			h: Settings.ARMOR_RATING_TANK_HEIGHT,
			r: Settings.CORNER_RADIUS - Settings.STAT_BLOCK_INNER_MARGIN,
			fill: this.unit.accentColor,
		};
	}

	calcRatingNumberArea(i: number): AreaRound {
		return { x: 0, y: 0, w: 0, h: 0, r: 0 };
	}

	getRatingLabelProps(key: string, i: number): TextProps {
		const offsetPerRating = Settings.STROKE_WIDTH + Settings.ARMOR_RATING_TANK_HEIGHT;
		const keyToLabelMappings = {
			front: 'FRONT',
			sideRear: 'SIDE & REAR',
			top: 'TOP',
		};
		return {
			x: this.x + pt(1, 'mm'),
			y: this.y + Settings.STAT_BLOCK_HEADER_HEIGHT + Settings.STROKE_WIDTH + (i * offsetPerRating),
			w: pt(15, 'mm'),
			h: Settings.ARMOR_RATING_TANK_HEIGHT,
			color: '#FFFFFF',
			font: 'OpenSans-SemiBold',
			fontSize: 7,
			text: keyToLabelMappings[ key ],
			align: 'left',
		};
	}
	getRatingValueProps(key: string, i: number): TextProps {
		const offsetPerRating = Settings.STROKE_WIDTH + Settings.ARMOR_RATING_TANK_HEIGHT;
		return {
			x: this.x + pt(18.5, 'mm'),
			y: this.y + Settings.STAT_BLOCK_HEADER_HEIGHT + Settings.STROKE_WIDTH + (i * offsetPerRating),
			w: pt(3, 'mm'),
			h: Settings.ARMOR_RATING_TANK_HEIGHT,
			color: '#000000',
			font: 'OpenSans-SemiBold',
			fontSize: 12,
			text: this.unit.armor[ key ],
			align: 'center',
		};
	}
}

export const ArmorBlockPDF = (doc: jsPDF, props: ArmorBlockProps) => {
	const layout = new ArmorBlockLayout(props);
	LabeledRectangle.PDF(doc, layout.frameProps);
	Object.keys(props.unit.armor).forEach((key, i) => {
		RoundedRectangle.PDF(doc, layout.calcRatingNameArea(i));
		TextPDF(doc, layout.getRatingLabelProps(key, i));
	});
};

export const ArmorBlockSVG: React.FC<ArmorBlockProps> = (props: ArmorBlockProps) => {
	const layout = new ArmorBlockLayout(props);
	return (
		<>
			<LabeledRectangle.SVG {...layout.frameProps} />
			{Object.keys(props.unit.armor).map((key, i) => (
				<React.Fragment key={i}>
					<RoundedRectangleSVG  {...layout.calcRatingNameArea(i)} />
					<TextSVG {...layout.getRatingLabelProps(key, i)} />
					<TextSVG {...layout.getRatingValueProps(key, i)} />
				</React.Fragment>
			))}
		</>
	);
};
