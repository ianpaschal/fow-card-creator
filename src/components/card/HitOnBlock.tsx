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
	headerBlockHeight: state.editor.unitCard.layout.headerBlock.height,
	isComponent: state.editor.unitCard.unit.isComponent,
	stat: state.editor.unitCard.unit.hitOn,
	x: state.editor.unitCard.layout.hitOnBlock.x,
	y: state.editor.unitCard.layout.hitOnBlock.y,
});

export type HitOnBlockProps = ReturnType<typeof mapStateToProps>;

export class HitOnBlockLayout {
	static attribute: string = 'hitOn';

	constructor(readonly props: HitOnBlockProps) {}

	get softStatBlockProps(): SoftStatBlockProps {
		return {
			...this.props,
			attribute: HitOnBlockLayout.attribute,
		};
	}
}

// React
export const HitOnBlockSVG: React.FC<HitOnBlockProps> = (props: HitOnBlockProps) => {
	const layout = new HitOnBlockLayout(props);
	return (
		<SoftStatBlockSVG {...layout.softStatBlockProps} />
	);
};

export const ConnectedHitOnBlockSVG = connect(mapStateToProps, null)(HitOnBlockSVG);

// jsPDF
export const HitOnBlockPDF = (doc: jsPDF, props: HitOnBlockProps) => {
	const layout = new HitOnBlockLayout(props);
	SoftStatBlockPDF(doc, layout.softStatBlockProps);
};

export const ConnectedHitOnBlockPDF = (doc: jsPDF) => HitOnBlockPDF(doc, mapStateToProps(store.getState()));
