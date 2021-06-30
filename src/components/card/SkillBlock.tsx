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
	stat: state.editor.unitCard.unit.skill,
	x: state.editor.unitCard.layout.skillBlock.x,
	y: state.editor.unitCard.layout.skillBlock.y,
});

export type SkillBlockProps = ReturnType<typeof mapStateToProps>;

export class SkillBlockLayout {
	static attribute: string = 'skill';

	constructor(readonly props: SkillBlockProps) {}

	get softStatBlockProps(): SoftStatBlockProps {
		return {
			...this.props,
			attribute: SkillBlockLayout.attribute,
		};
	}
}

// React
export const SkillBlockSVG: React.FC<SkillBlockProps> = (props: SkillBlockProps) => {
	const layout = new SkillBlockLayout(props);
	return (
		<SoftStatBlockSVG {...layout.softStatBlockProps} />
	);
};

export const ConnectedSkillBlockSVG = connect(mapStateToProps, null)(SkillBlockSVG);

// jsPDF
export const SkillBlockPDF = (doc: jsPDF, props: SkillBlockProps) => {
	const layout = new SkillBlockLayout(props);
	SoftStatBlockPDF(doc, layout.softStatBlockProps);
};

export const ConnectedSkillBlockPDF = (doc: jsPDF) => SkillBlockPDF(doc, mapStateToProps(store.getState()));
