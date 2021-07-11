import { actions } from './editorSlice';
import { ArmorRating } from '../../typing/ArmorRating';
import { Dispatch } from '@reduxjs/toolkit';
import { Era } from '../../enums/Eras';
import { ImageFormat } from '../../enums/ImageFormats';
import { isHitOnRating, isMotivationRating, isSkillRating, SoftStatBaseRating } from '../../typing/SoftStat';
import { MobilityField } from '../../enums/MobilityFields';
import { Nationality } from '../../enums/Nations';
import { SaveRating } from '../../typing/SaveRating';
import { SkillRating } from '../../enums/SkillRatings';
import { SoftStatField } from '../../enums/SoftStatFields';
import { UnitCard } from '../../typing/UnitCard';
import { UnitSpecialRuleName } from '../../enums/UnitSpecialRuleNames';
import { UnitType } from '../../enums/UnitTypes';
import { Weapon, WeaponFiringData, WeaponFiringMode } from '../../typing/Weapon';

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

export function setBaseRatingActionCreator(field: SoftStatField, rating: SoftStatBaseRating) {
	return (dispatch: Dispatch) => {
		if (field === 'motivation' && isMotivationRating(rating)) {
			dispatch(actions.setMotivationBaseRating(rating));
		}
		if (field === 'skill' && isSkillRating(rating)) {
			dispatch(actions.setSkillBaseRating(rating));
		}
		if (field === 'hitOn' && isHitOnRating(rating)) {
			dispatch(actions.setHitOnBaseRating(rating));
		}
	};
}

export function setSkillBaseRatingActionCreator(skillBaseRating: SkillRating) {
	return (dispatch: Dispatch) => {
		dispatch(actions.setSkillBaseRating(skillBaseRating));
	};
}

// TODO: Combine the following three action creators into one
export function addModifierActionCreator(modifierType: SoftStatField, modifier: any) {
	return (dispatch: Dispatch) => {
		dispatch(actions.addModifier({ modifierType, modifier }));
	};
}

export function updateModifierActionCreator(modifierType: SoftStatField, index: number, modifier: any) {
	return (dispatch: Dispatch) => {
		dispatch(actions.updateModifier({ modifierType, index, modifier }));
	};
}

export function removeModifierActionCreator(modifierType: SoftStatField, index: number) {
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
