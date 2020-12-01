import { UnitType } from '../enums/UnitTypes';
import { DiceRollValue } from './DiceRollValue';

export interface SaveRating {
	type: UnitType;
	value: DiceRollValue;
}
