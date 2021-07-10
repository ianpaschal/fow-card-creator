export enum MobilityFields {
	tactical = 'Tactical',
	terrainDash = 'Terrain Dash',
	crossCountryDash = 'Cross Country Dash',
	roadDash = 'Road Dash',
	cross = 'Cross',
}

export type MobilityField = keyof typeof MobilityFields;

export const MobilityFieldKeys = Object.keys(MobilityFields);
