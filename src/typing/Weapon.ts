import { DiceRollValue } from './DiceRollValue';

export interface Weapon {
	name: string;
	direct: {
		range: number;
		rof: {
			halted: number;
			moving: number;
		}
		antiTank: number;
		firePower: DiceRollValue;
		notes: string[];
	}
	bombardment?: {
		range: number;
		template: 'artillery' | 'salvo';
		antiTank: number;
		firePower: DiceRollValue;
		notes: string[];
	}
}
