export enum UnitTypes {
	// TANK_FORMATION = 'Tank Formation',
	TANK_UNIT = 'Tank Unit',
	UNARMOURED_TANK = 'Unarmoured Tank',
	GUN_UNIT = 'Gun Unit',
	// INFANTRY_FORMATION = 'Intantry Formation',
	INFANTRY_UNIT = 'Infantry Unit',
	AIRCRAFT_UNIT = 'Aircraft Unit',
}

export type UnitType = keyof typeof UnitTypes;
