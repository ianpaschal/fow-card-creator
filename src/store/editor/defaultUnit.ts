import { HitOnRating } from '../../enums/HitOnRatings';
import { MotivationRating } from '../../enums/MotivationRatings';
import { SkillRating } from '../../enums/SkillRatings';
import { UnitType } from '../../enums/UnitTypes';
import { DiceRollValue } from '../../typing/DiceRollValue';
import { Unit } from '../../typing/Unit';

export const defaultUnit: Unit = {
	nationality: undefined,
	unitType: 'TANK' as UnitType,
	era: undefined,
	title: undefined,
	subTitle: undefined,
	specialRules: [],
	motivation: {
		baseRating: 'CONFIDENT' as MotivationRating,
		modifiers: [],
	},
	skill: {
		baseRating: 'TRAINED' as SkillRating,
		modifiers: [],
	},
	hitOn: {
		baseRating: 'AGGRESSIVE' as HitOnRating,
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
		cross: 3 as DiceRollValue,
	},
	weapons: [
		{
			name: '105mm howitzer',
			direct: {
				range: 24,
				rof: {
					halted: 1,
					moving: 1,
				},
				antiTank: 9,
				firePower: 2 as DiceRollValue,
				notes: [
					'Brutal',
					'Forward Firing',
					'Slow Fiiring',
					'Smoke',
				],
			},
			bombardment: {
				range: 72,
				template: 'artillery',
				antiTank: 3,
				firePower: 2 as DiceRollValue,
				notes: [
					'Forward Firing',
					'Smoke Bombardment',
				],
			},
		},
		{
			name: 'M3A1 (.50 cal MG)',
			direct: {
				range: 24,
				rof: {
					halted: 3,
					moving: 2,
				},
				antiTank: 4,
				firePower: 5 as DiceRollValue,
				notes: [],
			},
		},
		{
			name: '105mm howitzer',
			direct: {
				range: 24,
				rof: {
					halted: 1,
					moving: 1,
				},
				antiTank: 9,
				firePower: 2 as DiceRollValue,
				notes: [
					'Brutal',
					'Forward Firing',
					'Slow Fiiring',
					'Smoke',
				],
			},
			bombardment: {
				range: 72,
				template: 'artillery',
				antiTank: 3,
				firePower: 2 as DiceRollValue,
				notes: [
					'Forward Firing',
					'Smoke Bombardment',
				],
			},
		},
	],
};
