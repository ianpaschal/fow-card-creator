import jsPDF from 'jspdf';
import React from 'react';
import { connect } from 'react-redux';
import { Settings } from '../../Settings';
import { RootState, store } from '../../store';
import { pt } from '../../utils/convertDistance';
import { formatDiceRoll } from '../../utils/formatDiceRoll';
import { formatDistance } from '../../utils/formatDistance';
import { FrameProps } from './generic/Frame';
import { TablePDF, TableProps, TableSVG } from './generic/Table';

// Generic
const mapStateToProps = (state: RootState) => ({
	accentColor: state.editor.unitCard.unit.accentColor,
	height: state.editor.unitCard.layout.mobilityBlock.height,
	mobility: state.editor.unitCard.unit.mobility,
	width: state.editor.unitCard.layout.mobilityBlock.width,
	x: state.editor.unitCard.layout.mobilityBlock.x,
	y: state.editor.unitCard.layout.mobilityBlock.y,
});

export type MobilityBlockProps = ReturnType<typeof mapStateToProps>;

export class MobilityBlockLayout {
	static headerHeight: number = pt(2.9, 'mm');

	constructor(readonly props: MobilityBlockProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
		});
	}

	get rowHeight(): number {
		return this.props.height - (MobilityBlockLayout.headerHeight + Settings.STROKE_WIDTH);
	}

	get frameProps(): FrameProps {
		return {
			x: this.props.x,
			y: this.props.y,
			width: this.props.width,
			border: { top: MobilityBlockLayout.headerHeight },
			radius: Settings.CORNER_RADIUS,
			height: this.props.height,
			stroke: this.props.accentColor,
			fill: '#FFFFFF',
		};
	}

	get tableColumns(): any {
		const headerStyle = {
			align: 'center',
			color: '#FFFFFF',
			font: 'OpenSans-Bold',
			fontSize: 4.5,
			height: MobilityBlockLayout.headerHeight,
		};
		const recordStyle = {
			align: 'center',
			color: '#000000',
			font: 'OpenSans-SemiBold',
			fontSize: 6,
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
			data: [this.props.mobility],
			rowHeight: this.rowHeight,
			headerHeight: MobilityBlockLayout.headerHeight,
			radius: Settings.CORNER_RADIUS,
			stroke: this.props.accentColor,
			width: this.props.width,
			x: this.props.x,
			y: this.props.y,
		};
	}
}

// React
export const MobilityBlockSVG: React.FC<MobilityBlockProps> = (props: MobilityBlockProps) => {
	const layout = new MobilityBlockLayout(props);
	return <TableSVG {...layout.tableProps} />;
};

export const ConnectedMobilityBlockSVG = connect(mapStateToProps, null)(MobilityBlockSVG);

// jsPDF
export const MobilityBlockPDF = (doc: jsPDF, props: MobilityBlockProps) => {
	const layout = new MobilityBlockLayout(props);
	TablePDF(doc, layout.tableProps);
};

export const ConnectedMobilityBlockPDF = (doc: jsPDF) => MobilityBlockPDF(doc, mapStateToProps(store.getState()));
