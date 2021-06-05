export enum HitOnRatings {
	RECKLESS = 'Reckless',
	AGGRESSIVE = 'Aggressive',
	CAREFUL = 'Careful',
}

export type HitOnRating = keyof typeof HitOnRatings;

export enum HitOnNumbers {
	RECKLESS = 2,
	AGGRESSIVE = 3,
	CAREFUL = 4,
}

export type HitOnNumber = keyof typeof HitOnNumbers;

export const HitOnKeys = Object.keys(HitOnRatings);
