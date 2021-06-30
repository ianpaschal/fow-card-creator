import jsPDF from 'jspdf';
import React from 'react';
import { connect } from 'react-redux';
import { RootState, store } from '../../store';
import {
	SoftStatBlockPDF,
	SoftStatBlockProps,
	SoftStatBlockSVG,
} from './SoftStatBlock';

// Generic
const mapStateToProps = (state: RootState) => ({
	accentColor: state.editor.unitCard.unit.accentColor,
	isComponent: state.editor.unitCard.unit.isComponent,
	stat: state.editor.unitCard.unit.motivation,
	x: state.editor.unitCard.layout.motivationBlock.x,
	y: state.editor.unitCard.layout.motivationBlock.y,
});

export type MotivationBlockProps = ReturnType<typeof mapStateToProps>;

export class MotivationBlockLayout {
	static attribute: string = 'motivation';

	constructor(readonly props: MotivationBlockProps) {}

	get softStatBlockProps(): SoftStatBlockProps {
		return {
			...this.props,
			attribute: MotivationBlockLayout.attribute,
		};
	}
}

// React
export const MotivationBlockSVG: React.FC<MotivationBlockProps> = (props: MotivationBlockProps) => {
	const layout = new MotivationBlockLayout(props);
	return (
		<SoftStatBlockSVG {...layout.softStatBlockProps} />
	);
};

export const ConnectedMotivationBlockSVG = connect(mapStateToProps, null)(MotivationBlockSVG);

// jsPDF
export const MotivationBlockPDF = (doc: jsPDF, props: MotivationBlockProps) => {
	const layout = new MotivationBlockLayout(props);
	SoftStatBlockPDF(doc, layout.softStatBlockProps);
};

export const ConnectedMotivationBlockPDF = (doc: jsPDF) => MotivationBlockPDF(doc, mapStateToProps(store.getState()));
