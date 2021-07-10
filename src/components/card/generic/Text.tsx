import jsPDF from 'jspdf';
import React from 'react';
import { CardSettings } from '../../../CardSettings';
import { Constants } from '../../../Constants';
import { FontWeights } from '../../../enums/FontNames';
import { Area } from '../../../typing/Area';
import { TextAlignment } from '../../../typing/TextAlignment';
import { getMultiLineText } from '../../../utils/getMultiLineText';

export interface TextProps extends Area {
	color?: string;
	font: string;
	fontSize: number;
	align?: TextAlignment;
	lineHeight?: number; // pt
	letterSpacing?: number;
	maxLines?: number;
	verticalAlign?: 'top' | 'center' | 'bottom';
	text: string | string[];
	separator?: string;
	linePrefix?: string;
	lineSuffix?: string;
}

export interface TextSVGProps {
	fontWeight: string;
	fontFamily: string;
	fontSize: string;
	fontStyle: string;
	textAnchor: string;
	x: number;
	y: number;
	fill: string;
	width: number;
	letterSpacing: number;
}

export class TextLayout {
	text: string;
	x: number;
	y: number;
	width: number;
	height: number;
	color: string = CardSettings.COLOR_BLACK;
	font: string;
	fontSize: number;
	align: string;
	lineHeight: number;
	letterSpacing: number;
	maxLines: number;
	verticalAlign: 'top' | 'center' | 'bottom' = 'center';
	separator?: string;
	linePrefix?: string;
	lineSuffix?: string;

	static getLineCount(props: TextProps): number {
		return new TextLayout(props).lines.length;
	}

	constructor(props: TextProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
			if (!props.lineHeight) {
				this.lineHeight = this.fontSize;
			}
			if (!props.letterSpacing) {
				this.letterSpacing = 0;
			}
		});
	}

	get lines(): string[] {
		const tokens = Array.isArray(this.text) ? this.text : this.text.split(/\s+/);
		return getMultiLineText(tokens, this.fontPropsSVG, {
			overflow: 1.05,
			maxLines: this.maxLines,
			separator: this.separator,
			linePrefix: this.linePrefix,
			lineSuffix: this.lineSuffix,
		});
	}

	get anchorX(): number {
		const alignToXMapping = {
			left: this.x,
			center: this.x + (this.width / 2),
			right: this.x + this.width,
		};
		return alignToXMapping[ this.align ];
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
			fontSize: `${this.fontSize}px`,
			fontStyle: fontParts[ 2 ] ? fontParts[ 2 ] : 'normal',
			textAnchor: alignToAnchorMapping[ this.align ],
			x: this.anchorX,
			y: this.anchorYSVG,
			fill: this.color,
			width: this.width,
			letterSpacing: this.letterSpacing,
		};
	}

	get anchorYSVG() {
		const renderHeight = this.fontSize * Constants.OPEN_SANS_RENDER_PROPORTION;
		if (this.verticalAlign === 'top') {
			return this.y + this.lineHeight - ((this.lineHeight - renderHeight) / 2);
		}
		if (this.verticalAlign === 'bottom') {
			return this.y + this.height - ((this.lineHeight - renderHeight) / 2);
		}
		// Center align (default)
		return (this.y + this.height / 2) + renderHeight / 2;
	}

	get anchorYPDF() {
		if (this.verticalAlign === 'top') {
			return this.y + this.lineHeight / 2;
		}
		if (this.verticalAlign === 'bottom') {
			return this.y + this.height - (this.lineHeight / 2);
		}
		// Center align (default)
		return this.y + (this.height / 2);
	}

	computeYOffset(i: number, lineCount: number): number {
		if (this.verticalAlign === 'top') {
			return i * this.lineHeight;
		}
		if (this.verticalAlign === 'bottom') {
			return (lineCount - i) * this.lineHeight * -1;
		}
		// Center align (default)
		return (-((lineCount - 1) / 2) + i) * this.lineHeight;
	}
}

export const TextPDF = (doc: jsPDF, props: TextProps) => {
	const layout = new TextLayout(props);
	doc.setTextColor(props.color);
	doc.setFont(props.font);
	doc.setFontSize(props.fontSize);
	layout.lines.forEach((line: string, i: number) => {
		const dy = layout.computeYOffset(i, layout.lines.length);
		doc.text(line, layout.anchorX, layout.anchorYPDF + dy, {
			align: props.align,
			baseline: 'middle',
			charSpace: props.letterSpacing,
		});
	});
};

export const TextSVG: React.FC<TextProps> = (props: TextProps) => {
	const layout = new TextLayout(props);
	return (
		<text {...layout.fontPropsSVG}>
			{layout.lines.map((line: string, i: number) => {
				const dy = layout.computeYOffset(i, layout.lines.length).toString();
				return (
					<tspan key={i} dy={dy} {...layout.fontPropsSVG}>
						{line.split(/([0-9]+|\s)/).map((piece: string, ii: number) => {
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
