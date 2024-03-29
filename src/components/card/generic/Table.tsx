/* eslint-disable max-len */
import jsPDF from 'jspdf';
import React from 'react';
import { CardSettings } from '../../../CardSettings';
import { TextPDF, TextProps, TextSVG } from './Text';
import { FramePDF, FrameProps, FrameSVG } from './Frame';
import { Area } from '../../../typing/Area';
import { RectangleProps, RoundedRectangleProps } from './RoundedRectangle';
import { TextAlignment } from '../../../typing/TextAlignment';

export interface TableProps extends Omit<RoundedRectangleProps, 'height'> {
	columns: ColumnDefinition[];
	data: unknown[];
	headerHeight: number;
	rowHeight: number;
}

export interface ColumnDefinition {
    widthFactor: number; // 0.0 - 1.0
	subColumns?: ColumnDefinition[];
	align?: TextAlignment;
	header: (x: number, y: number, width: number) => (RectangleProps | TextProps)[];
	cell: (x: number, y: number, width: number, record: any) => (RectangleProps | TextProps)[];
}

function isText(element: RectangleProps | TextProps): element is TextProps {
	return (element as TextProps).text !== undefined;
}

export class TableLayout {
	// Passed
	x: number;
	y: number;
	width: number;
	accentColor: string;
	headerHeight: number;
	rowHeight: number;
	columns: ColumnDefinition[];
	data: unknown[];
	columnWidths: number[];
	stroke: string;

	constructor(props: TableProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
		});
	}

	get frameProps(): FrameProps {
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			border: { top: this.headerHeight },
			radius: CardSettings.CORNER_RADIUS,
			height: this.headerHeight + (this.data.length * this.rowHeight) + CardSettings.STROKE_WIDTH,
			stroke: this.stroke,
			fill: CardSettings.COLOR_WHITE,
		};
	}

	computeColumnAreas(x, width, columns): Exclude<Area, 'y' | 'height'>[] {
		const columnsAreas = [];
		let columnX = x;
		const usableWidth = width - ((columns.length - 1) * CardSettings.STROKE_WIDTH);
		columns.forEach((column) => {
			const columnWidth = usableWidth * column.widthFactor;
			columnsAreas.push({ x: columnX, width: columnWidth });
			columnX += columnWidth + CardSettings.STROKE_WIDTH;
		});
		return columnsAreas;
	}

	renderBodySVG(columns: ColumnDefinition[]): JSX.Element[] {
		return columns.map((column, i) => {
			const { x, width } = this.computeColumnAreas(this.x + CardSettings.STROKE_WIDTH, this.width - (2 * CardSettings.STROKE_WIDTH), this.columns)[ i ];
			return (
				<React.Fragment key={i}>
					{column.header(x, this.y, width).map((props: TextProps | RectangleProps, ii: number) => (
						this.renderCellSVG(props, ii)
					))}
					{this.data.map((record, ii) => {
						const y = this.y + this.headerHeight + (ii * this.rowHeight);
						return (
							<React.Fragment key={ii}>
								{i > 0 && (
									<rect
										y={y - (CardSettings.STROKE_WIDTH / 2)}
										x={x - CardSettings.STROKE_WIDTH}
										fill={this.stroke}
										width={CardSettings.STROKE_WIDTH}
										height={this.rowHeight + CardSettings.STROKE_WIDTH}
									/>
								)}
								{column.cell(x, y, width, record).map((props: TextProps | RectangleProps, iii: number) => (
									this.renderCellSVG(props, iii)
								))}
							</React.Fragment>
						);
					})}
				</React.Fragment>
			);
		});
	}

	renderCellSVG(props: TextProps | RectangleProps, i: number): JSX.Element {
		return (
			<React.Fragment key={i}>
				{isText(props) ? (
					<TextSVG {...props} />
				) : (
					<rect {...props} />
				)}
			</React.Fragment>
		);
	}

	renderBodyPDF(doc: jsPDF, columns: ColumnDefinition[]): void {
		columns.forEach((column, i) => {
			const { x, width } = this.computeColumnAreas(this.x + CardSettings.STROKE_WIDTH, this.width - (2 * CardSettings.STROKE_WIDTH), this.columns)[ i ];
			column.header(x, this.y, width).forEach((props: TextProps | RectangleProps, ii: number) => (
				this.renderCellPDF(doc, props, ii)
			));
			this.data.map((record, ii) => {
				const y = this.y + this.headerHeight + (ii * this.rowHeight);
				if (i > 0) {
					doc.setFillColor(this.stroke);
					doc.rect(
						x - CardSettings.STROKE_WIDTH,
						y - (CardSettings.STROKE_WIDTH / 2),
						CardSettings.STROKE_WIDTH,
						this.rowHeight + CardSettings.STROKE_WIDTH,
						'F'
					);
				}
				column.cell(x, y, width, record).forEach((props: TextProps | RectangleProps, iii: number) => (
					this.renderCellPDF(doc, props, iii)
				));
			});
		});
	}

	renderCellPDF(doc: jsPDF, props: TextProps | RectangleProps, _i: number): void {
		if (isText(props)) {
			TextPDF(doc, props);
		} else {
			doc.setFillColor(props.fill);
			doc.rect(props.x, props.y, props.width, props.height, 'F');
		}
	}
}

export const TablePDF = (doc: jsPDF, props: TableProps) => {
	const layout = new TableLayout(props);
	FramePDF(doc, layout.frameProps);
	layout.renderBodyPDF(doc, props.columns);
};

export const TableSVG: React.FC<TableProps> = (props: TableProps) => {
	const layout = new TableLayout(props);
	return (
		<>
			<FrameSVG {...layout.frameProps} />
			{layout.renderBodySVG(props.columns)}
		</>
	);
};
