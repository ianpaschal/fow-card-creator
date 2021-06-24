import { DiceRollValue } from './DiceRollValue';

export interface SoftStatModifier {
	attribute: string;
	name: string;
	value: DiceRollValue;
}
