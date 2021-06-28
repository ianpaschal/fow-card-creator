import React from 'react';
import jsPDF from 'jspdf';
import { Settings } from '../../Settings';
import { RootState, store } from '../../store';
import { pt } from '../../utils/convertDistance';
import { TextPDF, TextProps, TextSVG } from './generic/Text';
import { connect, ConnectedProps } from 'react-redux';
import { UnitSpecialRuleName, UnitSpecialRuleNames } from '../../enums/UnitSpecialRuleNames';
import { UnitType, UnitTypes } from '../../enums/UnitTypes';

export type SpecialRulesListProps = ConnectedProps<typeof connector>;

export class SpecialRulesListLayout {
	headerBlockHeight: number;
	specialRules: UnitSpecialRuleName[];
	unitType: UnitType;
	isFormation: boolean;
	passengers: number;

	constructor(props: SpecialRulesListProps) {
		Object.keys(props).forEach((key) => {
			this[ key ] = props[ key ];
		});
	}

	get rulesProps(): TextProps {
		const x = Settings.CARD_MARGINS + Settings.BLOCK_MARGIN + Settings.STAT_BLOCK_WIDTH;
		const bullet = '\u2022';
		const rulesList = [];
		rulesList.push(`${UnitTypes[ this.unitType ]} ${this.isFormation ? 'Formation' : 'Unit'}`.toUpperCase());
		if (this.passengers > 0) {
			rulesList.push(
				'Transport Attachment'.toUpperCase(),
				`Passengers ${this.passengers}`.toUpperCase(),
				'Unit Transport'.toUpperCase(),
			);
		}
		return {
			x,
			y: Settings.CARD_MARGINS + this.headerBlockHeight + Settings.BLOCK_MARGIN,
			width: Settings.CARD_WIDTH - 2 * x,
			height: pt(20, 'mm'),
			text: rulesList.concat(this.specialRules.map((ruleName) => UnitSpecialRuleNames[ ruleName ].toUpperCase())),
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

const mapStateToProps = (state: RootState) => ({
	unitType: state.editor.unitCard.unit.unitType,
	isFormation: state.editor.unitCard.unit.isFormation,
	specialRules: state.editor.unitCard.unit.specialRules,
	headerBlockHeight: state.editor.unitCard.layout.headerBlock.height,
	passengers: state.editor.unitCard.unit.passengers,
});

const connector = connect(mapStateToProps, null);

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

export const ConnectedSpecialRulesListPDF = (doc: jsPDF) => (
	SpecialRulesListPDF(doc, mapStateToProps(store.getState()))
);
