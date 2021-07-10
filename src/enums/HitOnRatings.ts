export enum HitOnRatings {
	RECKLESS = 'Reckless',
	AGGRESSIVE = 'Aggressive',
	CAREFUL = 'Careful',
}

export type HitOnRating = keyof typeof HitOnRatings;

export const HitOnKeys = Object.keys(HitOnRatings);
