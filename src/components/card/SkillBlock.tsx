import jsPDF from 'jspdf';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Settings } from '../../Settings';
import { RootState, store } from '../../store';
import { SoftStat } from '../../typing/SoftStat';
import { SoftStatBlockPDF, SoftStatBlockProps, SoftStatBlockSVG } from './SoftStatBlock';

export type SkillBlockProps = ConnectedProps<typeof connector>;

export class SkillBlockLayout {
	// Passed
	stat: SoftStat;
	accentColor: string;
	isComponent: boolean;
	x: number;
	y: number;

	// Static
	attribute: string = 'skill';

	constructor(props: SkillBlockProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
		});
	}

	get softStatBlockProps(): SoftStatBlockProps {
		return { ...this };
	}
}

const connector = connect((state: RootState) => ({
	stat: state.editor.unitCard.unit.skill,
	accentColor: state.editor.unitCard.unit.accentColor,
	isComponent: state.editor.unitCard.unit.isComponent,
	x: state.editor.unitCard.layout.skillBlock.x,
	y: state.editor.unitCard.layout.skillBlock.y,
}), null);

export const SkillBlockSVG: React.FC<SkillBlockProps> = (props: SkillBlockProps) => {
	const layout = new SkillBlockLayout(props);
	return (
		<SoftStatBlockSVG {...layout.softStatBlockProps} />
	);
};

export const ConnectedSkillBlockSVG = connector(SkillBlockSVG);

export const SkillBlockPDF = (doc: jsPDF, props: SkillBlockProps) => {
	const layout = new SkillBlockLayout(props);
	SoftStatBlockPDF(doc, layout.softStatBlockProps);
};

export const ConnectedSkillBlockPDF = (doc: jsPDF) => SkillBlockPDF(doc, {
	stat: store.getState().editor.unitCard.unit.skill,
	accentColor: store.getState().editor.unitCard.unit.accentColor,
	isComponent: store.getState().editor.unitCard.unit.isComponent,
	x: store.getState().editor.unitCard.layout.skillBlock.x,
	y: store.getState().editor.unitCard.layout.skillBlock.y,
});
