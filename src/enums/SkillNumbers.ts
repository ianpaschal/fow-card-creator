export enum SkillNumbers {
	VETERAN = 3,
	TRAINED = 4,
	GREEN = 5,
}

export type SkillNumber = keyof typeof SkillNumbers;
