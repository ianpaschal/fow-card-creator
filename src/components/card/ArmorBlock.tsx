import jsPDF from 'jspdf';
import React from 'react';
import {
	RoundedRectanglePDF,
	RoundedRectangleProps,
	RoundedRectangleSVG,
} from './generic/RoundedRectangle';
import { ArmorAttributeKeys } from '../../enums/ArmorAttributes';
import { Settings } from '../../Settings';
import { pt } from '../../utils/convertDistance';
import { TextPDF, TextProps, TextSVG } from './generic/Text';
import { FramePDF, FrameProps, FrameSVG } from './generic/Frame';
import { connect } from 'react-redux';
import { RootState, store } from '../../store';
import { SoftStatBlockLayout } from './SoftStatBlock';

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
	constructor(readonly props: ArmorBlockProps) {}

	get frameProps(): FrameProps {
		return {
			...this.props,
			border: { top: Settings.STAT_BLOCK_HEADER_HEIGHT },
			fill: '#FFFFFF',
			fillOpacity: 0.5,
			radius: Settings.CORNER_RADIUS,
			stroke: this.props.accentColor,
		};
	}

	get headerProps(): TextProps {
		return {
			...this.props,
			align: 'center',
			color: '#FFFFFF',
			font: 'OpenSans-Bold',
			fontSize: Settings.STAT_HEADER_FONT_SIZE,
			height: SoftStatBlockLayout.headerHeight,
			text: 'ARMOUR',
		};
	}

	computeRatingNameArea(i: number): RoundedRectangleProps {
		const offsetPerRating = Settings.STROKE_WIDTH + Settings.ARMOR_RATING_TANK_HEIGHT;
		return {
			fill: this.props.accentColor,
			height: Settings.ARMOR_RATING_TANK_HEIGHT,
			radius: Settings.CORNER_RADIUS - Settings.STAT_BLOCK_INNER_MARGIN,
			width: pt(17, 'mm'),
			x: this.props.x + Settings.STAT_BLOCK_INNER_MARGIN,
			y: this.props.y + Settings.STAT_BLOCK_HEADER_HEIGHT + Settings.STROKE_WIDTH + (i * offsetPerRating),
		};
	}

	getRatingLabelProps(key: string, i: number): TextProps {
		const offsetPerRating = Settings.STROKE_WIDTH + Settings.ARMOR_RATING_TANK_HEIGHT;
		const keyToLabelMappings = {
			front: 'FRONT',
			sideRear: 'SIDE & REAR',
			top: 'TOP',
		};
		return {
			align: 'left',
			color: '#FFFFFF',
			font: 'OpenSans-SemiBold',
			fontSize: 7,
			height: Settings.ARMOR_RATING_TANK_HEIGHT,
			lineHeight: pt(2, 'mm'),
			text: keyToLabelMappings[ key ],
			width: pt(10, 'mm'),
			x: this.props.x + pt(1, 'mm'),
			y: this.props.y + Settings.STAT_BLOCK_HEADER_HEIGHT + Settings.STROKE_WIDTH + (i * offsetPerRating),
		};
	}

	getRatingValueProps(key: string, i: number): TextProps {
		const offsetPerRating = Settings.STROKE_WIDTH + Settings.ARMOR_RATING_TANK_HEIGHT;
		return {
			align: 'center',
			color: '#000000',
			font: 'OpenSans-Bold',
			fontSize: 12,
			height: Settings.ARMOR_RATING_TANK_HEIGHT,
			text: this.props.armor[ key ].toString(),
			width: pt(3, 'mm'),
			x: this.props.x + pt(18.5, 'mm'),
			y: this.props.y + Settings.STAT_BLOCK_HEADER_HEIGHT + Settings.STROKE_WIDTH + (i * offsetPerRating),
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
			{ArmorAttributeKeys.map((key, i) => (
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
	ArmorAttributeKeys.forEach((key, i) => {
		RoundedRectanglePDF(doc, layout.computeRatingNameArea(i));
		TextPDF(doc, layout.getRatingLabelProps(key, i));
		TextPDF(doc, layout.getRatingValueProps(key, i));
	});
};

export const ConnectedArmorBlockPDF = (doc: jsPDF) => ArmorBlockPDF(doc, mapStateToProps(store.getState()));
