import { Era } from '../enums/Eras';
import { Nationality } from '../enums/Nations';

const COLORS = {
	// British
	BR: {
		EW: {
			africa: 'rgb(85, 0, 21)', // Hellfire and Back! (v3)
			france: 'rgb(106,97,76)', // Blitzkrieg! (v3)
		},
		LW: 'rgb(83, 29, 45)', // Fortress Europe, D-Day
		MW: 'rgb(0, 62, 109)', // Armored Fist & Desert Rats
	},

	// Finns
	FI: {
		EW: 'rgb(74,118,149)', // Rising Sun, Barbarossa (v3)
		MW: 'rgb(74,118,149)', // Eastern Front (v3)
	},

	// French
	FR: {
		EW: 'rgb(54,67,54)', // Burning Empires (v3), Blitzkrieg! (v3)
		MW: 'rgb(54,67,54)', // Burning Empires (v3)
		LW: {
			italy: 'rgb(0,40,64)', // Road to Rome (v3)
			france: 'rgb(20,50,90)', // Overlord (v3)
		},
	},

	// Germans
	GE: {
		LW: 'rgb(63, 71, 60)', // Fortress Europe, D-Day & Waffen SS
		MW: {
			africa: 'rgb(100, 81, 60)', // Afrika Korps
			east: 'rgb(65, 64, 66)', // Iron Cross & Ghost Panzers
		},
	},

	// Italians
	IT: {
		MW: 'rgb(7, 84, 43)', // Avanti
	},

	// Soviets
	SU: {
		LW: 'rgb(95, 76, 48)', // Fortress Europe & Bagration
		MW: 'rgb(122, 7, 8)', // Red Banner & Enemy at the Gates
	},

	// Americans
	US: {
		LW: 'rgb(1, 40, 70)', // Fortress Europe & D-Day
		MW: 'rgb(70, 64, 42)', // Fighting First
	},

	// Japanese
	JP: {
		EW: 'rgb(151,153,156)', // Rising Sun (v3)
		MW: 'rgb(189,0,0)', // Banzai (v3)
		LW: 'rgb(189,0,0)', // Banzai (v3)
	},

	NL: {
		EW: 'rgb(222, 118, 28)', // Team Yankee Free Nations
	},
};

export function getBaseColor(nationality?: Nationality, era?: Era, modifier?: string) {
	const defaultColor = 'rgb(36, 41, 46)';
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
