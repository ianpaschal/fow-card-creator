import jsPDF from 'jspdf';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { MobilityAttribute, MobilityAttributeKeys, MobilityAttributes } from '../../enums/Mobility';
import { Settings } from '../../Settings';
import { RootState, store } from '../../store';
import { pt } from '../../utils/convertDistance';
import { formatDiceRoll } from '../../utils/formatDiceRoll';
import { formatDistance } from '../../utils/formatDistance';
import { FramePDF, FrameProps, FrameSVG } from './generic/Frame';
import { TablePDF, TableProps, TableSVG } from './generic/Table';
import { TextProps, TextSVG } from './generic/Text';

export class MobilityBlockLayout {
	// Passed
	mobility: {[key: string]: any};
	accentColor: string;
	x: number;
	y: number;
	width: number;
	height: number;

	// Static:
	headerFont: string = 'OpenSans-Bold';
	headerFontSize: number = 4.5;
	headerHeight: number = pt(2.9, 'mm');
	rowFont: string = 'OpenSans-SemiBold';
	rowFontSize: number = 6;

	constructor(props: MobilityBlockProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
		});
	}

	get rowHeight(): number {
		return this.height - (this.headerHeight + Settings.STROKE_WIDTH);
	}

	get frameProps(): FrameProps {
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			border: { top: this.headerHeight },
			radius: Settings.CORNER_RADIUS,
			height: this.height,
			stroke: this.accentColor,
			fill: '#FFFFFF',
		};
	}

	get tableColumns(): any {
		const headerStyle = {
			align: 'center',
			color: '#FFFFFF',
			font: this.headerFont,
			fontSize: this.headerFontSize,
			height: this.headerHeight,
		};
		const recordStyle = {
			align: 'center',
			color: '#000000',
			font: this.rowFont,
			fontSize: this.rowFontSize,
			height: this.rowHeight,
		};
		return [
			{
				widthFactor: 0.2,
				header: (x: number, y: number, width: number) => (
					[{ ...headerStyle, x, y, width, text: 'TACTICAL' }]
				),
				cell: (x: number, y: number, width: number, record) => (
					[{ ...recordStyle, x, y, width, text: formatDistance(record.tactical) }]
				),
			},
			{
				widthFactor: 0.2,
				header: (x: number, y: number, width: number) => (
					[{ ...headerStyle, x, y, width, text: 'TERRAIN DASH' }]
				),
				cell: (x: number, y: number, width: number, record) => (
					[{ ...recordStyle, x, y, width, text: formatDistance(record.terrainDash) }]
				),
			},
			{
				widthFactor: 0.2,
				header: (x: number, y: number, width: number) => (
					[{ ...headerStyle, x, y, width, text: 'CROSS COUNTRY DASH' }]
				),
				cell: (x: number, y: number, width: number, record) => (
					[{ ...recordStyle, x, y, width, text: formatDistance(record.crossCountryDash) }]
				),
			},
			{
				widthFactor: 0.2,
				header: (x: number, y: number, width: number) => (
					[{ ...headerStyle, x, y, width, text: 'ROAD DASH' }]
				),
				cell: (x: number, y: number, width: number, record) => (
					[{ ...recordStyle, x, y, width, text: formatDistance(record.roadDash) }]
				),
			},
			{
				widthFactor: 0.2,
				header: (x: number, y: number, width: number) => (
					[{ ...headerStyle, x, y, width, text: 'CROSS' }]
				),
				cell: (x: number, y: number, width: number, record) => (
					[{ ...recordStyle, x, y, width, text: formatDiceRoll(record.cross) }]
				),
			},
		];
	}

	get tableProps(): TableProps {
		return {
			...this,
			columns: this.tableColumns,
			data: [this.mobility],
			rowHeight: this.rowHeight,
			headerHeight: this.headerHeight,
			radius: Settings.CORNER_RADIUS,
			stroke: this.accentColor,
			width: this.width,
			x: this.x,
			y: this.y,
		};
	}

	computeLabelProps(column, i: number): TextProps {
		const width = (this.width - (Settings.STROKE_WIDTH * this.tableColumns.length + 1)) * column.width;
		const x = this.x + Settings.STROKE_WIDTH;
		return {
			x,
			y: this.y,
			width,
			height: this.headerHeight,
			fontSize: 4.5,
			font: 'OpenSans-Bold',
			align: 'center',
			text: column.label,
		};

	}
}

export type MobilityBlockProps = ConnectedProps<typeof connector>;

// React
const connector = connect((state: RootState) => ({
	accentColor: state.editor.unitCard.unit.accentColor,
	mobility: state.editor.unitCard.unit.mobility,
	x: state.editor.unitCard.layout.mobilityBlock.x,
	y: state.editor.unitCard.layout.mobilityBlock.y,
	width: state.editor.unitCard.layout.mobilityBlock.width,
	height: state.editor.unitCard.layout.mobilityBlock.height,
}), null);

export const MobilityBlockSVG: React.FC<MobilityBlockProps> = (props: MobilityBlockProps) => {
	const layout = new MobilityBlockLayout(props);
	return (
		<TableSVG {...layout.tableProps} />
	);
};

export const ConnectedMobilityBlockSVG = connector(MobilityBlockSVG);

// jsPDF
export const MobilityBlockPDF = (doc: jsPDF, props: MobilityBlockProps) => {
	const layout = new MobilityBlockLayout(props);
	TablePDF(doc, layout.tableProps);
};

export const ConnectedMobilityBlockPDF = (doc: jsPDF) => MobilityBlockPDF(doc, {
	mobility: store.getState().editor.unitCard.unit.mobility,
	accentColor: store.getState().editor.unitCard.unit.accentColor,
	x: store.getState().editor.unitCard.layout.mobilityBlock.x,
	y: store.getState().editor.unitCard.layout.mobilityBlock.y,
	width: store.getState().editor.unitCard.layout.mobilityBlock.width,
	height: store.getState().editor.unitCard.layout.mobilityBlock.height,
});
