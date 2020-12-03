import { Nationality } from '../enums/Nations';
import { UnitSpecialRuleName, UnitSpecialRuleNames } from '../enums/UnitSpecialRuleNames';
import { UnitType } from '../enums/UnitTypes';
import { getFormValues } from './getFormValues';
import { Unit } from '../typing/Unit';

export interface UnitSpecialRule {
	rule: UnitSpecialRuleName;
	requirements: {
		unitType?: UnitType;
		nationality?: Nationality;
		passengers?: number;
	}
}

export const RULE_REQUIREMENTS: UnitSpecialRule[] = [
	{
		rule: 'TIME_ON_TARGET',
		requirements: {
			unitType: 'GUN',
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
			unitType: 'TANK',
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
			unitType: 'GUN',
		},
	},
	{
		rule: 'LARGE_GUN',
		requirements: {
			unitType: 'GUN',
		},
	},
	{
		rule: 'GIANTIC',
		requirements: {
			unitType: 'GUN',
		},
	},
	{
		rule: 'MOUNTED_ASSAULT',
		requirements: {
			passengers: 1,
		},
	},
	{
		rule: 'TRACTOR',
		requirements: {
			passengers: 1,
		},
	},
];

export function filterUnitSpecialRules(unit: Unit) {
	// eslint-disable-next-line complexity
	return getFormValues(UnitSpecialRuleNames).filter(((rule) => {
		const limitedRule = RULE_REQUIREMENTS.find((r) => r.rule === rule.value);
		if (limitedRule) {
			if (!unit) {
				return false;
			}
			if (limitedRule.requirements.unitType &&
				limitedRule.requirements.unitType !== unit.unitType) {
				return false;
			}
			if (limitedRule.requirements.nationality &&
				limitedRule.requirements.nationality !== unit.nationality) {
				return false;
			}
			if (limitedRule.requirements.passengers &&
				limitedRule.requirements.passengers > unit.passengers) {
				return false;
			}
		}
		return true;
	}));
}
