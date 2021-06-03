import jsPDF from 'jspdf';
import React from 'react';
import { RectangleProps } from './Rectangle';

export interface TextProps extends RectangleProps {
	color: string;
	font: string;
	fontSize: number;
	text: string;
	align: 'left' | 'center' | 'right';
}

export class TextLayout {
	text: string;
	x: number;
	y: number;
	w: number;
	h: number;
	color: string;
	font: string;
	fontSize: number;
	align: string;

	constructor(props: TextProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
		});
	}

	get anchorX(): number {
		const alignToXMapping = {
			left: this.x,
			center: this.x + (this.w / 2),
			right: this.x + this.w,
		};
		return alignToXMapping[ this.align ];
	}

	get anchorYPDF(): number {
		return this.y + (this.h / 2);
	}

	get anchorYSVG(): number {
		return this.y + (this.h * 0.55);
	}
}

export const TextPDF = (doc: jsPDF, props: TextProps) => {
	const layout = new TextLayout(props);
	doc.setTextColor(props.color);
	doc.setFont(props.font);
	doc.setFontSize(props.fontSize);
	doc.text(props.text, layout.anchorX, layout.anchorYPDF, {
		align: props.align,
		baseline: 'middle',
	});
};

export const TextSVG: React.FC<TextProps> = (props: TextProps) => {
	const layout = new TextLayout(props);
	const alignToAnchorMapping = {
		left: 'start',
		center: 'middle',
		right: 'end',
	};
	return (
		<text
			textAnchor={alignToAnchorMapping[ props.align ]}
			dominantBaseline="middle"
			fontSize={props.fontSize}
			x={layout.anchorX}
			y={layout.anchorYSVG}
			fontWeight="700"
			fontFamily="Open Sans"
			fill={props.color}
		>
			{props.text}
		</text>
	);
};
