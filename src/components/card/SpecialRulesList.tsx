import React from 'react';
import jsPDF from 'jspdf';
import { Settings } from '../../Settings';
import { RootState, store } from '../../store';
import { SoftStat } from '../../typing/SoftStat';
import { pt } from '../../utils/convertDistance';
import { TextPDF, TextProps, TextSVG } from './generic/Text';
import { connect, ConnectedProps } from 'react-redux';
import { UnitSpecialRuleName, UnitSpecialRuleNames } from '../../enums/UnitSpecialRuleNames';

export type SpecialRulesListProps = ConnectedProps<typeof connector>;

export class SpecialRulesListLayout {
	headerBlockHeight: number;
	specialRules: UnitSpecialRuleName[];

	constructor(props: SpecialRulesListProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
		});
	}

	get rulesProps(): TextProps {
		const x = Settings.CARD_MARGINS + Settings.BLOCK_MARGIN + Settings.STAT_BLOCK_WIDTH;
		return {
			x,
			y: Settings.CARD_MARGINS + this.headerBlockHeight + Settings.BLOCK_MARGIN,
			width: Settings.CARD_WIDTH - 2 * x,
			height: pt(20, 'mm'),
			text: this.specialRules.map((ruleName) => UnitSpecialRuleNames[ ruleName ]).join(' '),
			fontSize: Settings.STAT_HEADER_FONT_SIZE,
			color: '#000000',
			font: 'OpenSans-Regular',
			align: 'center',
			verticalAlign: 'top',
			lineHeight: pt(2, 'mm'),
		};
	}
}

const connector = connect((state: RootState) => ({
	specialRules: state.editor.unitCard.unit.specialRules,
	headerBlockHeight: state.editor.unitCard.layout.headerBlock.height,
}), null);

export const SpecialRulesListSVG: React.FC<SpecialRulesListProps> = (props: SpecialRulesListProps) => {
	const layout = new SpecialRulesListLayout(props);
	return (
		<TextSVG {...layout.rulesProps} />
	);
};

export const ConnectedSpecialRulesListSVG = connector(SpecialRulesListSVG);

export const SpecialRulesListPDF = (doc: jsPDF, props: SpecialRulesListProps) => {
	const layout = new SpecialRulesListLayout(props);
	TextPDF(doc, layout.rulesProps);
};

export const ConnectedSpecialRulesListPDF = (doc: jsPDF) => SpecialRulesListPDF(doc, {
	specialRules: store.getState().editor.unitCard.unit.specialRules,
	headerBlockHeight: store.getState().editor.unitCard.layout.headerBlock.height,
});
