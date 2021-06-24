import jsPDF from 'jspdf';
import React from 'react';
import { Constants } from '../../../Constants';
import { Settings } from '../../../Settings';
import { Area } from '../../../typing/Area';

export interface RectangleProps extends Area {
	fill?: string;
}

export interface RoundedRectangleProps extends RectangleProps {
	stroke?: string;
	radius: number;
}

export class RoundedRectangleLayout {
	static createSVGPath(props: RoundedRectangleProps, end = true): string {
		const { x, y, width: w, height: h, radius: r } = props;
		return `
			M${x + r},${y}
			h${w - (r + r)}
			a${r} ${r} 0 0 1 ${r},${r}
			v${h - (r + r)}
			a${r},${r} 0 0 1 ${-r},${r}
			h${-(w - (r + r))}
			a${r},${r} 0 0 1 ${-r},${-r}
			v${-(h - (r + r))}
			a${r},${r} 0 0 1 ${r},${-r}
			${end && 'z'}
		`;
	}

	static createPDFPath(props: RoundedRectangleProps): any[] {
		const { x, y, width: w, height: h, radius: r } = props;
		const b = Constants.BEZIER_CORNER_OFFSET * r; // Offset of bezier handles from corner

		/* eslint-disable array-element-newline */
		return [
			{ op: 'm', c: [x + r, y]},
			{ op: 'l', c: [x + (w - r), y]},
			{ op: 'c', c: [
				x + (w - b), y,
				x + w, y + b,
				x + w, y + r,
			]},
			{ op: 'l', c: [x + w, y + (h - r)]},
			{ op: 'c', c: [
				x + w, y + (h - b),
				x + (w - b), y + h,
				x + (w - r), y + h,
			]},
			{ op: 'l', c: [x + r, y + h]},
			{ op: 'c', c: [
				x + b, y + h,
				x, y + (h - b),
				x, y + (h - r),
			]},
			{ op: 'l', c: [x, y + r]},
			{ op: 'c', c: [
				x, y + b,
				x + b, y,
				x + r, y,
			]},
		];
		/* eslint-enable array-element-newline */
	};

	stroke: string;
	fill: string;
	x: number;
	y: number;
	width: number;
	height: number;
	radius: number;

	constructor(props: RoundedRectangleProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
		});
	}

	get pathSVG(): string {
		return RoundedRectangleLayout.createSVGPath({ ...this });
	}

	get pathPDF(): any[] {
		return RoundedRectangleLayout.createPDFPath({ ...this });
	}
}

export const RoundedRectangleSVG: React.FC<RoundedRectangleProps> = (props: RoundedRectangleProps) => {
	const layout = new RoundedRectangleLayout(props);
	return (
		<path d={layout.pathSVG} fill={layout.fill} fillRule="evenodd" />
	);
};

export const  RoundedRectanglePDF = (doc: jsPDF, props: RoundedRectangleProps): void => {
	const layout = new RoundedRectangleLayout(props);
	// Set styles
	if (props.fill) {
		doc.setFillColor(props.fill);
	}
	if (props.stroke) {
		doc.setLineWidth(Settings.STROKE_WIDTH).setDrawColor(props.stroke);
	}

	// Create the shpae
	const shape = doc.path(layout.pathPDF);

	// Apply styles
	if (props.fill) {
		shape.fillEvenOdd();
	}
	if (props.stroke) {
		shape.stroke();
	}
};
