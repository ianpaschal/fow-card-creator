import { HitOnRating } from '../../enums/HitOnRatings';
import { MotivationRating } from '../../enums/MotivationRatings';
import { SkillRating } from '../../enums/SkillRatings';
import { UnitType } from '../../enums/UnitTypes';
import { DiceRollValue } from '../../typing/DiceRollValue';
import { Unit } from '../../typing/Unit';
import { getBaseColor } from '../../utils/getBaseColor';

export const defaultUnit: Unit = {
	nationality: '',
	unitType: 'TANK' as UnitType,
	isFormation: false,
	accentColor: getBaseColor(),
	isComponent: false,
	passengers: 0,
	era: '',
	title: '',
	subTitle: '',
	subTitleAboveTitle: false,
	specialRules: [],
	motivation: {
		baseRating: 'CONFIDENT' as MotivationRating,
		modifiers: [],
	},
	skill: {
		baseRating: 'TRAINED' as SkillRating,
		modifiers: [],
	},
	hitOn: {
		baseRating: 'AGGRESSIVE' as HitOnRating,
		modifiers: [],
	},
	armor: {
		front: 6,
		sideRear: 3,
		top: 1,
	},
	mobility: {
		tactical: 10,
		terrainDash: 12,
		crossCountryDash: 18,
		roadDash: 24,
		cross: 3 as DiceRollValue,
	},
	weapons: [],
};
