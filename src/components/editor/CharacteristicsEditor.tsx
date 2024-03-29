import React from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import { Dropdown } from 'primereact/dropdown';
import { MultiSelect } from 'primereact/multiselect';
import {
	removeWeaponActionCreator,
	setArmorRatingActionCreator,
	setSaveRatingActionCreator,
	setSpecialRulesActionCreator,
	setUnitIsFormationActionCreator,
	setUnitPassengersActionCreator,
	setUnitTypeActionCreator,
} from '../../store/editor/editorActionCreators';
import { getFormValues } from '../../utils/getFormValues';
import { UnitTypes } from '../../enums/UnitTypes';
import { Checkbox } from 'primereact/checkbox';
import { InputNumber } from 'primereact/inputnumber';
import { EditorSection } from './EditorSection';
import { FormItem } from './FormItem';

const connector = connect(
	(state: RootState) => ({
		unitType: state.editor.unitCard.unit.unitType,
		passengers: state.editor.unitCard.unit.passengers,
		isFormation: state.editor.unitCard.unit.isFormation,
		specialRules: state.editor.unitCard.unit.specialRules,
		availableSpecialRules: state.editor.availableSpecialRules,
	}),
	(dispatch) => bindActionCreators({
		setArmorRating: setArmorRatingActionCreator,
		setSaveRating: setSaveRatingActionCreator,
		removeWeapon: removeWeaponActionCreator,
		setUnitType: setUnitTypeActionCreator,
		setSpecialRules: setSpecialRulesActionCreator,
		setUnitIsFormation: setUnitIsFormationActionCreator,
		setUnitPassengers: setUnitPassengersActionCreator,
	}, dispatch),
);

export type CharacteristicsEditorProps = ConnectedProps<typeof connector>;

export const CharacteristicsEditor: React.FC<CharacteristicsEditorProps> = ({
	unitType,
	passengers,
	isFormation,
	specialRules,
	setSaveRating,
	setArmorRating,
	setUnitType,
	setSpecialRules,
	availableSpecialRules,
	setUnitIsFormation,
	setUnitPassengers,
}: CharacteristicsEditorProps) => (
	<EditorSection className="characteristics-editor" title="Characteristics">
		<FormItem label="Type">
			<Dropdown
				value={unitType}
				options={getFormValues(UnitTypes)}
				onChange={(e) => {
					if (e.value === 'TANK') {
						setArmorRating({
							front: 1,
							sideRear: 1,
							top: 1,
						});
					} else {
						setSaveRating({
							type: e.value,
							value: 3,
						});
					}
					setUnitType(e.value);
				}}
				placeholder="Select a unit type"
			/>
		</FormItem>
		<FormItem label="Is Formation">
			<Checkbox onChange={(e) => setUnitIsFormation(e.checked)} checked={isFormation} />
		</FormItem>
		{['TANK', 'UNARMOURED_TANK'].includes(unitType) && (
			<>
				<FormItem label="Is Transport">
					<Checkbox onChange={(e) => setUnitPassengers(e.checked ? 1 : 0)}
						checked={passengers > 0} />
				</FormItem>
				{passengers > 0 && (
					<FormItem label="Passengers">
						<InputNumber
							value={passengers}
							onValueChange={(e) => setUnitPassengers(e.value)}
							showButtons
							min={1}
							max={3}
						/>
					</FormItem>
				)}
			</>
		)}
		<FormItem label="Special Rules">
			<MultiSelect
				id="special-rules"
				value={specialRules}
				options={availableSpecialRules}
				display="chip"
				onChange={(e) => setSpecialRules(e.value)}
			/>
		</FormItem>
	</EditorSection>
);

export const ConnectedCharacteristicsEditor = connector(CharacteristicsEditor);
