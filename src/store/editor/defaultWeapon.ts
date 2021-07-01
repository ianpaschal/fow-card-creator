import { DiceRollValue } from '../../typing/DiceRollValue';
import { Weapon } from '../../typing/Weapon';

export const defaultBombardment = {
	range: 72,
	template: 'artillery' as 'artillery' | 'salvo',
	antiTank: 3,
	firePower: 2 as DiceRollValue,
	notes: ['Forward Firing', 'Smoke Bombardment'],
};

export const defaultDirectFire = {
	range: 16,
	rof: {
		halted: 1,
		moving: 1,
	},
	antiTank: 1,
	firePower: 6 as DiceRollValue,
	notes: [],
};

export const defaultWeapon: Weapon = {
	name: '',
	direct: defaultDirectFire,
	bombardment: null,
	secondary: null,
	optional: false,
};
