export enum Eras {
	EW = 'Early War',
	MW = 'Mid-War',
	LW = 'Late War',
}

export type Era = keyof typeof Eras;
