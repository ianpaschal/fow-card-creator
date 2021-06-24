import jsPDF from 'jspdf';
import React from 'react';
import { connect } from 'react-redux';
import { Settings } from '../../Settings';
import { RootState, store } from '../../store';
import { SoftStat } from '../../typing/SoftStat';
import { SoftStatBlockPDF, SoftStatBlockProps, SoftStatBlockSVG } from './SoftStatBlock';

export interface HitOnBlockProps {
	stat: SoftStat;
	accentColor: string;
	headerBlockHeight: number;
	isComponent: boolean;
}

export class HitOnBlockLayout {
	// Passed
	stat: SoftStat;
	accentColor: string;
	headerBlockHeight: number;
	isComponent: boolean;

	// Static
	x: number = Settings.CARD_WIDTH - (Settings.CARD_MARGINS + Settings.STAT_BLOCK_WIDTH);
	attribute: string = 'hitOn';

	constructor(props: HitOnBlockProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
		});
	}

	get y(): number {
		return Settings.CARD_MARGINS + this.headerBlockHeight + Settings.BLOCK_MARGIN;
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
});
