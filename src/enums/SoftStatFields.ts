export enum SoftStatFields {
	motivation = 'Motivation',
	skill = 'Skill',
	hitOn = 'Is Hit On',
}

export type SoftStatField = keyof typeof SoftStatFields;

export const SoftStatFieldKeys = Object.keys(SoftStatFields);
