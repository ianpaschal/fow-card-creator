export enum HitOnNumbers {
	RECKLESS = 2,
	AGGRESSIVE = 3,
	CAREFUL = 4,
}

export type HitOnNumber = keyof typeof HitOnNumbers;
