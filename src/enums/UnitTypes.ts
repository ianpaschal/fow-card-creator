export enum UnitTypes {
	// TANK_FORMATION = 'Tank Formation',
	TANK = 'Tank',
	UNARMOURED_TANK = 'Unarmoured Tank',
	GUN = 'Gun',
	// INFANTRY_FORMATION = 'Intantry Formation',
	INFANTRY = 'Infantry',
	AIRCRAFT = 'Aircraft',
}

export type UnitType = keyof typeof UnitTypes;
