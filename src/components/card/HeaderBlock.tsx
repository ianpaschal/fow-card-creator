import React from 'react';
import jsPDF from 'jspdf';
import { Unit } from '../../typing/Unit';
import { pt } from '../../utils/convertDistance';
import { Settings } from '../../Settings';
import { RoundedRectangle, RoundedRectangleProps, RoundedRectangleSVG } from '../../drawing/RoundedRectangle';
import { TextLayout, TextPDF, TextProps, TextSVG } from './generic/Text';

export interface HeaderBlockProps {
	unit: Unit;
}

export class HeaderBlockLayout {
	unit: Unit;
	titleLineCount: number;

	static x: number = Settings.CARD_MARGINS;
	static y: number = Settings.CARD_MARGINS + pt(0.05, 'mm');
	static h: number = pt(8.25, 'mm');
	static hMultiLine = pt(11.25, 'mm');
	static w: number = Settings.CARD_WIDTH - (2 * Settings.CARD_MARGINS);
	static r: number = Settings.CORNER_RADIUS;
	static textXMargins = pt(8, 'mm');
	static textX: number = HeaderBlockLayout.x + HeaderBlockLayout.textXMargins;
	static textW: number = HeaderBlockLayout.w - (2 * HeaderBlockLayout.textXMargins);
	static titleLineH: number = pt(4, 'mm');
	static subTitleH: number = pt(1.5, 'mm');
	static subTitleSpacing: number = pt(0.7, 'mm');
	static font: string = 'OpenSans-Bold';
	static titleFontSize: number = 16;
	static subTitleFontSize: number = 6;
	static align: 'left' | 'center' | 'right' = 'center';
	static lineHeight: number = 0.825;
	static letterSpacing: number = -0.4;

	constructor(props: HeaderBlockProps) {
		this.unit = props.unit;

		this.titleLineCount = TextLayout.getLineCount({
			...HeaderBlockLayout,
			fontSize: HeaderBlockLayout.titleFontSize,
			x: HeaderBlockLayout.textX,
			w: HeaderBlockLayout.textW,
			text: this.titleText,
		});
	}

	get frameProps(): RoundedRectangleProps {
		return {
			...HeaderBlockLayout,
			h: this.isMultiLine ? HeaderBlockLayout.hMultiLine : HeaderBlockLayout.h,
			fill: this.unit.accentColor,
		};
	}

	get titleText(): string {
		return this.unit.title.toUpperCase() || 'UNTITLED UNIT';
	}

	get isMultiLine(): boolean {
		return this.titleLineCount > 1;
	}

	get titleH(): number {
		return HeaderBlockLayout.titleLineH * this.titleLineCount;
	}

	get marginTop(): number {
		return pt(1, 'mm');
	}

	get titleProps(): TextProps {
		let y: number;
		if (this.unit.subTitle) {
			if (this.unit.subTitleAboveTitle) {
				// eslint-disable-next-line max-len
				y = HeaderBlockLayout.y + this.marginTop + HeaderBlockLayout.subTitleH + HeaderBlockLayout.subTitleSpacing;
			} else {
				y = HeaderBlockLayout.y + this.marginTop;
			}
		} else {
			y = HeaderBlockLayout.y + (HeaderBlockLayout.h - this.titleH) / 2;
		}
		return {
			...HeaderBlockLayout,
			x: HeaderBlockLayout.textX,
			y,
			w: HeaderBlockLayout.textW,
			h: this.titleH,
			fontSize: HeaderBlockLayout.titleFontSize,
			text: this.titleText,
			color: this.unit.title ? '#FFFFFF' : '#CCCCCC',
			maxLines: 2,
		};
	}
	get subTitleProps(): TextProps {
		let y: number;
		if (this.unit.subTitleAboveTitle) {
			y = HeaderBlockLayout.y + this.marginTop;
		} else {
			y = HeaderBlockLayout.y + this.marginTop + this.titleH + HeaderBlockLayout.subTitleSpacing;
		}
		return {
			...HeaderBlockLayout,
			x: HeaderBlockLayout.textX,
			w: HeaderBlockLayout.textW,
			h: HeaderBlockLayout.subTitleH,
			y,
			fontSize: HeaderBlockLayout.subTitleFontSize,
			font: 'OpenSans-ExtraBold',
			text: this.unit.subTitle.toUpperCase(),
			color: '#FFFFFF',
			maxLines: 1,
			letterSpacing: 0,
		};
	}
}

export const HeaderBlockSVG: React.FC<HeaderBlockProps> = (props: HeaderBlockProps) => {
	const layout = new HeaderBlockLayout(props);
	return (
		<>
			<RoundedRectangleSVG {...layout.frameProps} />
			<TextSVG {...layout.titleProps} />
			{props.unit.subTitle && (
				<TextSVG {...layout.subTitleProps} />
			)}
		</>
	);
};

export const HeaderBlockPDF = (doc: jsPDF, props: HeaderBlockProps): void => {
	const layout = new HeaderBlockLayout(props);
	RoundedRectangle.PDF(doc, {
		x: Settings.CARD_MARGINS,
		y: Settings.CARD_MARGINS + pt(0.05, 'mm'),
		w: pt(100, 'mm'),
		h: pt(8.25, 'mm'),
		r: Settings.CORNER_RADIUS,
		fill: props.unit.accentColor,
	});
	TextPDF(doc, layout.titleProps);
	if (props.unit.subTitle) {
		TextPDF(doc, layout.subTitleProps);
	}
};

export class HeaderBlock {
	static SVG = HeaderBlockSVG;
	static PDF = HeaderBlockPDF;
}
