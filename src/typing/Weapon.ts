import { DiceRollValue } from './DiceRollValue';

export type WeaponFiringMode = 'direct' | 'secondary' | 'bombardment';

export interface WeaponDirectFire {
	range: number;
	rof: {
		halted: number;
		moving: number;
	}
	antiTank: number;
	firePower: DiceRollValue;
	notes: string[];
}

export interface WeaponSecondaryFire extends WeaponDirectFire {
	name: string;
}

export interface WeaponBombardment {
	range: number;
	template: 'artillery' | 'salvo';
	antiTank: number;
	firePower: DiceRollValue;
	notes: string[];
}

export type WeaponFiringData = WeaponDirectFire | WeaponSecondaryFire | WeaponBombardment;

export interface Weapon {
	name: string;
	direct: WeaponDirectFire | null;
	secondary: WeaponSecondaryFire | null;
	bombardment: WeaponBombardment | null;
	optional: boolean;
}
