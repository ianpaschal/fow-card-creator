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
import { defaultUnit } from './defaultUnit';
import { Unit } from '../../typing/Unit';
import { SoftStatModifier } from '../../typing/SoftStatModifier';
import { ArmorRating } from '../../typing/ArmorRating';
import { SaveRating } from '../../typing/SaveRating';
import { Weapon } from '../../typing/Weapon';

export interface EditorState {
	unit: Unit;
	availableSpecialRules: FormValue[];
}

export const initialState: EditorState = {
	unit: defaultUnit,
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
