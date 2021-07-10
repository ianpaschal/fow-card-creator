import React from 'react';
import jsPDF from 'jspdf';
import { connect } from 'react-redux';
import { RootState, store } from '../../store';
import { pt } from '../../utils/convertDistance';
import { CardSettings } from '../../CardSettings';
import { TextLayout, TextPDF, TextProps, TextSVG } from './generic/Text';
import {
	RoundedRectanglePDF,
	RoundedRectangleProps,
	RoundedRectangleSVG,
} from './generic/RoundedRectangle';
import { NationalInsigniaPDF, NationalInsigniaSVG } from './NationalInsignia';
import HeaderOverlay from '../../../assets/images/unit-card-header-overlay.png';
import { TextAlignment } from '../../typing/TextAlignment';
import { FontNames } from '../../enums/FontNames';

// Generic
const mapStateToProps = (state: RootState) => ({
	subTitle: state.editor.unitCard.unit.subTitle,
	title: state.editor.unitCard.unit.title,
	subTitleAboveTitle: state.editor.unitCard.unit.subTitleAboveTitle,
	accentColor: state.editor.unitCard.unit.accentColor,
	nationality: state.editor.unitCard.unit.nationality,
	era: state.editor.unitCard.unit.era,
});

export type HeaderBlockProps = ReturnType<typeof mapStateToProps>;

// TODO: Refactor constructor and props
export class HeaderBlockLayout {
	static x: number = CardSettings.MARGIN_OUTER;
	static y: number = CardSettings.MARGIN_OUTER + pt(0.05, 'mm');
	static width: number = CardSettings.WIDTH - (2 * CardSettings.MARGIN_OUTER);
	static radius: number = CardSettings.CORNER_RADIUS;
	static textXMargins = pt(10, 'mm');
	static textX: number = HeaderBlockLayout.x + HeaderBlockLayout.textXMargins;
	static textW: number = HeaderBlockLayout.width - (2 * HeaderBlockLayout.textXMargins);
	static titleLineH: number = pt(4, 'mm');
	static subTitleH: number = pt(1.5, 'mm');
	static subTitleSpacing: number = pt(0.7, 'mm');
	static font: string = FontNames.OPEN_SANS_BOLD;
	static titleFontSize: number = 16;
	static subTitleFontSize: number = 6;
	static align: TextAlignment = 'center';
	static lineHeight: number = 0.825;
	static letterSpacing: number = -0.4;

	// Static
	x: number = CardSettings.MARGIN_OUTER;
	y: number = CardSettings.MARGIN_OUTER + pt(0.05, 'mm');
	height: number;
	width: number = CardSettings.WIDTH - (2 * CardSettings.MARGIN_OUTER);
	radius: number = CardSettings.CORNER_RADIUS;
	titleLineHeight: number = pt(4, 'mm');
	xMargin: number = pt(10, 'mm');
	font: string = FontNames.OPEN_SANS_BOLD;
	titleFontSize: number = 16;
	align: TextAlignment = 'center';

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
			color: this.title ? CardSettings.COLOR_WHITE : '#CCCCCC',
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
			font: FontNames.OPEN_SANS_BOLD,
			text: this.subTitle.toUpperCase(),
			color: CardSettings.COLOR_WHITE,
			maxLines: 1,
			letterSpacing: 0,
			lineHeight: HeaderBlockLayout.subTitleH,
		};
	}
}

// React
export const HeaderBlockSVG: React.FC<HeaderBlockProps> = (props: HeaderBlockProps) => {
	const layout = new HeaderBlockLayout(props);
	return (
		<>
			<RoundedRectangleSVG {...layout.frameProps} />
			{props.era === 'LW' && (
				<image
					xlinkHref={HeaderOverlay}
					width={layout.width + pt(2, 'mm')}
					height={layout.height + pt(2, 'mm')}
					x={layout.x - pt(1, 'mm')}
					y={layout.y - pt(1, 'mm')}
				/>
			)}
			<TextSVG {...layout.titleProps} />
			{props.subTitle && (
				<TextSVG {...layout.subTitleProps} />
			)}
			<NationalInsigniaSVG
				era={props.era}
				nationality={props.nationality}
				x={pt(5.025, 'mm')}
				y={pt(5.025, 'mm')}
			/>
			<NationalInsigniaSVG
				era={props.era}
				nationality={props.nationality}
				x={pt(96.775, 'mm')}
				y={pt(5.025, 'mm')}
			/>
		</>
	);
};

export const ConnectedHeaderBlockSVG = connect(mapStateToProps, null)(HeaderBlockSVG);

// jsPDF
export const HeaderBlockPDF = (doc: jsPDF, props: HeaderBlockProps): void => {
	const layout = new HeaderBlockLayout(props);
	RoundedRectanglePDF(doc, {
		x: CardSettings.MARGIN_OUTER,
		y: CardSettings.MARGIN_OUTER + pt(0.05, 'mm'),
		width: pt(100, 'mm'),
		height: pt(8.25, 'mm'),
		radius: CardSettings.CORNER_RADIUS,
		fill: props.accentColor,
	});
	if (props.era === 'LW') {
		doc.addImage(HeaderOverlay, 'PNG', layout.x - pt(1, 'mm'), layout.y - pt(1, 'mm'), layout.width + pt(2, 'mm'), layout.height + pt(2, 'mm'));
	}
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
	NationalInsigniaPDF(doc, {
		...props,
		x: pt(5.025, 'mm'),
		y: pt(5.025, 'mm'),
	});
	NationalInsigniaPDF(doc, {
		...props,
		x: pt(96.775, 'mm'),
		y: pt(5.025, 'mm'),
	});
};

export const ConnectedHeaderBlockPDF = (doc: jsPDF) => HeaderBlockPDF(doc, mapStateToProps(store.getState()));
