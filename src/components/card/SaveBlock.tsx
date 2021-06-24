import jsPDF from 'jspdf';
import React from 'react';
import { RoundedRectanglePDF, RoundedRectangleProps, RoundedRectangleSVG } from './generic/RoundedRectangle';
import { UnitTypes } from '../../enums/UnitTypes';
import { Settings } from '../../Settings';
import { pt } from '../../utils/convertDistance';
import { FramePDF, FrameProps, FrameSVG } from './generic/Frame';
import { RootState, store } from '../../store';
import { connect, ConnectedProps } from 'react-redux';
import { TextPDF, TextProps, TextSVG } from './generic/Text';
import { SaveRating } from '../../typing/SaveRating';
import { SoftStatBlockLayout } from './SoftStatBlock';
import { formatDiceRoll } from '../../utils/formatDiceRoll';

export type SaveBlockProps = ConnectedProps<typeof connector>;

export class SaveBlockLayout {
	save: SaveRating;
	accentColor: string;
	x: number;
	y: number;
	width: number;
	height: number;

	constructor(props: SaveBlockProps) {
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
		};
	}

	get headerProps(): TextProps {
		return {
			x: this.x,
			y: this.y,
			width: this.width,
			height: SoftStatBlockLayout.headerHeight,
			text: 'SAVE',
			fontSize: Settings.STAT_HEADER_FONT_SIZE,
			color: '#FFFFFF',
			font: 'OpenSans-Bold',
			align: 'center',
		};
	}

	get nameAreaProps(): RoundedRectangleProps {
		return {
			x: this.x + Settings.STAT_BLOCK_INNER_MARGIN,
			y: this.y + Settings.STAT_BLOCK_HEADER_HEIGHT + Settings.STROKE_WIDTH,
			width: pt(16, 'mm'),
			height: Settings.ARMOR_RATING_MISC_HEIGHT,
			radius: Settings.CORNER_RADIUS - Settings.STAT_BLOCK_INNER_MARGIN,
			fill: this.accentColor,
		};
	}

	get ratingLabelProps(): TextProps {
		const height = pt(2.5, 'mm');
		return {
			x: this.x + Settings.STAT_BLOCK_INNER_MARGIN,
			// eslint-disable-next-line max-len
			y: this.y + Settings.STAT_BLOCK_HEADER_HEIGHT + Settings.STROKE_WIDTH + (Settings.ARMOR_RATING_MISC_HEIGHT - height),
			width: pt(15.5, 'mm'),
			height,
			color: '#FFFFFF',
			font: 'PTSans-Regular-Italic',
			fontSize: 4.5,
			text: UnitTypes[ this.save.type ],
			align: 'center',
		};
	}

	get ratingValueProps(): TextProps {
		return {
			x: this.x + pt(17.5, 'mm'),
			y: this.y + Settings.STAT_BLOCK_HEADER_HEIGHT + Settings.STROKE_WIDTH,
			width: pt(4, 'mm'),
			height: Settings.ARMOR_RATING_MISC_HEIGHT,
			color: '#000000',
			font: 'OpenSans-Bold',
			fontSize: 12,
			text: formatDiceRoll(this.save.value, false),
			align: 'center',
		};
	}
}

// React
const connector = connect((state: RootState) => ({
	save: state.editor.unitCard.unit.save,
	accentColor: state.editor.unitCard.unit.accentColor,
	isComponent: state.editor.unitCard.unit.isComponent,
	x: state.editor.unitCard.layout.saveBlock.x,
	y: state.editor.unitCard.layout.saveBlock.y,
	width: state.editor.unitCard.layout.saveBlock.width,
	height: state.editor.unitCard.layout.saveBlock.height,
}), null);

export const SaveBlockSVG: React.FC<SaveBlockProps> = (props: SaveBlockProps) => {
	if (!props.save) {
		return null;
	}
	const layout = new SaveBlockLayout(props);
	return (
		<>
			<FrameSVG {...layout.frameProps} />
			<TextSVG {...layout.headerProps} />
			<RoundedRectangleSVG {...layout.nameAreaProps} />
			<TextSVG {...layout.ratingLabelProps} />
			<TextSVG {...layout.ratingValueProps} />
		</>
	);
};

export const ConnectedSaveBlockSVG = connector(SaveBlockSVG);

// jsPDF
export const SaveBlockPDF = (doc: jsPDF, props: SaveBlockProps) => {
	if (!props.save) {
		return;
	}
	const layout = new SaveBlockLayout(props);
	FramePDF(doc, layout.frameProps);
	TextPDF(doc, layout.headerProps);
	RoundedRectanglePDF(doc, layout.nameAreaProps);
	TextPDF(doc, layout.ratingLabelProps);
	TextPDF(doc, layout.ratingValueProps);
};

export const ConnectedSaveBlockPDF = (doc: jsPDF) => SaveBlockPDF(doc, {
	save: store.getState().editor.unitCard.unit.save,
	accentColor: store.getState().editor.unitCard.unit.accentColor,
	isComponent: store.getState().editor.unitCard.unit.isComponent,
	x: store.getState().editor.unitCard.layout.saveBlock.x,
	y: store.getState().editor.unitCard.layout.saveBlock.y,
	width: store.getState().editor.unitCard.layout.saveBlock.width,
	height: store.getState().editor.unitCard.layout.saveBlock.height,
});
