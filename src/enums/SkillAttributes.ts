export enum SkillAttributes {
	TACTICS = 'Tactics',
	ASSAULT = 'Assault',
}

export type SkillAttribute = keyof typeof SkillAttributes;

export const SkillAttributeKeys = Object.keys(SkillAttributes);
