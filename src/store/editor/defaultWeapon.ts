import { DiceRollValue } from '../../typing/DiceRollValue';

export const defaultWeapon = {
	name: '',
	direct: {
		range: 16,
		rof: {
			halted: 1,
			moving: 1,
		},
		antiTank: 1,
		firePower: 6 as DiceRollValue,
		notes: [],
	},
};

export const defaultBombardment = {
	range: 72,
	template: 'artillery',
	antiTank: 3,
	firePower: 2 as DiceRollValue,
	notes: ['Forward Firing', 'Smoke Bombardment'],
};
