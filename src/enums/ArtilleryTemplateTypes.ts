export enum ArtilleryTemplateTypes {
	BOMBARDMENT = 'Bombardment',
	SALVO = 'Salvo',
}

export type ArtilleryTemplateType = keyof typeof ArtilleryTemplateTypes;
