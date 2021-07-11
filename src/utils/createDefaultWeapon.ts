import { ArtilleryTemplateType } from '../enums/ArtilleryTemplateTypes';
import { DiceRollValue } from '../typing/DiceRollValue';
import { Weapon } from '../typing/Weapon';

export const createDefaultBombardment = () => ({
	range: 72,
	template: 'ARTILLERY' as ArtilleryTemplateType,
	antiTank: 3,
	firePower: 2 as DiceRollValue,
	notes: ['Forward Firing', 'Smoke Bombardment'],
});

export const createDefaultDirectFire = () => ({
	range: 16,
	rof: {
		halted: 1,
		moving: 1,
	},
	antiTank: 1,
	firePower: 6 as DiceRollValue,
	notes: [],
});

export const createDefaultWeapon = (): Weapon => ({
	name: '',
	direct: createDefaultDirectFire(),
	bombardment: null,
	secondary: null,
	optional: false,
});
