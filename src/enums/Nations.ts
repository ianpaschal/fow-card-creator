export enum Nations {
	BE = 'Belgium',
	BR = 'Britain',
	CN = 'Republic of China',
	FI = 'Finland',
	FR = 'France',
	GE = 'Germany',
	HU = 'Hungary',
	IT = 'Italy',
	JP = 'Japan',
	NL = 'Netherlands',
	NO = 'Norway',
	PL = 'Poland',
	RO = 'Romania',
	SU = 'Soviet Union',
	US = 'United States',
}

export type Nationality = keyof typeof Nations;
