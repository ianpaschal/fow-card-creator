import React from 'react';
import jsPDF from 'jspdf';
import { CardSettings } from '../../CardSettings';
import { RootState, store } from '../../store';
import { pt } from '../../utils/convertDistance';
import { TextPDF, TextProps, TextSVG } from './generic/Text';
import { connect } from 'react-redux';
import { UnitSpecialRuleNames } from '../../enums/UnitSpecialRuleNames';
import { UnitTypes } from '../../enums/UnitTypes';
import { SoftStatBlockLayout } from './SoftStatBlock';
import { FontNames } from '../../enums/FontNames';

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
		const x = CardSettings.MARGIN_OUTER + CardSettings.MARGIN_INNER + SoftStatBlockLayout.width;
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
			y: CardSettings.MARGIN_OUTER + this.props.headerBlockHeight + CardSettings.MARGIN_INNER,
			width: CardSettings.WIDTH - 2 * x,
			height: pt(20, 'mm'),
			// eslint-disable-next-line max-len
			text: rulesList.concat(this.props.specialRules.map((ruleName) => UnitSpecialRuleNames[ ruleName ].toUpperCase())),
			fontSize: 5.7,
			color: CardSettings.COLOR_BLACK,
			font: FontNames.OPEN_SANS_BOLD,
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
