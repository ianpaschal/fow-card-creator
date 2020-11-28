/* eslint-disable max-len */
import React from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';;
import { getFormValues } from '../../utils/getFormValues';
import '../CardEditor.scss';
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
	MotivationRating,
	MotivationRatings,
} from '../../enums/MotivationRatings';
import {
	SkillAttributes,
	SkillRating,
	SkillRatings,
} from '../../enums/SkillRatings';
import { HitOnRating, HitOnRatings } from '../../enums/HitOnRatings';

const animatedComponents = makeAnimated();
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
			<div className="card-editor__section">
				<label htmlFor={attribute}>{heading}</label>
				<Select
					options={getFormValues(ratingsEnum)}
					components={animatedComponents}
					onChange={(selection: {
							value: MotivationRating | SkillRating | HitOnRating,
							label: string
						}) => {
						setBaseRating(attribute, selection.value);
					}}
					value={unit[ attribute ].baseRating ? {
						value: unit[ attribute ].baseRating,
						label: ratingsEnum[ unit[ attribute ].baseRating ],
					} : undefined}
				/>

				{attribute !== 'hitOn' && unit[ attribute ].modifiers.map((modifier, i) => (
					<div key={i} className="card-editor__rating-modifier">
						<button className='delete-button' onClick={(e) => {
							e.preventDefault();
							removeModifier(attribute, i);
						}}>X</button>
						<div className='attribute-select'>
							<label htmlFor="type">Type</label>
							<Select
								options={getFormValues(attributesEnum)}
								components={animatedComponents}
								onChange={(selected: {
									value: string,
									label: string,
								}) => {
									updateModifier(attribute, i, {
										attribute: selected.value,
									});
								}}
								value={{
									value: modifier.attribute,
									label: attributesEnum[ modifier.attribute ],
								}}
							/>
						</div>
						<div className='name-input'>
							<label htmlFor="name">Custom Name</label>
							<input
								type="text"
								id="name"
								name="name"
								onChange={(e) => {
									updateModifier(attribute, i, {
										name: e.target.value,
									});
								}}
							/>
						</div>
						<div className='value-input'>
							<label htmlFor="value">Value</label>
							<input
								type="number"
								id="value"
								name="value"
								min="1"
								max="6"
								onChange={(e) => {
									updateModifier(attribute, i, {
										number: Math.min(Math.max(1, parseInt(e.target.value)), 6),
									});
								}}
								value={String(modifier.number)}
							/>
						</div>
					</div>
				))}
				{attribute !== 'hitOn' && (
					<button onClick={(e) => {
						e.preventDefault();
						addModifier(attribute, { attribute: Object.keys(attributesEnum)[ 0 ], number: 4 });
					}}>
						Add modifier
					</button>
				)}
			</div>
		);
	}
}

export const ConnectedSoftStatEditorSection = connector(SoftStatEditorSection);
