import jsPDF from 'jspdf';
import React from 'react';
import { BEZIER_CORNER_OFFSET } from '../Constants';
import { Settings } from '../Settings';

export interface RoundedRectanglePathProps {
	width: number;
	height: number;
	x: number;
	y: number;
	radius: number;
}

export interface RoundedRectangleProps extends RoundedRectanglePathProps {
	fill?: string;
	stroke?: string;
}

export class RoundedRectangle {
	static createSVGPath(options: RoundedRectanglePathProps, end = true): string {
		const { x, y, width: w, height: h, radius: r } = options;
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

	static createPDFPath(options: RoundedRectanglePathProps): any[] {
		const { x, y, width: w, height: h, radius: r } = options;
		const b = BEZIER_CORNER_OFFSET * r; // Offset of bezier handles from corner

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

	static PDF = (
		doc: jsPDF,
		props: RoundedRectangleProps,
	): void => {
		// Set styles
		if (props.fill) {
			doc.setFillColor(props.fill);
		}
		if (props.stroke) {
			doc.setLineWidth(Settings.STROKE_WIDTH).setDrawColor(props.stroke);
		}

		// Create the shpae
		const shape = doc.path(RoundedRectangle.createPDFPath(props));

		// Apply styles
		if (props.fill) {
			shape.fillEvenOdd();
		}
		if (props.stroke) {
			shape.stroke();
		}
	};

	static SVG: React.FC<RoundedRectangleProps> = (props: RoundedRectangleProps) => {
		return (
			<rect
				x={props.x} y={props.y} width={props.width}
				height={props.height} rx={props.radius} fill={props.fill} />
		);
	};
}

export const RoundedRectangleSVG: React.FC<RoundedRectangleProps> = (props: RoundedRectangleProps) => {
	return (
		<rect x={props.x} y={props.y} width={props.width} height={props.height} rx={props.radius} fill={props.fill} />
	);
};
