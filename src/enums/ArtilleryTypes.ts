export enum ArtilleryTypes {
	BOMBARDMENT = 'Bombardment',
	SALVO = 'Salvo',
}

export type ArtilleryType = keyof typeof ArtilleryTypes;
