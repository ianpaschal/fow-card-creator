import jsPDF from 'jspdf';
import React from 'react';
import {
	RoundedRectanglePDF,
	RoundedRectangleProps,
	RoundedRectangleSVG,
} from './generic/RoundedRectangle';
import { UnitTypes } from '../../enums/UnitTypes';
import { CardSettings } from '../../CardSettings';
import { pt } from '../../utils/convertDistance';
import { FramePDF, FrameProps, FrameSVG } from './generic/Frame';
import { RootState, store } from '../../store';
import { connect } from 'react-redux';
import { TextPDF, TextProps, TextSVG } from './generic/Text';
import { SoftStatBlockLayout } from './SoftStatBlock';
import { formatDiceRoll } from '../../utils/formatDiceRoll';
import { FontNames } from '../../enums/FontNames';

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
	static ratingHeight: number = pt(7, 'mm');

	constructor(readonly props: SaveBlockProps) {}

	get frameProps(): FrameProps {
		return {
			x: this.props.x,
			y: this.props.y,
			width: this.props.width,
			height: this.props.height,
			radius: CardSettings.CORNER_RADIUS,
			border: { top: SoftStatBlockLayout.headerHeight },
			stroke: this.props.accentColor,
			fill: CardSettings.COLOR_WHITE,
		};
	}

	get headerProps(): TextProps {
		return {
			x: this.props.x,
			y: this.props.y,
			width: this.props.width,
			height: SoftStatBlockLayout.headerHeight,
			text: 'SAVE',
			fontSize: SoftStatBlockLayout.headerFontSize,
			color: CardSettings.COLOR_WHITE,
			font: FontNames.OPEN_SANS_BOLD,
			align: 'center',
		};
	}

	get nameAreaProps(): RoundedRectangleProps {
		return {
			x: this.props.x + SoftStatBlockLayout.innerMargin,
			y: this.props.y + SoftStatBlockLayout.headerHeight + CardSettings.STROKE_WIDTH,
			width: pt(16, 'mm'),
			height: SaveBlockLayout.ratingHeight,
			radius: CardSettings.CORNER_RADIUS - SoftStatBlockLayout.innerMargin,
			fill: this.props.accentColor,
		};
	}

	get ratingLabelProps(): TextProps {
		const height = pt(2.5, 'mm');
		return {
			x: this.props.x + SoftStatBlockLayout.innerMargin,
			// eslint-disable-next-line max-len
			y: this.props.y + SoftStatBlockLayout.headerHeight + CardSettings.STROKE_WIDTH + (SaveBlockLayout.ratingHeight - height),
			width: pt(15.5, 'mm'),
			height,
			color: CardSettings.COLOR_WHITE,
			font: FontNames.PT_SANS_REGULAR_ITALIC,
			fontSize: 4.5,
			text: UnitTypes[ this.props.save.type ],
			align: 'center',
		};
	}

	get ratingValueProps(): TextProps {
		return {
			x: this.props.x + pt(17.5, 'mm'),
			y: this.props.y + SoftStatBlockLayout.headerHeight + CardSettings.STROKE_WIDTH,
			width: pt(4, 'mm'),
			height: SaveBlockLayout.ratingHeight,
			color: CardSettings.COLOR_BLACK,
			font: FontNames.OPEN_SANS_BOLD,
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
