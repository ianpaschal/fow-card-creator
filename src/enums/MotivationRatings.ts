export enum MotivationRatings {
	FEARLESS = 'Fearless',
	CONFIDENT = 'Confident',
	RELUCTANT = 'Reluctant',
}

export type MotivationRating = keyof typeof MotivationRatings;

export enum MotivationNumbers {
	FEARLESS = 3,
	CONFIDENT = 4,
	RELUCTANT = 5,
}

export type MotivationNumber = keyof typeof MotivationNumbers;

export enum MotivationAttributes {
	RALLY = 'Rally',
	REMOUNT = 'Remount',
	LAST_STAND = 'Last Stand',
	COUNERATTACK = 'Counterattack',
}

export type MotivationAttribute = keyof typeof MotivationAttributes;
