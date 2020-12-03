/* eslint-disable max-len */
import React from 'react';
import { getFormValues } from '../../utils/getFormValues';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import {
	setBaseRatingActionCreator,
	addModifierActionCreator,
	updateModifierActionCreator,
	removeModifierActionCreator,
} from '../../store/editor/editorActionCreators';
import {
	MotivationAttributes,
	MotivationRatings,
} from '../../enums/MotivationRatings';
import {
	SkillAttributes,
	SkillRatings,
} from '../../enums/SkillRatings';
import { HitOnRatings } from '../../enums/HitOnRatings';
import { EditorSubSection } from './EditorSubSection';
import { FormItem } from './FormItem';
import './SoftStatEditorSection.scss';

const connector = connect(
	(state: RootState) => ({
		unit: state.editor.unit,
	}),
	(dispatch) => bindActionCreators({
		setBaseRating: setBaseRatingActionCreator,
		addModifier: addModifierActionCreator,
		updateModifier: updateModifierActionCreator,
		removeModifier: removeModifierActionCreator,
	}, dispatch),
);

export interface OwnProps {
	canUseModifiers?: boolean;
	attribute: 'motivation' | 'skill' | 'hitOn';
}

export type ReduxProps = ConnectedProps<typeof connector>;

export type SoftStatEditorSectionProps = OwnProps & ReduxProps;

export class SoftStatEditorSection extends React.Component<SoftStatEditorSectionProps> {
	render() {
		const {
			unit,
			setBaseRating,
			addModifier,
			updateModifier,
			removeModifier,
			attribute,
		} = this.props;
		let ratingsEnum;
		let attributesEnum;
		let heading;
		if (attribute === 'motivation') {
			ratingsEnum = MotivationRatings;
			attributesEnum = MotivationAttributes;
			heading = 'Motivation';
		}
		if (attribute === 'skill') {
			ratingsEnum = SkillRatings;
			attributesEnum = SkillAttributes;
			heading = 'Skill';
		}
		if (attribute === 'hitOn') {
			ratingsEnum = HitOnRatings;
			heading = 'Is Hit On';
		}
		return (
			<div className="soft-stat-section">
				<FormItem label={heading}>
					<Dropdown
						value={unit[ attribute ].baseRating}
						options={getFormValues(ratingsEnum)}
						onChange={(e) => setBaseRating(attribute, e.value)}
						placeholder={heading}
					/>
				</FormItem>
				{attribute !== 'hitOn' && unit[ attribute ].modifiers.map((modifier, i) => (
					<EditorSubSection key={i} onRemove={() => removeModifier(attribute, i)}>
						<FormItem label="Name">
							<InputText
								value={modifier.name}
								onChange={(e) => updateModifier(attribute, i, {
									name: e.currentTarget.value,
								})}
								placeholder="Custom Name"
							/>
						</FormItem>
						<FormItem label="Type">
							<Dropdown
								value={modifier.attribute}
								options={getFormValues(attributesEnum)}
								onChange={(e) => {
									updateModifier(attribute, i, {
										attribute: e.target.value,
									});
								}}
								placeholder="Select a type"
							/>
						</FormItem>
						<FormItem label="Value">
							<InputNumber
								id="value"
								value={modifier.number}
								onValueChange={(e) => {
									updateModifier(attribute, i, {
										number: Math.min(Math.max(1, parseInt(e.target.value)), 6),
									});
								}}
								showButtons
								min={1}
								max={6}
							/>
						</FormItem>
					</EditorSubSection>
				))}
				{attribute !== 'hitOn' && (
					<div className="soft-stat-section__add-button">
						<Button

							label="Add modifier"
							icon="pi pi-plus" iconPos="left"
							onClick={(e) => {
								e.preventDefault();
								addModifier(attribute, { attribute: Object.keys(attributesEnum)[ 0 ], number: 4 });
							}}
						/>
					</div>
				)}
			</div>
		);
	}
}

export const ConnectedSoftStatEditorSection = connector(SoftStatEditorSection);
