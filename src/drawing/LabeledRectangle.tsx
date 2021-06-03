import jsPDF from 'jspdf';
import React from 'react';
import { Settings } from '../Settings';
import { RoundedRectangle, RoundedRectangleProps } from './RoundedRectangle';

export interface LabeledRectangleProps extends RoundedRectangleProps {
	headerHeight: number;
	text?: string;
	fontSize?: number;
}

export class LabeledRectangle extends RoundedRectangle {
	static SVG: React.FC<LabeledRectangleProps> = ({
		x,
		y,
		w,
		h,
		headerHeight,
		r,
		stroke,
		fill,
		text,
		fontSize,
	}: LabeledRectangleProps) => {
		const outerPath = RoundedRectangle.createSVGPath({ x, y, w, h, r });
		const innerPath = RoundedRectangle.createSVGPath({
			x: x + Settings.STROKE_WIDTH,
			y: y + headerHeight,
			w: w - (2 * Settings.STROKE_WIDTH),
			h: h - (headerHeight + Settings.STROKE_WIDTH),
			r: r - Settings.STROKE_WIDTH,
		});
		return (
			<>
				<path d={outerPath + innerPath} fill={stroke} fillRule="evenodd" />
				{fill && (
					<path d={innerPath} fill={fill} fillRule="evenodd" />
				)}
				{text && fontSize && (
					<text
						textAnchor="middle"
						dominantBaseline="middle"
						fontSize={fontSize}
						x={x + w / 2}
						y={y + headerHeight * 0.55}
						fontWeight="700"
						fontFamily="Open Sans"
						fill="white"
					>
						{text}
					</text>
				)}
			</>
		);
	}

	static PDF = (doc: jsPDF, {
		x,
		y,
		w,
		h,
		headerHeight,
		r,
		stroke,
		fill,
		text,
		fontSize,
	}: LabeledRectangleProps): void => {
		const outerPath = RoundedRectangle.createPDFPath({ x, y, w, h, r });
		const innerPath = RoundedRectangle.createPDFPath({
			x: x + Settings.STROKE_WIDTH,
			y: y + headerHeight,
			w: w - (2 * Settings.STROKE_WIDTH),
			h: h - (headerHeight + Settings.STROKE_WIDTH),
			r: r - Settings.STROKE_WIDTH,
		});
		const path = [...outerPath, ...innerPath];

		doc.path(path).setFillColor(stroke).fillEvenOdd();

		if (fill) {
			doc.path(innerPath).setFillColor(fill).fill();
		}

		if (text && fontSize) {
			doc.setTextColor('#FFFFFF');
			doc.setFont('OpenSans-Bold');
			doc.setFontSize(fontSize);
			doc.text(text.toUpperCase(), x + w / 2, y + (headerHeight / 2), {
				align: 'center',
				baseline: 'middle',
			});
		}
	}
}
