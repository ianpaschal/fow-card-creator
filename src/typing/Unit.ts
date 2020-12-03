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

	// General Section
	era: Era | '';
	nationality: Nationality | '';
	// region: string;
	unitType: UnitType;
	isFormation: boolean;
	title: string;
	accentColor: string;
	subTitle?: string;

	// Special Properties Section
	specialRules: UnitSpecialRuleName[];
	passengers: number,

	// Soft Stat Section
	isComponent: boolean;
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

	// Armor & Save Section
	armor?: ArmorRating;
	save?: SaveRating;

	// Mobility Section
	mobility: {
		tactical: number;
		terrainDash: number;
		crossCountryDash: number;
		roadDash: number;
		cross: DiceRollValue;
	}

	// Weapons Section
	weapons: Weapon[];

	// Composition Section
}
