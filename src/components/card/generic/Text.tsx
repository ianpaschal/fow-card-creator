import jsPDF from 'jspdf';
import React from 'react';
import { Constants } from '../../../Constants';
import { FontWeights } from '../../../enums/FontNames';
import { getSVGMultiLineText } from '../../../utils/getSVGMultiLineText';
import { Area } from './Rectangle';

export interface TextProps extends Area {
	color?: string;
	font: string;
	fontSize: number;
	text: string;
	align: 'left' | 'center' | 'right';
	lineHeight?: number; // em
	letterSpacing?: number;
	maxLines?: number;
	verticalAlign?: 'top' | 'center' | 'end';
}

export interface TextSVGProps {
	fontWeight: string;
	fontFamily: string;
	fontSize: number;
	fontStyle: string;
	textAnchor: string;
	x: number;
	y: number;
	fill: string;
	w: number;
	lineHeight: number; // em
	letterSpacing: number;
	maxLines?: number;
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
	lineHeight: number;
	letterSpacing: number;
	maxLines: number;

	static getLineCount(props: TextProps) {
		return getSVGMultiLineText(props.text, new TextLayout(props).fontPropsSVG, 1.05).length;
	}

	constructor(props: TextProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
			if (!props.lineHeight) {
				this.lineHeight = 1;
			}
			if (!props.letterSpacing) {
				this.letterSpacing = 0;
			}
			if (!props.color) {
				this.color = '#000000';
			}
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
		return this.y + (this.h * 0.575);
	}

	get fontPropsSVG(): TextSVGProps {
		const fontParts = this.font.split('-');
		const fontFamilyMapping = {
			OpenSans: 'Open Sans',
			PTSans: 'PT Sans',
		};
		const alignToAnchorMapping = {
			left: 'start',
			center: 'middle',
			right: 'end',
		};
		return {
			fontWeight: FontWeights[ fontParts[ 1 ] ].toString(),
			fontFamily: fontFamilyMapping[ fontParts[ 0 ] ],
			fontSize: this.fontSize,
			fontStyle: fontParts[ 2 ] ? fontParts[ 2 ] : 'normal',
			textAnchor: alignToAnchorMapping[ this.align ],
			x: this.anchorX,
			y: this.baseline,
			fill: this.color,
			w: this.w,
			lineHeight: this.lineHeight,
			letterSpacing: this.letterSpacing,
			maxLines: this.maxLines,
		};
	}

	get baseline() {
		const renderHeight = this.fontSize * Constants.OPEN_SANS_RENDER_PROPORTION;
		return this.y + this.h - ((this.h - renderHeight) / 2);
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
		charSpace: props.letterSpacing,
	});
};

export const TextSVG: React.FC<TextProps> = (props: TextProps) => {
	const layout = new TextLayout(props);
	const lines = getSVGMultiLineText(props.text, layout.fontPropsSVG, 1.05);
	return (
		<text {...layout.fontPropsSVG}>
			{lines.map((line: string, i: number) => {
				const dy = `${(-((lines.length - 1) / 2) + i) * layout.lineHeight}em`;
				return (
					<tspan key={i} dy={dy} {...layout.fontPropsSVG}>
						{line.split(/([0-9]+|\s)/).map((piece: String, ii: number) => {
							if (['CM', 'MM'].includes(piece.toUpperCase())) {
								return (
									<tspan
										key={ii}
										fontSize={layout.fontSize * 0.85}
									>
										{piece}
									</tspan>
								);
							} else {
								return piece;
							}

						})}
					</tspan>
				);
			})}
		</text>
	);
};
