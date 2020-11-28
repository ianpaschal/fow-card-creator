export enum MobilityAttributes {
	tactical = 'Tactical',
	terrainDash = 'Terrain Dash',
	crossCountryDash = 'Cross Country Dash',
	roadDash = 'Road Dash',
	cross = 'Cross',
}

export type MobilityAttribute = keyof typeof MobilityAttributes;

export const MobilityAttributeKeys = Object.keys(MobilityAttributes);
