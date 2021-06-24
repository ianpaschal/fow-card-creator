import React from 'react';
import jsPDF from 'jspdf';
import { connect } from 'react-redux';
import { RootState } from '../../store';
import { pt } from '../../utils/convertDistance';
import { Settings } from '../../Settings';
import { TextLayout, TextPDF, TextProps, TextSVG } from './generic/Text';
import { RoundedRectangleSVG, RoundedRectanglePDF, RoundedRectangleProps } from './generic/RoundedRectangle';

export class HeaderBlockLayout {
	static x: number = Settings.CARD_MARGINS;
	static y: number = Settings.CARD_MARGINS + pt(0.05, 'mm');
	static width: number = Settings.CARD_WIDTH - (2 * Settings.CARD_MARGINS);
	static radius: number = Settings.CORNER_RADIUS;
	static textXMargins = pt(10, 'mm');
	static textX: number = HeaderBlockLayout.x + HeaderBlockLayout.textXMargins;
	static textW: number = HeaderBlockLayout.width - (2 * HeaderBlockLayout.textXMargins);
	static titleLineH: number = pt(4, 'mm');
	static subTitleH: number = pt(1.5, 'mm');
	static subTitleSpacing: number = pt(0.7, 'mm');
	static font: string = 'OpenSans-Bold';
	static titleFontSize: number = 16;
	static subTitleFontSize: number = 6;
	static align: 'left' | 'center' | 'right' = 'center';
	static lineHeight: number = 0.825;
	static letterSpacing: number = -0.4;

	// Static
	x: number = Settings.CARD_MARGINS;
	y: number = Settings.CARD_MARGINS + pt(0.05, 'mm');
	height: number;
	width: number = Settings.CARD_WIDTH - (2 * Settings.CARD_MARGINS);
	radius: number = Settings.CORNER_RADIUS;
	titleLineHeight: number = pt(4, 'mm');
	xMargin: number = pt(10, 'mm');
	font: string = 'OpenSans-Bold';
	titleFontSize: number = 16;
	align: 'left' | 'center' | 'right' = 'center';

	titleLineCount: number;
	title: string;
	subTitle: string;
	subTitleAboveTitle: boolean;
	accentColor: string;

	constructor(props: HeaderBlockProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
		});

		this.updateHeight();
	}

	updateHeight() {
		const lineCount = TextLayout.getLineCount({
			...this,
			fontSize: this.titleFontSize,
			x: HeaderBlockLayout.textX,
			width: this.width - (2 * this.xMargin),
			text: this.titleText,
		});
		this.titleLineCount = lineCount;
		this.height = lineCount > 1 ? pt(11.25, 'mm') : pt(8.25, 'mm');
	}

	get frameProps(): RoundedRectangleProps {
		return {
			...this,
			fill: this.accentColor,
		};
	}

	get titleText(): string {
		return this.title.toUpperCase() || 'UNTITLED UNIT';
	}

	get isMultiLine(): boolean {
		return this.titleLineCount > 1;
	}

	get titleHeight(): number {
		return this.titleLineHeight * this.titleLineCount;
	}

	get marginTop(): number {
		return pt(1, 'mm');
	}

	get titleProps(): TextProps {
		let y: number = this.y;
		if (this.subTitle) {
			if (this.subTitleAboveTitle) {
				// eslint-disable-next-line max-len
				y += this.marginTop + HeaderBlockLayout.subTitleH + HeaderBlockLayout.subTitleSpacing;
			} else {
				y += this.marginTop;
			}
		} else {
			y += (this.height - this.titleHeight) / 2;
		}
		return {
			...HeaderBlockLayout,
			x: HeaderBlockLayout.textX,
			y,
			width: HeaderBlockLayout.textW,
			height: this.titleHeight,
			fontSize: HeaderBlockLayout.titleFontSize,
			text: this.titleText,
			color: this.title ? '#FFFFFF' : '#CCCCCC',
			maxLines: 2,
			lineHeight: this.titleHeight,
		};
	}
	get subTitleProps(): TextProps {
		let y: number;
		if (this.subTitleAboveTitle) {
			y = HeaderBlockLayout.y + this.marginTop;
		} else {
			y = HeaderBlockLayout.y + this.marginTop + this.titleHeight + HeaderBlockLayout.subTitleSpacing;
		}
		return {
			...HeaderBlockLayout,
			x: HeaderBlockLayout.textX,
			width: HeaderBlockLayout.textW,
			height: HeaderBlockLayout.subTitleH,
			y,
			fontSize: HeaderBlockLayout.subTitleFontSize,
			font: 'OpenSans-Bold',
			text: this.subTitle.toUpperCase(),
			color: '#FFFFFF',
			maxLines: 1,
			letterSpacing: 0,
			lineHeight: HeaderBlockLayout.subTitleH,
		};
	}
}

export interface HeaderBlockProps {
	subTitle?: string;
	title: string;
	subTitleAboveTitle: boolean;
	accentColor: string;
};

const connector = connect((state: RootState) => ({
	subTitle: state.editor.unitCard.unit.subTitle,
	title: state.editor.unitCard.unit.title,
	subTitleAboveTitle: state.editor.unitCard.unit.subTitleAboveTitle,
	accentColor: state.editor.unitCard.unit.accentColor,
}), null);

export const HeaderBlockSVG: React.FC<HeaderBlockProps> = (props: HeaderBlockProps) => {
	const layout = new HeaderBlockLayout(props);
	return (
		<>
			<RoundedRectangleSVG {...layout.frameProps} />
			<TextSVG {...layout.titleProps} />
			{props.subTitle && (
				<TextSVG {...layout.subTitleProps} />
			)}
		</>
	);
};

export const HeaderBlockPDF = (doc: jsPDF, props: HeaderBlockProps): void => {
	const layout = new HeaderBlockLayout(props);
	RoundedRectanglePDF(doc, {
		x: Settings.CARD_MARGINS,
		y: Settings.CARD_MARGINS + pt(0.05, 'mm'),
		width: pt(100, 'mm'),
		height: pt(8.25, 'mm'),
		radius: Settings.CORNER_RADIUS,
		fill: props.accentColor,
	});
	TextPDF(doc, {
		...layout.titleProps,
		text: layout.titleText,
	});
	if (props.subTitle) {
		TextPDF(doc, {
			...layout.subTitleProps,
			text: props.subTitle.toUpperCase(),
		});
	}
};

export const ConnectedHeaderBlockSVG = connector(HeaderBlockSVG);
