import React from 'react';
import jsPDF from 'jspdf';
import { Settings } from '../../Settings';
import { RootState, store } from '../../store';
import { pt } from '../../utils/convertDistance';
import { TextPDF, TextProps, TextSVG } from './generic/Text';
import { connect } from 'react-redux';
import { UnitSpecialRuleNames } from '../../enums/UnitSpecialRuleNames';
import { UnitTypes } from '../../enums/UnitTypes';

// Generic
const mapStateToProps = (state: RootState) => ({
	headerBlockHeight: state.editor.unitCard.layout.headerBlock.height,
	isFormation: state.editor.unitCard.unit.isFormation,
	passengers: state.editor.unitCard.unit.passengers,
	specialRules: state.editor.unitCard.unit.specialRules,
	unitType: state.editor.unitCard.unit.unitType,
});

export type SpecialRulesListProps = ReturnType<typeof mapStateToProps>;

export class SpecialRulesListLayout {
	constructor(readonly props: SpecialRulesListProps) {}

	get rulesProps(): TextProps {
		const x = Settings.CARD_MARGINS + Settings.BLOCK_MARGIN + Settings.STAT_BLOCK_WIDTH;
		const bullet = '\u2022';
		const rulesList = [];
		rulesList.push(`${UnitTypes[ this.props.unitType ]} ${this.props.isFormation ? 'Formation' : 'Unit'}`.toUpperCase());
		if (this.props.passengers > 0) {
			rulesList.push(
				'Transport Attachment'.toUpperCase(),
				`Passengers ${this.props.passengers}`.toUpperCase(),
				'Unit Transport'.toUpperCase(),
			);
		}
		return {
			x,
			y: Settings.CARD_MARGINS + this.props.headerBlockHeight + Settings.BLOCK_MARGIN,
			width: Settings.CARD_WIDTH - 2 * x,
			height: pt(20, 'mm'),
			// eslint-disable-next-line max-len
			text: rulesList.concat(this.props.specialRules.map((ruleName) => UnitSpecialRuleNames[ ruleName ].toUpperCase())),
			fontSize: 5.7,
			color: '#000000',
			font: 'OpenSans-Bold',
			align: 'center',
			verticalAlign: 'top',
			lineHeight: pt(2, 'mm'),
			linePrefix: bullet,
			lineSuffix: bullet,
			separator: bullet,
		};
	}
}

// React
export const SpecialRulesListSVG: React.FC<SpecialRulesListProps> = (props: SpecialRulesListProps) => {
	const layout = new SpecialRulesListLayout(props);
	return (
		<TextSVG {...layout.rulesProps} />
	);
};

export const ConnectedSpecialRulesListSVG = connect(mapStateToProps, null)(SpecialRulesListSVG);

// jsPDF
export const SpecialRulesListPDF = (doc: jsPDF, props: SpecialRulesListProps) => {
	const layout = new SpecialRulesListLayout(props);
	TextPDF(doc, layout.rulesProps);
};

export const ConnectedSpecialRulesListPDF = (doc: jsPDF) => (
	SpecialRulesListPDF(doc, mapStateToProps(store.getState()))
);
