/* eslint-disable max-lines */
/* eslint-disable max-len */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Nationality } from '../../enums/Nations';
import { UnitType } from '../../enums/UnitTypes';
import { Era } from '../../enums/Eras';
import { filterUnitSpecialRules } from '../../utils/filterUnitSpecialRules';
import { FormValue } from '../../utils/getFormValues';
import { MotivationRating } from '../../enums/MotivationRatings';
import { SkillRating } from '../../enums/SkillRatings';
import { HitOnRating } from '../../enums/HitOnRatings';
import { UnitSpecialRuleName } from '../../enums/UnitSpecialRuleNames';
import { MobilityAttribute } from '../../enums/Mobility';
import { ArmorAttribute } from '../../enums/ArmorAttributes';
import { DiceRollValue } from '../../components/preview/FormattedDiceRoll';

export interface SoftStatModifier {
	attribute: string;
	name: string;
	// TODO: Rename to value
	number: DiceRollValue;
}

export interface ArmorRating {
	front: number;
	sideRear: number;
	top: number;
}

export interface SaveRating {
	type: UnitType;
	value: DiceRollValue;
}

export interface Weapon {
	name: string;
	direct: {
		range: number;
		rof: {
			halted: number;
			moving: number;
		}
		antiTank: number;
		firePower: DiceRollValue;
		notes: string[];
	}
	bombardment?: {
		range: number;
		template: 'artillery' | 'salvo';
		antiTank: number;
		firePower: DiceRollValue;
		notes: string[];
	}
}

export interface EditorState {
	unit: {
		era: Era;
		nationality: Nationality;
		unitType: UnitType;
		title: string;
		subTitle: string;
		specialRules: UnitSpecialRuleName[];
		motivation: {
			baseRating: MotivationRating;
			modifiers: SoftStatModifier[];
		}
		skill: {
			baseRating: SkillRating;
			modifiers: SoftStatModifier[];
		}
		hitOn: {
			baseRating: HitOnRating;
			modifiers: SoftStatModifier[];
		}
		armor?: ArmorRating;
		save?: SaveRating;
		mobility: {
			tactical: number;
			terrainDash: number;
			crossCountryDash: number;
			roadDash: number;
			cross: DiceRollValue;
		}
		weapons: Weapon[];
	};
	availableSpecialRules: FormValue[];
}

export const initialState: EditorState = {
	unit: {
		nationality: undefined,
		unitType: 'TANK',
		era: undefined,
		title: undefined,
		subTitle: undefined,
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
					firePower: 2,
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
					firePower: 2,
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
					firePower: 5,
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
					firePower: 2,
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
					firePower: 2,
					notes: [
						'Forward Firing',
						'Smoke Bombardment',
					],
				},
			},
		],
	},
	availableSpecialRules: filterUnitSpecialRules(undefined, undefined),
};

export const editorSlice = createSlice({
	name: 'editor',
	initialState,
	reducers: {
		setEra: (state: EditorState, action: PayloadAction<Era>): EditorState => ({
			...state,
			unit: {
				...state.unit,
				era: action.payload,
			},
		}),
		setNationality: (state: EditorState, action: PayloadAction<Nationality>): EditorState => ({
			...state,
			unit: {
				...state.unit,
				nationality: action.payload,
			},
			availableSpecialRules: filterUnitSpecialRules(state.unit.unitType, action.payload),
		}),
		setUnitType: (state: EditorState, action: PayloadAction<UnitType>): EditorState => ({
			...state,
			unit: {
				...state.unit,
				unitType: action.payload,
			},
			availableSpecialRules: filterUnitSpecialRules(action.payload, state.unit.nationality),
		}),
		setTitle: (state: EditorState, action: PayloadAction<string>): EditorState => ({
			...state,
			unit: {
				...state.unit,
				title: action.payload,
			},
		}),
		setSubTitle: (state: EditorState, action: PayloadAction<string>): EditorState => ({
			...state,
			unit: {
				...state.unit,
				subTitle: action.payload,
			},
		}),
		setSpecialRules: (
			state: EditorState,
			action: PayloadAction<UnitSpecialRuleName[]>
		): EditorState => ({
			...state,
			unit: {
				...state.unit,
				specialRules: action.payload,
			},
		}),
		setMotivationBaseRating: (
			state: EditorState,
			action: PayloadAction<MotivationRating>
		): EditorState => ({
			...state,
			unit: {
				...state.unit,
				motivation: {
					...state.unit.motivation,
					baseRating: action.payload,
				},
			},
		}),
		setSkillBaseRating: (
			state: EditorState,
			action: PayloadAction<SkillRating>
		): EditorState => ({
			...state,
			unit: {
				...state.unit,
				skill: {
					...state.unit.skill,
					baseRating: action.payload,
				},
			},
		}),
		setHitOnBaseRating: (
			state: EditorState,
			action: PayloadAction<HitOnRating>
		): EditorState => ({
			...state,
			unit: {
				...state.unit,
				hitOn: {
					...state.unit.hitOn,
					baseRating: action.payload,
				},
			},
		}),
		addModifier: (
			state: EditorState,
			action: PayloadAction<{modifierType: string, modifier: SoftStatModifier}>
		): EditorState => ({
			...state,
			unit: {
				...state.unit,
				[ action.payload.modifierType ]: {
					...state.unit[ action.payload.modifierType ],
					modifiers: [
						...state.unit[ action.payload.modifierType ].modifiers,
						action.payload.modifier,
					],
				},
			},
		}),
		updateModifier: (
			state: EditorState,
			action: PayloadAction<{modifierType: string, index: number, modifier: SoftStatModifier}>
		): EditorState => ({
			...state,
			unit: {
				...state.unit,
				[ action.payload.modifierType ]: {
					...state.unit[ action.payload.modifierType ],
					modifiers: [
						...state.unit[ action.payload.modifierType ].modifiers.slice(0, action.payload.index),
						{
							...state.unit[ action.payload.modifierType ].modifiers[ action.payload.index ],
							...action.payload.modifier,
						},
						...state.unit[ action.payload.modifierType ].modifiers.slice(action.payload.index + 1),
					],
				},
			},
		}),
		removeModifier: (
			state: EditorState,
			action: PayloadAction<{modifierType: string, index: number}>
		): EditorState => ({
			...state,
			unit: {
				...state.unit,
				[ action.payload.modifierType ]: {
					...state.unit[ action.payload.modifierType ],
					modifiers: [
						...state.unit[ action.payload.modifierType ].modifiers.slice(0, action.payload.index),
						...state.unit[ action.payload.modifierType ].modifiers.slice(action.payload.index + 1),
					],
				},
			},
		}),
		setMobility: (
			state: EditorState,
			action: PayloadAction<{attribute: MobilityAttribute, value: number}>
		): EditorState => ({
			...state,
			unit: {
				...state.unit,
				mobility: {
					...state.unit.mobility,
					[ action.payload.attribute ]: action.payload.value,
				},
			},
		}),
		setArmorRating: (
			state: EditorState,
			action: PayloadAction<ArmorRating>
		): EditorState => {
			const { save, ...unitWithoutSave } = state.unit;
			return {
				...state,
				unit: {
					...unitWithoutSave,
					armor: action.payload,
				},
			};
		},
		setArmorAttribute: (
			state: EditorState,
			action: PayloadAction<{attribute: ArmorAttribute, value: number}>
		): EditorState => ({
			...state,
			unit: {
				...state.unit,
				armor: {
					...state.unit.armor,
					[ action.payload.attribute ]: action.payload.value,
				},
			},
		}),
		setSaveRating: (
			state: EditorState,
			action: PayloadAction<SaveRating>
		): EditorState => {
			const { armor, ...unitWithoutArmor } = state.unit;
			return {
				...state,
				unit: {
					...unitWithoutArmor,
					save: action.payload,
				},
			};
		},
		addWeapon: (
			state: EditorState,
			action: PayloadAction<{weapon: Weapon}>
		): EditorState => ({
			...state,
			unit: {
				...state.unit,
				weapons: [
					...state.unit.weapons,
					action.payload.weapon,
				],
			},
		}),
		updateWeapon: (
			state: EditorState,
			action: PayloadAction<{index: number, weapon: Weapon}>
		): EditorState => ({
			...state,
			unit: {
				...state.unit,
				weapons: [
					...state.unit.weapons.slice(0, action.payload.index),
					action.payload.weapon,
					...state.unit.weapons.slice(action.payload.index + 1),
				],
			},
		}),
		removeWeapon: (
			state: EditorState,
			action: PayloadAction<{index: number}>
		): EditorState => ({
			...state,
			unit: {
				...state.unit,
				weapons: [
					...state.unit.weapons.slice(0, action.payload.index),
					...state.unit.weapons.slice(action.payload.index + 1),
				],
			},
		}),
	},
});

export const { actions, reducer } = editorSlice;
