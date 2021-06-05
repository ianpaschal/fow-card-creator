import { Era } from '../enums/Eras';
import { Nationality } from '../enums/Nations';

const COLORS = {
	// British
	BR: {
		EW: {
			africa: '#550015', // Hellfire and Back! (v3)
			france: '#6a614c', // Blitzkrieg! (v3)
		},
		LW: '#531d2d', // Fortress Europe, D-Day
		MW: '#003e6d', // Armored Fist & Desert Rats
	},

	// Finns
	FI: {
		EW: '#4a7695', // Rising Sun, Barbarossa (v3)
		MW: '#4a7695', // Eastern Front (v3)
		LW: '#00467a', // Bagration: Axis-Allies (v4) (tentative)
	},

	// French
	FR: {
		EW: '#364336', // Burning Empires (v3), Blitzkrieg! (v3)
		MW: '#364336', // Burning Empires (v3)
		LW: {
			italy: '#002840', // Road to Rome (v3)
			france: '#14325a', // Overlord (v3)
		},
	},

	// Germans
	GE: {
		LW: '#3f473c', // Fortress Europe, D-Day & Waffen SS
		MW: {
			africa: '#64513c', // Afrika Korps
			east: '#414042', // Iron Cross & Ghost Panzers
		},
	},

	// Italians
	IT: {
		MW: '#07542b', // Avanti
	},

	// Soviets
	SU: {
		LW: '#5f4c30', // Fortress Europe & Bagration
		MW: '#7a0708', // Red Banner & Enemy at the Gates
	},

	// Americans
	US: {
		LW: '#012846', // Fortress Europe & D-Day
		MW: '#46402a', // Fighting First
	},

	// Japanese
	JP: {
		EW: '#97999c', // Rising Sun (v3)
		MW: '#bd0000', // Banzai (v3)
		LW: '#bd0000', // Banzai (v3)
	},

	NL: {
		EW: '#de761c', // Team Yankee Free Nations
	},
};

export function getBaseColor(nationality?: Nationality | '', era?: Era | '', modifier?: string) {
	const defaultColor = '#24292e';
	if (!COLORS[ nationality ]) {
		console.warn(`Nationality '${nationality}' not found; using default.`);
		return defaultColor;
	}
	if (!COLORS[ nationality ][ era ]) {
		console.warn(`Era '${era}' not found for nationality '${nationality}'.`);
		return typeof COLORS[ nationality ] === 'string' ? COLORS[ nationality ] : defaultColor;
	}
	if (!modifier) {
		if (typeof COLORS[ nationality ][ era ] === 'string') {
			return COLORS[ nationality ][ era ];
		}
		return COLORS[ nationality ][ era ][ Object.keys(COLORS[ nationality ][ era ])[ 0 ] ];
	}
	if (!COLORS[ nationality ][ era ][ modifier ]) {
		console.warn(`Modifier '${modifier}' not found for '${nationality}-${era}'.`);
		return defaultColor;
	}
	return COLORS[ nationality ][ modifier ];

}
