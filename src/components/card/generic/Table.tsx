import jsPDF from 'jspdf';
import React from 'react';
import { LabeledRectangle, LabeledRectangleProps } from '../../../drawing/LabeledRectangle';
import { RoundedRectangleProps } from '../../../drawing/RoundedRectangle';
import { Settings } from '../../../Settings';
import { Unit } from '../../../typing/Unit';
import { pt } from '../../../utils/convertDistance';

export interface TableProps extends RoundedRectangleProps {
	headerHeight: number;
	columns: any;
	data: any;
}

export interface ColumnDefinition {
	label?: string;
    width?: string;
    usePadding?: boolean;
    render: (...args: any[]) => React.ReactFragment;
}

export class TableLayout {
	x: number;
	y: number;
	w: number;
	headerHeight: number;
	colmns: any;
	data: any;

	constructor(props: TableProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
		});
	}

	get frameProps(): LabeledRectangleProps {
		return {
			x: this.x,
			y: this.y,
			w: this.w,
			headerHeight: this.headerHeight,
			r: Settings.CORNER_RADIUS,
			h: pt(20, 'mm'),
		};
	}
}

export const TablePDF = (doc: jsPDF, props: TableProps) => {
	const layout = new TableLayout(props);
	LabeledRectangle.PDF(doc, layout.frameProps);
};

export const TableSVG: React.FC<TableProps> = (props: TableProps) => {
	const layout = new TableLayout(props);
	return (
		<>
			<LabeledRectangle.SVG {...layout.frameProps} />
		</>
	);
};
