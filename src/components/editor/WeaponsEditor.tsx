/* eslint-disable max-len */
import React from 'react';
import makeAnimated from 'react-select/animated';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import classNamesDedupe from 'classnames/dedupe';
import { EditorSubSection } from './EditorSubSection';
import { WeaponAttributes, WeaponAttributeKeys } from '../../enums/WeaponAttributes';
import {
	addWeaponActionCreator,
	removeWeaponActionCreator,
} from '../../store/editor/editorActionCreators';
import Select from 'react-select';
import { defaultWeapon } from '../../store/editor/defaultWeapon';

const animatedComponents = makeAnimated();

const connector = connect(
	(state: RootState) => ({
		weapons: state.editor.unit.weapons,
	}),
	(dispatch) => bindActionCreators({
		addWeapon: addWeaponActionCreator,
		removeWeapon: removeWeaponActionCreator,
	}, dispatch),
);

export interface OwnProps {
	className?: string;
}

export type ReduxProps = ConnectedProps<typeof connector>;

export type WeaponsEditorProps = OwnProps & ReduxProps;

export const WeaponsEditor: React.FC<WeaponsEditorProps> = ({
	className: extraClassName,
	weapons,
	addWeapon,
	removeWeapon,
}: WeaponsEditorProps) => (
	<div className={classNamesDedupe('weapons-editor', 'card-editor__section', extraClassName)}>
		{weapons.map((weapon, i) => (
			<EditorSubSection key={i} onRemove={() => removeWeapon(i)}>
				<label htmlFor="name">Name</label>
				<input type="text" id="name" name="name" onChange={(e) => {}}/>

				<label htmlFor="can-bombard">Can bombard?</label>
				<input type="checkbox" id="can-bombard" name="can-bombard" checked={Boolean(weapon.bombardment)}/>

				{Boolean(weapon.bombardment) && (
					<>
						<h2>Bombardment</h2>

						<label htmlFor="bombardment-range">Range</label>
						<input type="number" id="bombardment-range" name="bombardment-range" onChange={(e) => {}}/>

						<h3>Template Type</h3>
						<input type="radio" id="bombardment-type-artillery" name="bombardment-type" value="artillery" checked={weapon.bombardment.template === 'artillery'}/>
						<label htmlFor="bombardment-type-artillery">Artillery</label>

						<input type="radio" id="bombardment-type-salvo" name="bombardment-type" value="salvo" checked={weapon.bombardment.template === 'salvo'}/>
						<label htmlFor="bombardment-type-salvo">Salvo</label>

						<label htmlFor="bombardment-anti-tank">Anti-Tank</label>
						<input type="number" id="bombardment-anti-tank" name="bombardment-anti-tank" onChange={(e) => {}}/>

						<label htmlFor="bombardment-fire-power">Firepower</label>
						<input type="number" id="bombardment-fire-power" name="bombardment-fire-power" onChange={(e) => {}}/>

						<label htmlFor="bombardment-special-rules">Special Rules</label>
						{/* <Select
							options={availableSpecialRules}
							isMulti
							components={animatedComponents}
							onChange={(selection: {
								value: UnitSpecialRuleName,
								label: string
							}[]) => {
								setSpecialRules(selection.map((s) => s.value));
							}}
						/> */}
						<h2>Direct Fire</h2>
					</>
				)}
				<label htmlFor="direct-range">Range</label>
				<input type="number" id="direct-range" name="direct-range" onChange={(e) => {}}/>

				<label htmlFor="direct-rof-halted">Halted ROF</label>
				<input type="number" id="direct-rof-halted" name="direct-rof-halted" onChange={(e) => {}}/>

				<label htmlFor="direct-rof-moving">Moving ROF</label>
				<input type="number" id="direct-rof-moving" name="direct-rof-moving" onChange={(e) => {}}/>

				<label htmlFor="direct-anti-tank">Anti-Tank</label>
				<input type="number" id="direct-anti-tank" name="direct-anti-tank" onChange={(e) => {}}/>

				<label htmlFor="direct-fire-power">Firepower</label>
				<input type="number" id="direct-fire-power" name="direct-fire-power" onChange={(e) => {}}/>

				<label htmlFor="direct-special-rules">Special Rules</label>
				{/* <Select
							options={availableSpecialRules}
							isMulti
							components={animatedComponents}
							onChange={(selection: {
								value: UnitSpecialRuleName,
								label: string
							}[]) => {
								setSpecialRules(selection.map((s) => s.value));
							}}
						/> */}

			</EditorSubSection>
		))}
		<button onClick={(e) => {
			e.preventDefault();
			addWeapon(defaultWeapon);
		}}
		>
			+
		</button>
	</div>
);

export const ConnectedWeaponsEditor = connector(WeaponsEditor);
