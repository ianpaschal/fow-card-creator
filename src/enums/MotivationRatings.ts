export enum MotivationRatings {
	FEARLESS = 'Fearless',
	CONFIDENT = 'Confident',
	RELUCTANT = 'Reluctant',
}

export type MotivationRating = keyof typeof MotivationRatings;

export const MotivationKeys = Object.keys(MotivationRatings);
