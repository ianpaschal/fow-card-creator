import { Unit } from '../typing/Unit';
import { getBaseColor } from '../utils/getBaseColor';

export const createDefaultUnit = (): Unit => ({
	nationality: 'US',
	unitType: 'TANK',
	isFormation: false,
	accentColor: getBaseColor(),
	isComponent: false,
	passengers: 0,
	era: 'EW',
	title: '',
	subTitle: '',
	subTitleAboveTitle: false,
	specialRules: [],
	motivation: {
		baseRating: 'CONFIDENT',
		modifiers: [],
	},
	skill: {
		baseRating: 'TRAINED',
		modifiers: [],
	},
	hitOn: {
		baseRating: 'AGGRESSIVE',
		modifiers: [],
	},
	armor: {
		front: 6,
		sideRear: 3,
		top: 1,
	},
	mobility: {
		tactical: 10,
		terrainDash: 12,
		crossCountryDash: 18,
		roadDash: 24,
		cross: 3,
	},
	weapons: [],
	primaryImageURL: null,
	frontIconURL: null,
	sideIconURL: null,
	primaryImageFormat: 'SMALL',
});
