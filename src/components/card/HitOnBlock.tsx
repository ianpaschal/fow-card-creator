import jsPDF from 'jspdf';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, store } from '../../store';
import { SoftStat } from '../../typing/SoftStat';
import { SoftStatBlockPDF, SoftStatBlockProps, SoftStatBlockSVG } from './SoftStatBlock';

export type HitOnBlockProps = ConnectedProps<typeof connector>;

export class HitOnBlockLayout {
	// Passed
	stat: SoftStat;
	accentColor: string;
	headerBlockHeight: number;
	isComponent: boolean;
	x: number;
	y: number;

	// Static
	attribute: string = 'hitOn';

	constructor(props: HitOnBlockProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
		});
	}

	get softStatBlockProps(): SoftStatBlockProps {
		return { ...this, y: this.y };
	}
}

const connector = connect((state: RootState) => ({
	stat: state.editor.unitCard.unit.hitOn,
	accentColor: state.editor.unitCard.unit.accentColor,
	headerBlockHeight: state.editor.unitCard.layout.headerBlock.height,
	isComponent: state.editor.unitCard.unit.isComponent,
	x: state.editor.unitCard.layout.hitOnBlock.x,
	y: state.editor.unitCard.layout.hitOnBlock.y,
}), null);

export const HitOnBlockSVG: React.FC<HitOnBlockProps> = (props: HitOnBlockProps) => {
	const layout = new HitOnBlockLayout(props);
	return (
		<SoftStatBlockSVG {...layout.softStatBlockProps} />
	);
};

export const ConnectedHitOnBlockSVG = connector(HitOnBlockSVG);

export const HitOnBlockPDF = (doc: jsPDF, props: HitOnBlockProps) => {
	const layout = new HitOnBlockLayout(props);
	SoftStatBlockPDF(doc, layout.softStatBlockProps);
};

export const ConnectedHitOnBlockPDF = (doc: jsPDF) => HitOnBlockPDF(doc, {
	stat: store.getState().editor.unitCard.unit.hitOn,
	accentColor: store.getState().editor.unitCard.unit.accentColor,
	headerBlockHeight: store.getState().editor.unitCard.layout.headerBlock.height,
	isComponent: store.getState().editor.unitCard.unit.isComponent,
	x: store.getState().editor.unitCard.layout.hitOnBlock.x,
	y: store.getState().editor.unitCard.layout.hitOnBlock.y,
});
