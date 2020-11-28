export enum SkillRatings {
	VETERAN = 'Veteran',
	TRAINED = 'Trained',
	GREEN = 'Green'
}

export type SkillRating = keyof typeof SkillRatings;

export enum SkillNumbers {
	VETERAN = 3,
	TRAINED = 4,
	GREEN = 5,
}

export type SkillNumber = keyof typeof SkillNumbers;

export enum SkillAttributes {
	TACTICS = 'Tactics',
	ASSAULT = 'Assault',
	WHEELED_SCOUT = 'Wheeled Scout',
}

export type SkillAttribute = keyof typeof SkillAttributes;
