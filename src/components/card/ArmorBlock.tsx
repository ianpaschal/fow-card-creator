import jsPDF from 'jspdf';
import React from 'react';
import { RoundedRectanglePDF, RoundedRectangleProps, RoundedRectangleSVG } from './generic/RoundedRectangle';
import { ArmorAttributeKeys } from '../../enums/ArmorAttributes';
import { Settings } from '../../Settings';
import { pt } from '../../utils/convertDistance';
import { TextPDF, TextProps, TextSVG } from './generic/Text';
import { FramePDF, FrameProps, FrameSVG } from './generic/Frame';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, store } from '../../store';
import { SoftStatBlockLayout } from './SoftStatBlock';
import { ArmorRating } from '../../typing/ArmorRating';

export type ArmorBlockProps = ConnectedProps<typeof connector>;

export class ArmorBlockLayout {
	armor: ArmorRating;
	accentColor: string;
	x: number;
	y: number;
	width: number;
	height: number;

	constructor(props: ArmorBlockProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
		});
	}

	get frameProps(): FrameProps {
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: this.height,
			radius: Settings.CORNER_RADIUS,
			border: { top: Settings.STAT_BLOCK_HEADER_HEIGHT },
			stroke: this.accentColor,
			fill: '#FFFFFF',
			fillOpacity: 0.5,
		};
	}

	get headerProps(): TextProps {
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: SoftStatBlockLayout.headerHeight,
			text: 'ARMOUR',
			fontSize: Settings.STAT_HEADER_FONT_SIZE,
			color: '#FFFFFF',
			font: 'OpenSans-Bold',
			align: 'center',
		};
	}

	computeRatingNameArea(i: number): RoundedRectangleProps {
		const offsetPerRating = Settings.STROKE_WIDTH + Settings.ARMOR_RATING_TANK_HEIGHT;
		return {
			x: this.x + Settings.STAT_BLOCK_INNER_MARGIN,
			y: this.y + Settings.STAT_BLOCK_HEADER_HEIGHT + Settings.STROKE_WIDTH + (i * offsetPerRating),
			width: pt(17, 'mm'),
			height: Settings.ARMOR_RATING_TANK_HEIGHT,
			radius: Settings.CORNER_RADIUS - Settings.STAT_BLOCK_INNER_MARGIN,
			fill: this.accentColor,
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
			x: this.x + pt(1, 'mm'),
			y: this.y + Settings.STAT_BLOCK_HEADER_HEIGHT + Settings.STROKE_WIDTH + (i * offsetPerRating),
			width: pt(10, 'mm'),
			height: Settings.ARMOR_RATING_TANK_HEIGHT,
			color: '#FFFFFF',
			font: 'OpenSans-SemiBold',
			fontSize: 7,
			text: keyToLabelMappings[ key ],
			align: 'left',
			lineHeight: pt(2, 'mm'),
		};
	}

	getRatingValueProps(key: string, i: number): TextProps {
		const offsetPerRating = Settings.STROKE_WIDTH + Settings.ARMOR_RATING_TANK_HEIGHT;
		return {
			x: this.x + pt(18.5, 'mm'),
			y: this.y + Settings.STAT_BLOCK_HEADER_HEIGHT + Settings.STROKE_WIDTH + (i * offsetPerRating),
			width: pt(3, 'mm'),
			height: Settings.ARMOR_RATING_TANK_HEIGHT,
			color: '#000000',
			font: 'OpenSans-Bold',
			fontSize: 12,
			text: this.armor[ key ].toString(),
			align: 'center',
		};
	}
}

// React
const connector = connect((state: RootState) => ({
	armor: state.editor.unitCard.unit.armor,
	accentColor: state.editor.unitCard.unit.accentColor,
	isComponent: state.editor.unitCard.unit.isComponent,
	x: state.editor.unitCard.layout.armorBlock.x,
	y: state.editor.unitCard.layout.armorBlock.y,
	width: state.editor.unitCard.layout.armorBlock.width,
	height: state.editor.unitCard.layout.armorBlock.height,
}), null);

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

export const ConnectedArmorBlockSVG = connector(ArmorBlockSVG);

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

export const ConnectedArmorBlockPDF = (doc: jsPDF) => ArmorBlockPDF(doc, {
	armor: store.getState().editor.unitCard.unit.armor,
	accentColor: store.getState().editor.unitCard.unit.accentColor,
	isComponent: store.getState().editor.unitCard.unit.isComponent,
	x: store.getState().editor.unitCard.layout.armorBlock.x,
	y: store.getState().editor.unitCard.layout.armorBlock.y,
	width: store.getState().editor.unitCard.layout.armorBlock.width,
	height: store.getState().editor.unitCard.layout.armorBlock.height,
});
