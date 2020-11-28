export enum ArmorAttributes {
	front = 'Front',
	sideRear = 'Side & Rear',
	top = 'Top',
}

export type ArmorAttribute = keyof typeof ArmorAttributes;

export const ArmorAttributeKeys = Object.keys(ArmorAttributes);
