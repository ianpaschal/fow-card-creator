import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { Nationality, Nations } from '../enums/Nations';
import { UnitType, UnitTypes } from '../enums/UnitTypes';
import { getFormValues } from '../utils/getFormValues';
import './CardEditor.scss';
import { Era, Eras } from '../enums/Eras';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store';
import {
	setNationalityActionCreator,
	setSubTitleActionCreator,
	setTitleActionCreator,
	setUnitTypeActionCreator,
	setEraActionCreator,
	setSpecialRulesActionCreator,
	setArmorRatingActionCreator,
	setArmorAttributeActionCreator,
	setSaveRatingActionCreator,
} from '../store/editor/editorActionCreators';
import { UnitSpecialRuleName } from '../enums/UnitSpecialRuleNames';
import { ConnectedSoftStatEditorSection } from './editor/SoftStatEditorSection';
import { getBaseColor } from '../utils/getBaseColor';
import { ConnectedMobilityEditor, MobilityEditor } from './editor/MobilityEditor';

const animatedComponents = makeAnimated();

const connector = connect(
	(state: RootState) => ({
		unit: state.editor.unit,
		availableSpecialRules: state.editor.availableSpecialRules,
	}),
	(dispatch) => bindActionCreators({
		setNationality: setNationalityActionCreator,
		setUnitType: setUnitTypeActionCreator,
		setTitle: setTitleActionCreator,
		setSubTitle: setSubTitleActionCreator,
		setEra: setEraActionCreator,
		setSpecialRules: setSpecialRulesActionCreator,
		setArmorRating: setArmorRatingActionCreator,
		setArmorAttribute: setArmorAttributeActionCreator,
		setSaveRating: setSaveRatingActionCreator,
	}, dispatch),
);

export type ReduxProps = ConnectedProps<typeof connector>;

export type CardEditorProps = ReduxProps;

export class CardEditor extends React.Component<CardEditorProps> {
	render() {
		const {
			availableSpecialRules,
			unit,
			setUnitType,
			setNationality,
			setEra,
			setTitle,
			setSubTitle,
			setSpecialRules,
			setArmorRating,
			setSaveRating,
		} = this.props;
		return (
			<form className="card-editor">
				<div className="card-editor__section">
					<h1>General</h1>

					<div className="card-editor__input-row">
						<label htmlFor="ear">Era</label>
						<Select
							options={getFormValues(Eras)}
							components={animatedComponents}
							onChange={(selection: {
								value: Era,
								label: string
							}) => {
								document.documentElement.style.setProperty('--base-color', getBaseColor(unit.nationality, selection.value));
								setEra(selection.value);
							}}
							value={unit.era ? {
								value: unit.era,
								label: Eras[ unit.era ],
							} : undefined}
						/>
					</div>
					<div className="card-editor__input-row">
						<label htmlFor="nation">Nation</label>
						<Select
							options={getFormValues(Nations)}
							components={animatedComponents}
							onChange={(selection: {
								value: Nationality,
								label: string
							}) => {
								document.documentElement.style.setProperty('--base-color', getBaseColor(selection.value, unit.era));
								setNationality(selection.value);
							}}
							value={unit.nationality ? {
								value: unit.nationality,
								label: Nations[ unit.nationality ],
							} : undefined}
						/>
					</div>
					<div className="card-editor__input-row">
						<label htmlFor="unit-type">Unit Type</label>
						<Select
							options={getFormValues(UnitTypes)}
							components={animatedComponents}
							onChange={(selection: {
								value: UnitType,
								label: string
							}) => {
								if (selection.value === 'TANK_UNIT') {
									setArmorRating({
										front: 1,
										sideRear: 1,
										top: 1,
									});
								} else {
									setSaveRating({
										type: selection.value,
										value: 3,
									});
								}
								setUnitType(selection.value);
							}}
							value={unit.unitType ? {
								value: unit.unitType,
								label: UnitTypes[ unit.unitType ],
							} : undefined}
						/>
					</div>
					<div className="card-editor__input-row">
						<label htmlFor="title">Title</label>
						<input type="text" id="title" name="title" onChange={(e) => {
							setTitle(e.target.value);
						}}/>
					</div>
					<div className="card-editor__input-row">
						<label htmlFor="sub-title">Sub-Title</label>
						<input type="text" id="sub-title" name="sub-title" onChange={(e) => {
							setSubTitle(e.target.value);
						}}/>
					</div>
					<div className="card-editor__input-row">
						<label htmlFor="special-rules">Special Rules</label>
						<Select
							options={availableSpecialRules}
							isMulti
							components={animatedComponents}
							onChange={(selection: {
								value: UnitSpecialRuleName,
								label: string
							}[]) => {
								setSpecialRules(selection.map((s) => s.value));
							}}
						/>
					</div>
				</div>
				<ConnectedSoftStatEditorSection attribute="motivation"/>
				<ConnectedSoftStatEditorSection attribute="skill"/>
				<ConnectedSoftStatEditorSection attribute="hitOn"/>
				<ConnectedMobilityEditor />
			</form>
		);
	}
}

export const ConnectedCardEditor = connector(CardEditor);
