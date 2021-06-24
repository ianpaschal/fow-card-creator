import { Era } from '../enums/Eras';
import { Nationality } from '../enums/Nations';

const COLORS = {
	// British
	BR: {
		EW: {
			africa: '#550015', // Hellfire and Back! (v3)
			france: '#6a614c', // Blitzkrieg! (v3)
		},
		LW: '#531d2d', // Fortress Europe, D-Day (v4 Forces Website)
		MW: '#003e6d', // Armored Fist & Desert Rats (v4 Forces Website)
	},

	// Finns
	FI: {
		EW: '#4a7695', // Rising Sun, Barbarossa (v3)
		MW: '#004678', // Bagration: Axis-Allies (v4 Forces Website)
		LW: '#004678', // Bagration: Axis-Allies (v4 Forces Website)
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
		LW: '#3f473c', // Fortress Europe, D-Day & Waffen SS (v4 Forces Website)
		MW: {
			africa: '#64513c', // Afrika Korps (v4 Forces Website)
			east: '#414042', // Iron Cross & Ghost Panzers (v4 Forces Website)
		},
	},

	// Hungarians
	HU: {
		LW: '#27441a', // Bagration (v4 Forces Website)
	},

	// Italians
	IT: {
		MW: '#07542b', // Avanti (v4 Forces Website)
	},

	// Romanians
	RO: {
		LW: '#79242f', // Bagration (v4 Forces Website)
	},

	// Soviets
	SU: {
		LW: '#5f4c30', // Fortress Europe & Bagration (v4 Forces Website)
		MW: '#7a0708', // Red Banner & Enemy at the Gates (v4 Forces Website)
	},

	// Americans
	US: {
		LW: '#012846', // Fortress Europe & D-Day (v4 Forces Website)
		MW: '#46402a', // Fighting First (v4 Forces Website)
	},

	// Japanese
	JP: {
		EW: '#97999c', // Rising Sun (v3)
		MW: '#bd0000', // Banzai (v3)
		LW: '#bd0000', // Banzai (v3)
	},

	NL: {
		EW: '#527277', // Custom, based on uniform color
		MW: '#527277', // Custom, based on uniform color
		LW: '#527277', // Custom, based on uniform color
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
