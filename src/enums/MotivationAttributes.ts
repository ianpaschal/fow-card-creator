export enum MotivationAttributes {
	RALLY = 'Rally',
	REMOUNT = 'Remount',
	LAST_STAND = 'Last Stand',
	COUNTERATTACK = 'Counterattack',
}

export type MotivationAttribute = keyof typeof MotivationAttributes;

export const MotivationAttributeKeys = Object.keys(MotivationAttributes);
