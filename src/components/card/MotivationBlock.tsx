import jsPDF from 'jspdf';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, store } from '../../store';
import { SoftStat } from '../../typing/SoftStat';
import { SoftStatBlockPDF, SoftStatBlockProps, SoftStatBlockSVG } from './SoftStatBlock';

export type MotivationBlockProps = ConnectedProps<typeof connector>;

export class MotivationBlockLayout {
	// Passed
	stat: SoftStat;
	accentColor: string;
	isComponent: boolean;
	x: number;
	y: number;

	// Static
	attribute: string = 'motivation';

	constructor(props: MotivationBlockProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
		});
	}

	get softStatBlockProps(): SoftStatBlockProps {
		return { ...this, y: this.y };
	}
}

const connector = connect((state: RootState) => ({
	stat: state.editor.unitCard.unit.motivation,
	accentColor: state.editor.unitCard.unit.accentColor,
	isComponent: state.editor.unitCard.unit.isComponent,
	x: state.editor.unitCard.layout.motivationBlock.x,
	y: state.editor.unitCard.layout.motivationBlock.y,
}), null);

export const MotivationBlockSVG: React.FC<MotivationBlockProps> = (props: MotivationBlockProps) => {
	const layout = new MotivationBlockLayout(props);
	return (
		<SoftStatBlockSVG {...layout.softStatBlockProps} />
	);
};

export const ConnectedMotivationBlockSVG = connector(MotivationBlockSVG);

export const MotivationBlockPDF = (doc: jsPDF, props: MotivationBlockProps) => {
	const layout = new MotivationBlockLayout(props);
	SoftStatBlockPDF(doc, layout.softStatBlockProps);
};

export const ConnectedMotivationBlockPDF = (doc: jsPDF) => MotivationBlockPDF(doc, {
	stat: store.getState().editor.unitCard.unit.motivation,
	accentColor: store.getState().editor.unitCard.unit.accentColor,
	isComponent: store.getState().editor.unitCard.unit.isComponent,
	x: store.getState().editor.unitCard.layout.motivationBlock.x,
	y: store.getState().editor.unitCard.layout.motivationBlock.y,
});
