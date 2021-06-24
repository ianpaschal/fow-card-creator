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
import { SoftStatModifier } from '../../typing/SoftStatModifier';
import { ArmorRating } from '../../typing/ArmorRating';
import { SaveRating } from '../../typing/SaveRating';
import { Weapon } from '../../typing/Weapon';
import { getBaseColor } from '../../utils/getBaseColor';
import { UnitCard } from '../../typing/UnitCard';
import { ImageFormat } from '../../enums/ImageFormats';
import { computeCardLayout } from '../../utils/computeCardLayout';
import { defaultUnitCard } from './defaultUnitCard';

export interface EditorState {
	unitCard: UnitCard | null;
	availableSpecialRules: FormValue[];
}

export const initialState: EditorState = {
	unitCard: defaultUnitCard,
	availableSpecialRules: filterUnitSpecialRules(undefined),
};

export const editorSlice = createSlice({
	name: 'editor',
	initialState,
	reducers: {
		// Meta
		setUnitCard: (state: EditorState, action: PayloadAction<UnitCard>): EditorState => ({
			...state,
			unitCard: {
				...action.payload,
				layout: action.payload.layout || computeCardLayout(action.payload.unit),
			},
			availableSpecialRules: filterUnitSpecialRules(action.payload.unit),
		}),
		setIsPublic: (state: EditorState, action: PayloadAction<boolean>): EditorState => ({
			...state,
			unitCard: {
				...state.unitCard,
				isPublic: action.payload,
			},
		}),

		// General
		setEra: (state: EditorState, action: PayloadAction<Era>): EditorState => ({
			...state,
			unitCard: {
				...state.unitCard,
				unit: {
					...state.unitCard.unit,
					era: action.payload,
					accentColor: getBaseColor(state.unitCard.unit.nationality, action.payload),
					primaryImageFormat: action.payload === 'LW' ? 'LARGE' : 'SMALL',
				},
			},
		}),
		setNationality: (state: EditorState, action: PayloadAction<Nationality>): EditorState => {
			const availableSpecialRules = filterUnitSpecialRules({ ...state.unitCard.unit, nationality: action.payload });
			return {
				...state,
				unitCard: {
					...state.unitCard,
					unit: {
						...state.unitCard.unit,
						nationality: action.payload,
						accentColor: getBaseColor(action.payload, state.unitCard.unit.era),
						specialRules: state.unitCard.unit.specialRules.filter((existingRule) => {
							availableSpecialRules.find((availableRule) => availableRule.value === existingRule);
						}),
					},
				},
				availableSpecialRules,
			};
		},
		setPrimaryImageURL: (state: EditorState, action: PayloadAction<string>): EditorState => ({
			...state,
			unitCard: {
				...state.unitCard,
				unit: {
					...state.unitCard.unit,
					primaryImageURL: action.payload,
				},
			},
		}),
		setPrimaryImageFormat: (state: EditorState, action: PayloadAction<ImageFormat>): EditorState => ({
			...state,
			unitCard: {
				...state.unitCard,
				unit: {
					...state.unitCard.unit,
					primaryImageFormat: action.payload,
				},
			},
		}),
		setUnitType: (state: EditorState, action: PayloadAction<UnitType>): EditorState => {
			const availableSpecialRules = filterUnitSpecialRules({ ...state.unitCard.unit, unitType: action.payload });
			return {
				...state,
				unitCard: {
					...state.unitCard,
					unit: {
						...state.unitCard.unit,
						unitType: action.payload,
						specialRules: state.unitCard.unit.specialRules.filter((existingRule) => {
							availableSpecialRules.find((availableRule) => availableRule.value === existingRule);
						}),
						passengers: ['TANK', 'UNARMOURED_TANK'].includes(action.payload) ? state.unitCard.unit.passengers : 0,
					},
				},
				availableSpecialRules,
			};
		},
		setTitle: (state: EditorState, action: PayloadAction<string>): EditorState => ({
			...state,
			unitCard: {
				...state.unitCard,
				unit: {
					...state.unitCard.unit,
					title: action.payload,
				},
			},
		}),
		setSubTitle: (state: EditorState, action: PayloadAction<string>): EditorState => ({
			...state,
			unitCard: {
				...state.unitCard,
				unit: {
					...state.unitCard.unit,
					subTitle: action.payload,
				},
			},
		}),
		setSubTitleAboveTitle: (state: EditorState, action: PayloadAction<boolean>): EditorState => ({
			...state,
			unitCard: {
				...state.unitCard,
				unit: {
					...state.unitCard.unit,
					subTitleAboveTitle: action.payload,
				},
			},
		}),
		setIsFormation: (
			state: EditorState,
			action: PayloadAction<{isFormation: boolean}>
		): EditorState => ({
			...state,
			unitCard: {
				...state.unitCard,
				unit: {
					...state.unitCard.unit,
					isFormation: action.payload.isFormation,
				},
			},
		}),
		setIsComponent: (
			state: EditorState,
			action: PayloadAction<{isComponent: boolean}>
		): EditorState => ({
			...state,
			unitCard: {
				...state.unitCard,
				unit: {
					...state.unitCard.unit,
					isComponent: action.payload.isComponent,
				},
			},
		}),
		setPassengers: (
			state: EditorState,
			action: PayloadAction<{passengers: number}>
		): EditorState => {
			const availableSpecialRules = filterUnitSpecialRules({ ...state.unitCard.unit, passengers: action.payload.passengers });
			return {
				...state,
				unitCard: {
					...state.unitCard,
					unit: {
						...state.unitCard.unit,
						passengers: action.payload.passengers,
						specialRules: state.unitCard.unit.specialRules.filter((existingRule) => {
							availableSpecialRules.find((availableRule) => availableRule.value === existingRule);
						}),
					},
				},
				availableSpecialRules,
			};
		},
		setSpecialRules: (
			state: EditorState,
			action: PayloadAction<UnitSpecialRuleName[]>
		): EditorState => ({
			...state,
			unitCard: {
				...state.unitCard,
				unit: {
					...state.unitCard.unit,
					specialRules: action.payload,
				},
			},
		}),
		setMotivationBaseRating: (
			state: EditorState,
			action: PayloadAction<MotivationRating>
		): EditorState => ({
			...state,
			unitCard: {
				...state.unitCard,
				unit: {
					...state.unitCard.unit,
					motivation: {
						...state.unitCard.unit.motivation,
						baseRating: action.payload,
					},
				},
			},
		}),
		setSkillBaseRating: (
			state: EditorState,
			action: PayloadAction<SkillRating>
		): EditorState => ({
			...state,
			unitCard: {
				...state.unitCard,
				unit: {
					...state.unitCard.unit,
					skill: {
						...state.unitCard.unit.skill,
						baseRating: action.payload,
					},
				},
			},
		}),
		setHitOnBaseRating: (
			state: EditorState,
			action: PayloadAction<HitOnRating>
		): EditorState => ({
			...state,
			unitCard: {
				...state.unitCard,
				unit: {
					...state.unitCard.unit,
					hitOn: {
						...state.unitCard.unit.hitOn,
						baseRating: action.payload,
					},
				},
			},
		}),
		addModifier: (
			state: EditorState,
			action: PayloadAction<{modifierType: string, modifier: SoftStatModifier}>
		): EditorState => {
			const updatedUnit = {
				...state.unitCard.unit,
				[ action.payload.modifierType ]: {
					...state.unitCard.unit[ action.payload.modifierType ],
					modifiers: [...state.unitCard.unit[ action.payload.modifierType ].modifiers, action.payload.modifier],
				},
			};
			return {
				...state,
				unitCard: {
					...state.unitCard,
					unit: updatedUnit,
					layout: computeCardLayout(updatedUnit),
				},
			};
		},
		updateModifier: (
			state: EditorState,
			action: PayloadAction<{modifierType: string, index: number, modifier: SoftStatModifier}>
		): EditorState => ({
			...state,
			unitCard: {
				...state.unitCard,
				unit: {
					...state.unitCard.unit,
					[ action.payload.modifierType ]: {
						...state.unitCard.unit[ action.payload.modifierType ],
						modifiers: [
							...state.unitCard.unit[ action.payload.modifierType ].modifiers.slice(0, action.payload.index),
							{
								...state.unitCard.unit[ action.payload.modifierType ].modifiers[ action.payload.index ],
								...action.payload.modifier,
							},
							...state.unitCard.unit[ action.payload.modifierType ].modifiers.slice(action.payload.index + 1),
						],
					},
				},
			},
		}),
		removeModifier: (
			state: EditorState,
			action: PayloadAction<{modifierType: string, index: number}>
		): EditorState => {
			const updatedUnit = {
				...state.unitCard.unit,
				[ action.payload.modifierType ]: {
					...state.unitCard.unit[ action.payload.modifierType ],
					modifiers: [...state.unitCard.unit[ action.payload.modifierType ].modifiers.slice(0, action.payload.index), ...state.unitCard.unit[ action.payload.modifierType ].modifiers.slice(action.payload.index + 1)],
				},
			};
			return {
				...state,
				unitCard: {
					...state.unitCard,
					unit: updatedUnit,
					layout: computeCardLayout(updatedUnit),
				},
			};
		},
		setMobility: (
			state: EditorState,
			action: PayloadAction<{attribute: MobilityAttribute, value: number}>
		): EditorState => ({
			...state,
			unitCard: {
				...state.unitCard,
				unit: {
					...state.unitCard.unit,
					mobility: {
						...state.unitCard.unit.mobility,
						[ action.payload.attribute ]: action.payload.value,
					},
				},
			},
		}),
		setArmorRating: (
			state: EditorState,
			action: PayloadAction<ArmorRating>
		): EditorState => {
			const { ...unitWithoutSave } = state.unitCard.unit;
			return {
				...state,
				unitCard: {
					...state.unitCard,
					unit: {
						...unitWithoutSave,
						armor: action.payload,
					},
				},
			};
		},
		setArmorAttribute: (
			state: EditorState,
			action: PayloadAction<{attribute: ArmorAttribute, value: number}>
		): EditorState => ({
			...state,
			unitCard: {
				...state.unitCard,
				unit: {
					...state.unitCard.unit,
					armor: {
						...state.unitCard.unit.armor,
						[ action.payload.attribute ]: action.payload.value,
					},
					save: null,
				},
			},
		}),
		setSaveRating: (
			state: EditorState,
			action: PayloadAction<SaveRating>
		): EditorState => {
			const { ...unitWithoutArmor } = state.unitCard.unit;
			return {
				...state,
				unitCard: {
					...state.unitCard,
					unit: {
						...unitWithoutArmor,
						save: action.payload,
						armor: null,
					},
				},
			};
		},
		addWeapon: (
			state: EditorState,
			action: PayloadAction<{weapon: Weapon}>
		): EditorState => ({
			...state,
			unitCard: {
				...state.unitCard,
				unit: {
					...state.unitCard.unit,
					weapons: [...state.unitCard.unit.weapons, action.payload.weapon],
				},
			},
		}),
		addWeaponBombardment: (
			state: EditorState,
			action: PayloadAction<{index: number, bombardment: any}>
		): EditorState => ({
			...state,
			unitCard: {
				...state.unitCard,
				unit: {
					...state.unitCard.unit,
					weapons: [
						...state.unitCard.unit.weapons.slice(0, action.payload.index),
						{
							...state.unitCard.unit.weapons[ action.payload.index ],
							bombardment: action.payload.bombardment,
						},
						...state.unitCard.unit.weapons.slice(action.payload.index + 1),
					],
				},
			},
		}),
		updateWeapon: (
			state: EditorState,
			action: PayloadAction<{index: number, mode: 'direct' | 'bombardment', attribute: string, value: any}>
		): EditorState => ({
			...state,
			unitCard: {
				...state.unitCard,
				unit: {
					...state.unitCard.unit,
					weapons: [
						...state.unitCard.unit.weapons.slice(0, action.payload.index),
						{
							...state.unitCard.unit.weapons[ action.payload.index ],
							[ action.payload.mode ]: {
								...state.unitCard.unit.weapons[ action.payload.index ][ action.payload.mode ],
								[ action.payload.attribute ]: action.payload.value,
							},
						},
						...state.unitCard.unit.weapons.slice(action.payload.index + 1),
					],
				},
			},
		}),
		updateWeaponName: (
			state: EditorState,
			action: PayloadAction<{index: number, name: string}>
		): EditorState => ({
			...state,
			unitCard: {
				...state.unitCard,
				unit: {
					...state.unitCard.unit,
					weapons: [
						...state.unitCard.unit.weapons.slice(0, action.payload.index),
						{
							...state.unitCard.unit.weapons[ action.payload.index ],
							name: action.payload.name,
						},
						...state.unitCard.unit.weapons.slice(action.payload.index + 1),
					],
				},
			},
		}),
		removeWeapon: (
			state: EditorState,
			action: PayloadAction<{index: number}>
		): EditorState => ({
			...state,
			unitCard: {
				...state.unitCard,
				unit: {
					...state.unitCard.unit,
					weapons: [...state.unitCard.unit.weapons.slice(0, action.payload.index), ...state.unitCard.unit.weapons.slice(action.payload.index + 1)],
				},
			},
		}),
		removeWeaponBombardment: (
			state: EditorState,
			action: PayloadAction<{index: number}>
		): EditorState => ({
			...state,
			unitCard: {
				...state.unitCard,
				unit: {
					...state.unitCard.unit,
					weapons: [
						...state.unitCard.unit.weapons.slice(0, action.payload.index),
						{
							...state.unitCard.unit.weapons[ action.payload.index ],
							bombardment: undefined,
						},
						...state.unitCard.unit.weapons.slice(action.payload.index + 1),
					],
				},
			},
		}),
	},
});

export const { actions, reducer } = editorSlice;
