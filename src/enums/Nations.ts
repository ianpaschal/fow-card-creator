export enum Nations {
	BR = 'Britain',
	FI = 'Finland',
	FR = 'France',
	GE = 'Germany',
	HU = 'Hungary',
	JP = 'Japan',
	PL = 'Poland',
	RO = 'Romania',
	SU = 'Soviet Union',
	US = 'United States',
}

export type Nationality = keyof typeof Nations;
