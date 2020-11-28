export enum WeaponAttributes {
	NAME = 'Weapon',
	RANGE = 'Range',
	ROF = 'ROF',
	ROF_HALTED = 'Halted',
	ROF_MOVING = 'Moving',
	ANTI_TANK = 'Anti-Tank',
	FIRE_POWER = 'Fire-Power',
	NOTES = 'Notes',
}

export type WeaponAttribute = keyof typeof WeaponAttributes;
