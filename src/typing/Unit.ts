import { Era } from '../enums/Eras';
import { MotivationRating } from '../enums/MotivationRatings';
import { Nationality } from '../enums/Nations';
import { UnitSpecialRuleName } from '../enums/UnitSpecialRuleNames';
import { UnitType } from '../enums/UnitTypes';
import { ArmorRating } from './ArmorRating';
import { DiceRollValue } from './DiceRollValue';
import { Weapon } from './Weapon';
import { SoftStatModifier } from './SoftStatModifier';
import { SkillRating } from '../enums/SkillRatings';
import { HitOnRating } from '../enums/HitOnRatings';
import { SaveRating } from './SaveRating';

export interface Unit {
	era: Era;
	nationality: Nationality;
	unitType: UnitType;
	title: string;
	subTitle: string;
	specialRules: UnitSpecialRuleName[];
	motivation: {
		baseRating: MotivationRating;
		modifiers: SoftStatModifier[];
	}
	skill: {
		baseRating: SkillRating;
		modifiers: SoftStatModifier[];
	}
	hitOn: {
		baseRating: HitOnRating;
		modifiers: SoftStatModifier[];
	}
	armor?: ArmorRating;
	save?: SaveRating;
	mobility: {
		tactical: number;
		terrainDash: number;
		crossCountryDash: number;
		roadDash: number;
		cross: DiceRollValue;
	}
	weapons: Weapon[];
}
