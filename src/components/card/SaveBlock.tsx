import jsPDF from 'jspdf';
import React from 'react';
import {
	RoundedRectanglePDF,
	RoundedRectangleProps,
	RoundedRectangleSVG,
} from './generic/RoundedRectangle';
import { UnitTypes } from '../../enums/UnitTypes';
import { Settings } from '../../Settings';
import { pt } from '../../utils/convertDistance';
import { FramePDF, FrameProps, FrameSVG } from './generic/Frame';
import { RootState, store } from '../../store';
import { connect } from 'react-redux';
import { TextPDF, TextProps, TextSVG } from './generic/Text';
import { SoftStatBlockLayout } from './SoftStatBlock';
import { formatDiceRoll } from '../../utils/formatDiceRoll';

// Generic
const mapStateToProps = (state: RootState) => ({
	accentColor: state.editor.unitCard.unit.accentColor,
	height: state.editor.unitCard.layout.saveBlock.height,
	isComponent: state.editor.unitCard.unit.isComponent,
	save: state.editor.unitCard.unit.save,
	width: state.editor.unitCard.layout.saveBlock.width,
	x: state.editor.unitCard.layout.saveBlock.x,
	y: state.editor.unitCard.layout.saveBlock.y,
});

export type SaveBlockProps = ReturnType<typeof mapStateToProps>;

export class SaveBlockLayout {
	constructor(readonly props: SaveBlockProps) {}

	get frameProps(): FrameProps {
		return {
			x: this.props.x,
			y: this.props.y,
			width: this.props.width,
			height: this.props.height,
			radius: Settings.CORNER_RADIUS,
			border: { top: Settings.STAT_BLOCK_HEADER_HEIGHT },
			stroke: this.props.accentColor,
			fill: '#FFFFFF',
		};
	}

	get headerProps(): TextProps {
		return {
			x: this.props.x,
			y: this.props.y,
			width: this.props.width,
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
			x: this.props.x + Settings.STAT_BLOCK_INNER_MARGIN,
			y: this.props.y + Settings.STAT_BLOCK_HEADER_HEIGHT + Settings.STROKE_WIDTH,
			width: pt(16, 'mm'),
			height: Settings.ARMOR_RATING_MISC_HEIGHT,
			radius: Settings.CORNER_RADIUS - Settings.STAT_BLOCK_INNER_MARGIN,
			fill: this.props.accentColor,
		};
	}

	get ratingLabelProps(): TextProps {
		const height = pt(2.5, 'mm');
		return {
			x: this.props.x + Settings.STAT_BLOCK_INNER_MARGIN,
			// eslint-disable-next-line max-len
			y: this.props.y + Settings.STAT_BLOCK_HEADER_HEIGHT + Settings.STROKE_WIDTH + (Settings.ARMOR_RATING_MISC_HEIGHT - height),
			width: pt(15.5, 'mm'),
			height,
			color: '#FFFFFF',
			font: 'PTSans-Regular-Italic',
			fontSize: 4.5,
			text: UnitTypes[ this.props.save.type ],
			align: 'center',
		};
	}

	get ratingValueProps(): TextProps {
		return {
			x: this.props.x + pt(17.5, 'mm'),
			y: this.props.y + Settings.STAT_BLOCK_HEADER_HEIGHT + Settings.STROKE_WIDTH,
			width: pt(4, 'mm'),
			height: Settings.ARMOR_RATING_MISC_HEIGHT,
			color: '#000000',
			font: 'OpenSans-Bold',
			fontSize: 12,
			text: formatDiceRoll(this.props.save.value, false),
			align: 'center',
		};
	}
}

// React
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

export const ConnectedSaveBlockSVG = connect(mapStateToProps, null)(SaveBlockSVG);

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

export const ConnectedSaveBlockPDF = (doc: jsPDF) => SaveBlockPDF(doc, mapStateToProps(store.getState()));
