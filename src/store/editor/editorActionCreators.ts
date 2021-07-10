/* eslint-disable max-len */
import { Dispatch } from '@reduxjs/toolkit';
import { Era } from '../../enums/Eras';
import { ImageFormat } from '../../enums/ImageFormats';
import { MobilityField } from '../../enums/MobilityFields';
import { Nationality } from '../../enums/Nations';
import { SkillRating } from '../../enums/SkillRatings';
import { UnitSpecialRuleName } from '../../enums/UnitSpecialRuleNames';
import { UnitType } from '../../enums/UnitTypes';
import { ArmorRating } from '../../typing/ArmorRating';
import { SaveRating } from '../../typing/SaveRating';
import { isHitOnRating, isMotivationRating, isSkillRating, SoftStatBaseRating } from '../../typing/SoftStat';
import { UnitCard } from '../../typing/UnitCard';
import { Weapon, WeaponFiringData, WeaponFiringMode } from '../../typing/Weapon';
import { actions } from './editorSlice';

export const setUnitCardActionCreator = (unitCard: UnitCard) => (dispatch: Dispatch) => {
	dispatch(actions.setUnitCard(unitCard));
};

export function setIsPublicActionCreator(isPublic: boolean) {
	return (dispatch: Dispatch) => {
		dispatch(actions.setIsPublic(isPublic));
	};
}

export function setPrimaryImageURLActionCreator(url: string) {
	return (dispatch: Dispatch) => {
		dispatch(actions.setPrimaryImageURL(url));
	};
}

export function setPrimaryImageFormatActionCreator(format: ImageFormat) {
	return (dispatch: Dispatch) => {
		dispatch(actions.setPrimaryImageFormat(format));
	};
}

export function setNationalityActionCreator(nationality: Nationality) {
	return (dispatch: Dispatch) => {
		dispatch(actions.setNationality(nationality));
	};
}

export function setUnitTypeActionCreator(unitType: UnitType) {
	return (dispatch: Dispatch) => {
		dispatch(actions.setUnitType(unitType));
	};
}

export function setTitleActionCreator(title: string) {
	return (dispatch: Dispatch) => {
		dispatch(actions.setTitle(title));
	};
}

export function setSubTitleActionCreator(subTitle: string) {
	return (dispatch: Dispatch) => {
		dispatch(actions.setSubTitle(subTitle));
	};
}

export function setSubTitleAboveTitleActionCreator(subTitleAboveTitle: boolean) {
	return (dispatch: Dispatch) => {
		dispatch(actions.setSubTitleAboveTitle(subTitleAboveTitle));
	};
}

export function setEraActionCreator(era: Era) {
	return (dispatch: Dispatch) => {
		dispatch(actions.setEra(era));
	};
}

export function setSpecialRulesActionCreator(specialRules: UnitSpecialRuleName[]) {
	return (dispatch: Dispatch) => {
		dispatch(actions.setSpecialRules(specialRules));
	};
}

export function setBaseRatingActionCreator(softStat: string, rating: SoftStatBaseRating) {
	return (dispatch: Dispatch) => {
		if (isMotivationRating(rating)) {
			dispatch(actions.setMotivationBaseRating(rating));
		}
		if (isSkillRating(rating)) {
			dispatch(actions.setSkillBaseRating(rating));
		}
		if (isHitOnRating(rating)) {
			dispatch(actions.setHitOnBaseRating(rating));
		}
	};
}

export function setSkillBaseRatingActionCreator(skillBaseRating: SkillRating) {
	return (dispatch: Dispatch) => {
		dispatch(actions.setSkillBaseRating(skillBaseRating));
	};
}

export function addModifierActionCreator(modifierType: 'motivation' | 'skill' | 'hitOn', modifier: any) {
	return (dispatch: Dispatch) => {
		dispatch(actions.addModifier({ modifierType, modifier }));
	};
}

export function updateModifierActionCreator(modifierType: 'motivation' | 'skill' | 'hitOn', index: number, modifier: any) {
	return (dispatch: Dispatch) => {
		dispatch(actions.updateModifier({ modifierType, index, modifier }));
	};
}

export function removeModifierActionCreator(modifierType: 'motivation' | 'skill' | 'hitOn', index: number) {
	return (dispatch: Dispatch) => {
		dispatch(actions.removeModifier({ modifierType, index }));
	};
}

export function setMobilityActionCreator(attribute: MobilityField, value: number) {
	return (dispatch: Dispatch) => {
		dispatch(actions.setMobility({ attribute, value }));
	};
}

export function setArmorRatingActionCreator(rating: ArmorRating) {
	return (dispatch: Dispatch) => {
		dispatch(actions.setArmorRating(rating));
	};
}

export function setSaveRatingActionCreator(rating: SaveRating) {
	return (dispatch: Dispatch) => {
		dispatch(actions.setSaveRating(rating));
	};
}

export function addWeaponActionCreator(weapon: Weapon) {
	return (dispatch: Dispatch) => {
		dispatch(actions.addWeapon({ weapon }));
	};
}

export function updateWeaponNameActionCreator(index: number, name: string) {
	return (dispatch: Dispatch) => {
		dispatch(actions.updateWeaponName({ index, name }));
	};
}

export function updateWeaponActionCreator(index: number, mode: WeaponFiringMode, data: WeaponFiringData) {
	return (dispatch: Dispatch) => {
		dispatch(actions.updateWeapon({ index, mode, data }));
	};
}

export function removeWeaponActionCreator(index: number) {
	return (dispatch: Dispatch) => {
		dispatch(actions.removeWeapon({ index }));
	};
}

export function setUnitIsFormationActionCreator(isFormation: boolean) {
	return (dispatch: Dispatch) => {
		dispatch(actions.setIsFormation({ isFormation }));
	};
}

export function setUnitIsComponentActionCreator(isComponent: boolean) {
	return (dispatch: Dispatch) => {
		dispatch(actions.setIsComponent({ isComponent }));
	};
}

export function setUnitPassengersActionCreator(passengers: number) {
	return (dispatch: Dispatch) => {
		dispatch(actions.setPassengers({ passengers }));
	};
}
