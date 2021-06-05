// static headerHeight: number = pt(4.1, 'mm');
// static x: number = Settings.CARD_MARGINS;
// static w: number = Settings.CARD_WIDTH - (2 * Settings.CARD_MARGINS);
// static r: number = Settings.CORNER_RADIUS;
// static innerWidth = WeaponsBlockLayout.width - (2 * Settings.STROKE_WIDTH);

import jsPDF from 'jspdf';
import React from 'react';
import { Settings } from '../../Settings';
import { pt } from '../../utils/convertDistance';
import { TablePDF, TableProps, TableSVG } from './generic/Table';

export interface WeaponsBlockProps {

}

export class WeaponsBlockLayout {
	static headerHeight: number = pt(4.1, 'mm');
	static x: number = Settings.CARD_MARGINS;
	static width: number = Settings.CARD_WIDTH - (2 * Settings.CARD_MARGINS);
	static r: number = Settings.CORNER_RADIUS;
	static innerWidth = WeaponsBlockLayout.width - (2 * Settings.STROKE_WIDTH);

	y: number;

	constructor(props: WeaponsBlockProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
		});
	}

	get tableProps(): TableProps {
		return {
			x: WeaponsBlockLayout.x,
			y: this.y,
			w: WeaponsBlockLayout.width,
			headerHeight: WeaponsBlockLayout.headerHeight,
			r: Settings.CORNER_RADIUS,
			h: pt(20, 'mm'),
			columns: [],
			data: [],
		};
	}
}

export const WeaponsBlockPDF = (doc: jsPDF, props: WeaponsBlockProps) => {
	const layout = new WeaponsBlockLayout(props);
	TablePDF(doc, layout.tableProps);
};

export const WeaponsBlockSVG: React.FC<WeaponsBlockProps> = (props: WeaponsBlockProps) => {
	const layout = new WeaponsBlockLayout(props);
	return (
		<>
			<TableSVG {...layout.tableProps} />
		</>
	);
};
