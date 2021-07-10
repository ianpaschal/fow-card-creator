export enum ArmorFields {
	front = 'Front',
	sideRear = 'Side & Rear',
	top = 'Top',
}

export type ArmorField = keyof typeof ArmorFields;

export const ArmorFieldKeys = Object.keys(ArmorFields);
