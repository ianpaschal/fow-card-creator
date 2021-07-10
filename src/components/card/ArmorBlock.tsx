import jsPDF from 'jspdf';
import React from 'react';
import {
	RoundedRectanglePDF,
	RoundedRectangleProps,
	RoundedRectangleSVG,
} from './generic/RoundedRectangle';
import { ArmorFieldKeys } from '../../enums/ArmorFields';
import { CardSettings } from '../../CardSettings';
import { pt } from '../../utils/convertDistance';
import { TextPDF, TextProps, TextSVG } from './generic/Text';
import { FramePDF, FrameProps, FrameSVG } from './generic/Frame';
import { connect } from 'react-redux';
import { RootState, store } from '../../store';
import { SoftStatBlockLayout } from './SoftStatBlock';
import { FontNames } from '../../enums/FontNames';

// Generic
const mapStateToProps = (state: RootState) => ({
	accentColor: state.editor.unitCard.unit.accentColor,
	armor: state.editor.unitCard.unit.armor,
	height: state.editor.unitCard.layout.armorBlock.height,
	width: state.editor.unitCard.layout.armorBlock.width,
	x: state.editor.unitCard.layout.armorBlock.x,
	y: state.editor.unitCard.layout.armorBlock.y,
});

export type ArmorBlockProps = ReturnType<typeof mapStateToProps>;

export class ArmorBlockLayout {
	static ratingHeight: number = pt(5.3, 'mm');

	constructor(readonly props: ArmorBlockProps) {}

	get frameProps(): FrameProps {
		return {
			...this.props,
			border: { top: SoftStatBlockLayout.headerHeight },
			fill: CardSettings.COLOR_WHITE,
			fillOpacity: 0.5,
			radius: CardSettings.CORNER_RADIUS,
			stroke: this.props.accentColor,
		};
	}

	get headerProps(): TextProps {
		return {
			...this.props,
			align: 'center',
			color: CardSettings.COLOR_WHITE,
			font: FontNames.OPEN_SANS_BOLD,
			fontSize: SoftStatBlockLayout.headerFontSize,
			height: SoftStatBlockLayout.headerHeight,
			text: 'ARMOUR',
		};
	}

	computeRatingNameArea(i: number): RoundedRectangleProps {
		const offsetPerRating = CardSettings.STROKE_WIDTH + ArmorBlockLayout.ratingHeight;
		return {
			fill: this.props.accentColor,
			height: ArmorBlockLayout.ratingHeight,
			radius: CardSettings.CORNER_RADIUS - SoftStatBlockLayout.innerMargin,
			width: pt(17, 'mm'),
			x: this.props.x + SoftStatBlockLayout.innerMargin,
			y: this.props.y + SoftStatBlockLayout.headerHeight + CardSettings.STROKE_WIDTH + (i * offsetPerRating),
		};
	}

	getRatingLabelProps(key: string, i: number): TextProps {
		const offsetPerRating = CardSettings.STROKE_WIDTH + ArmorBlockLayout.ratingHeight;
		const keyToLabelMappings = {
			front: 'FRONT',
			sideRear: 'SIDE & REAR',
			top: 'TOP',
		};
		return {
			align: 'left',
			color: CardSettings.COLOR_WHITE,
			font: FontNames.OPEN_SANS_SEMI_BOLD,
			fontSize: 7,
			height: ArmorBlockLayout.ratingHeight,
			lineHeight: pt(2, 'mm'),
			text: keyToLabelMappings[ key ],
			width: pt(10, 'mm'),
			x: this.props.x + pt(1, 'mm'),
			y: this.props.y + SoftStatBlockLayout.headerHeight + CardSettings.STROKE_WIDTH + (i * offsetPerRating),
		};
	}

	getRatingValueProps(key: string, i: number): TextProps {
		const offsetPerRating = CardSettings.STROKE_WIDTH + ArmorBlockLayout.ratingHeight;
		return {
			align: 'center',
			color: CardSettings.COLOR_BLACK,
			font: FontNames.OPEN_SANS_BOLD,
			fontSize: 12,
			height: ArmorBlockLayout.ratingHeight,
			text: this.props.armor[ key ].toString(),
			width: pt(3, 'mm'),
			x: this.props.x + pt(18.5, 'mm'),
			y: this.props.y + SoftStatBlockLayout.headerHeight + CardSettings.STROKE_WIDTH + (i * offsetPerRating),
		};
	}
}

// React
export const ArmorBlockSVG: React.FC<ArmorBlockProps> = (props: ArmorBlockProps) => {
	if (!props.armor) {
		return null;
	}
	const layout = new ArmorBlockLayout(props);
	return (
		<>
			<FrameSVG {...layout.frameProps} />
			<TextSVG {...layout.headerProps} />
			{ArmorFieldKeys.map((key, i) => (
				<React.Fragment key={i}>
					<RoundedRectangleSVG  {...layout.computeRatingNameArea(i)} />
					<TextSVG {...layout.getRatingLabelProps(key, i)} />
					<TextSVG {...layout.getRatingValueProps(key, i)} />
				</React.Fragment>
			))}
		</>
	);
};

export const ConnectedArmorBlockSVG = connect(mapStateToProps, null)(ArmorBlockSVG);

// jsPDF
export const ArmorBlockPDF = (doc: jsPDF, props: ArmorBlockProps) => {
	if (!props.armor) {
		return;
	}
	const layout = new ArmorBlockLayout(props);
	FramePDF(doc, layout.frameProps);
	TextPDF(doc, layout.headerProps);
	ArmorFieldKeys.forEach((key, i) => {
		RoundedRectanglePDF(doc, layout.computeRatingNameArea(i));
		TextPDF(doc, layout.getRatingLabelProps(key, i));
		TextPDF(doc, layout.getRatingValueProps(key, i));
	});
};

export const ConnectedArmorBlockPDF = (doc: jsPDF) => ArmorBlockPDF(doc, mapStateToProps(store.getState()));
