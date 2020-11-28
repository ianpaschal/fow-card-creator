import { Nationality } from '../enums/Nations';
import { UnitSpecialRuleName, UnitSpecialRuleNames } from '../enums/UnitSpecialRuleNames';
import { UnitType } from '../enums/UnitTypes';
import { getFormValues } from './getFormValues';

export interface UnitSpecialRule {
	rule: UnitSpecialRuleName;
	requirements: {
		unitType?: UnitType;
		nationality?: Nationality;
	}
}

export const RULE_REQUIREMENTS: UnitSpecialRule[] = [
	{
		rule: 'TIME_ON_TARGET',
		requirements: {
			unitType: 'GUN_UNIT',
			nationality: 'US',
		},
	},
	{
		rule: 'SEEK_STRIKE_AND_DESTROY',
		requirements: {
			nationality: 'US',
		},
	},
	{
		rule: 'RANGERS_LEAD_THE_WAY',
		requirements: {
			nationality: 'US',
		},
	},
	{
		rule: 'BAZOOKA_SKIRTS',
		requirements: {
			unitType: 'TANK_UNIT',
			nationality: 'GE',
		},
	},
	{
		rule: 'STORMTROOPERS',
		requirements: {
			nationality: 'GE',
		},
	},
	{
		rule: 'GUN_SHIELD',
		requirements: {
			unitType: 'GUN_UNIT',
		},
	},
	{
		rule: 'LARGE_GUN',
		requirements: {
			unitType: 'GUN_UNIT',
		},
	},
	{
		rule: 'GIANTIC',
		requirements: {
			unitType: 'GUN_UNIT',
		},
	},
];

export function filterUnitSpecialRules(unitType: UnitType, nationality: Nationality) {
	return getFormValues(UnitSpecialRuleNames).filter(((rule) => {
		const limitedRule = RULE_REQUIREMENTS.find((r) => r.rule === rule.value);
		if (limitedRule) {
			if (limitedRule.requirements.unitType &&
				limitedRule.requirements.unitType !== unitType) {
				return false;
			}
			if (limitedRule.requirements.nationality &&
				limitedRule.requirements.nationality !== nationality) {
				return false;
			}
		}
		return true;
	}));
}
