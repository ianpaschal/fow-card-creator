export enum MotivationNumbers {
	FEARLESS = 3,
	CONFIDENT = 4,
	RELUCTANT = 5,
}

export type MotivationNumber = keyof typeof MotivationNumbers;
