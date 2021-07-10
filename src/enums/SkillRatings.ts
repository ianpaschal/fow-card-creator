export enum SkillRatings {
	VETERAN = 'Veteran',
	TRAINED = 'Trained',
	GREEN = 'Green'
}

export type SkillRating = keyof typeof SkillRatings;

export const SkillKeys = Object.keys(SkillRatings);
