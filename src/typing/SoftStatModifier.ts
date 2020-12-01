import { DiceRollValue } from './DiceRollValue';

export interface SoftStatModifier {
	attribute: string;
	name: string;
	// TODO: Rename to value
	number: DiceRollValue;
}
