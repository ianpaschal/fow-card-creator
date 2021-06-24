/* eslint-disable max-len */
import jsPDF from 'jspdf';
import React from 'react';
import { LabeledRectangle, LabeledRectangleProps } from './generic/LabeledRectangle.old';
import { RoundedRectangle, RoundedRectangleProps, RoundedRectangleSVG } from '../../drawing/RoundedRectangle';
import { UnitTypes } from '../../enums/UnitTypes';
import { Settings } from '../../Settings';
import { Unit } from '../../typing/Unit';
import { pt } from '../../utils/convertDistance';
import { RectangleRoundedProps } from './generic/Frame';

export interface Area {
	x: number;
	y: number;
	w: number;
	h: number;
}

export interface SaveBlockProps {
	unit: Unit;
	y: number;
}

export class SaveBlockLayout {
	unit: Unit;
	x: number = Settings.CARD_WIDTH - (Settings.CARD_MARGINS + Settings.STAT_BLOCK_WIDTH);
	y: number;

	private static innerBlockMargin: number = pt(0.5, 'mm');

	static height: number = Settings.STAT_BLOCK_HEADER_HEIGHT + 3 * Settings.STROKE_WIDTH + Settings.ARMOR_RATING_MISC_HEIGHT;

	constructor(props: SaveBlockProps) {
		this.unit = props.unit;
		this.y = props.y;
	}

	get outerArea(): RectangleRoundedProps {
		return {
			x: this.x,
			y: this.y,
			w: Settings.STAT_BLOCK_WIDTH,
			h: SaveBlockLayout.height,
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
		return 'SAVE';
	}

	get nameArea(): RoundedRectangleProps {
		return {
			x: this.x + Settings.STAT_BLOCK_INNER_MARGIN,
			y: this.y + Settings.STAT_BLOCK_HEADER_HEIGHT + Settings.STROKE_WIDTH,
			w: pt(16, 'mm'),
			h: Settings.ARMOR_RATING_MISC_HEIGHT,
			r: Settings.CORNER_RADIUS - Settings.STAT_BLOCK_INNER_MARGIN,
			fill: this.unit.accentColor,
		};
	}
}

export const SaveBlockPDF = (doc: jsPDF, props: SaveBlockProps) => {
	const layout = new SaveBlockLayout(props);
	LabeledRectangle.PDF(doc, layout.frameProps);
	RoundedRectangle.PDF(doc, layout.nameArea);
};

export const SaveBlockSVG: React.FC<SaveBlockProps> = (props: SaveBlockProps) => {
	const layout = new SaveBlockLayout(props);
	return (
		<>
			<LabeledRectangle.SVG {...layout.frameProps} />
			<RoundedRectangle.SVG {...layout.nameArea} />
		</>
	);
};
