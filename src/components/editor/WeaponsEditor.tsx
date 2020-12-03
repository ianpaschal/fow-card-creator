import React from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import { EditorSubSection } from './EditorSubSection';
import {
	addWeaponActionCreator,
	addWeaponBombardmentActionCreator,
	removeWeaponActionCreator,
	removeWeaponBombardmentActionCreator,
	updateWeaponActionCreator,
	updateWeaponNameActionCreator,
} from '../../store/editor/editorActionCreators';
import { defaultBombardment, defaultWeapon } from '../../store/editor/defaultWeapon';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Button } from 'primereact/button';
import { EditorSection } from './EditorSection';
import { FormItem } from './FormItem';
import './WeaponsEditor.scss';

const connector = connect(
	(state: RootState) => ({
		weapons: state.editor.unit.weapons,
	}),
	(dispatch) => bindActionCreators({
		addWeapon: addWeaponActionCreator,
		updateWeapon: updateWeaponActionCreator,
		removeWeapon: removeWeaponActionCreator,
		addWeaponBombardment: addWeaponBombardmentActionCreator,
		removeWeaponBombardment: removeWeaponBombardmentActionCreator,
		updateWeaponName: updateWeaponNameActionCreator,
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
	updateWeapon,
	removeWeapon,
	addWeaponBombardment,
	removeWeaponBombardment,
	updateWeaponName,
}: WeaponsEditorProps) => (
	<EditorSection className='weapons-editor' title="Weapons">
		{weapons.map((weapon, i) => (
			<EditorSubSection key={i} onRemove={() => removeWeapon(i)}>
				<FormItem label="Name">
					<InputText
						value={weapon.name}
						onChange={(e) => updateWeaponName(i, e.currentTarget.value)}
					/>
				</FormItem>
				<FormItem label="Can Bombard">
					<Checkbox
						checked={Boolean(weapon.bombardment)}
						onChange={(e) => {
							if (e.checked) {
								addWeaponBombardment(i, defaultBombardment);
							} else {
								removeWeaponBombardment(i);
							}
						}}
					/>
				</FormItem>
				{Boolean(weapon.bombardment) && (
					<>
						<h2>Bombardment</h2>
						<FormItem label="Range">
							<InputNumber
								value={weapon.bombardment.range}
								onChange={(e) => updateWeapon(i, 'bombardment', 'range', e.value)}
								showButtons
								step={2}
								min={0}
								max={96}
							/>
						</FormItem>
						<FormItem label="Template">
							<RadioButton
								value="artillery"
								name="bombardment-type"
								onChange={(e) => updateWeapon(i, 'bombardment', 'template', e.value)}
								checked={weapon.bombardment.template === 'artillery'}
							/>
							<label htmlFor="bombardment-type-artillery">Artillery</label>
							<RadioButton
								value="salvo"
								name="bombardment-type"
								onChange={(e) => updateWeapon(i, 'bombardment', 'template', e.value)}
								checked={weapon.bombardment.template === 'salvo'}
							/>
							<label htmlFor="bombardment-type-salvo">Salvo</label>
						</FormItem>
						<FormItem label="Anti-Tank">
							<InputNumber
								value={weapon.bombardment.antiTank}
								onValueChange={(e) => updateWeapon(i, 'bombardment', 'antiTank', e.value)}
								showButtons
								min={1}
							/>
						</FormItem>
						<FormItem label="Firepower">
							<InputNumber
								value={weapon.bombardment.firePower}
								onValueChange={(e) => updateWeapon(i, 'bombardment', 'firePower', e.value)}
								showButtons
								min={1}
								max={6}
							/>
						</FormItem>
						{/*
						<label htmlFor="bombardment-special-rules">Special Rules</label>
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
						*/}
						<h2>Direct Fire</h2>
					</>
				)}
				<FormItem label="Range">
					<InputNumber
						id="direct-range"
						name="direct-range"
						value={weapon.direct.range}
						onChange={(e) => updateWeapon(i, 'direct', 'range', e.value)}
						showButtons
						step={2}
						min={0}
						max={96}
					/>
				</FormItem>
				<FormItem label="Halted ROF">
					<InputNumber
						value={weapon.direct.rof.halted}
						onChange={(e) => updateWeapon(i, 'direct', 'rof', { ...weapon.direct.rof, halted: e.value })}
						showButtons
						min={1}
					/>
				</FormItem>
				<FormItem label="Moving ROF">
					<InputNumber
						value={weapon.direct.rof.moving}
						onChange={(e) => updateWeapon(i, 'direct', 'rof', { ...weapon.direct.rof, moving: e.value })}
						showButtons
						min={1}
					/>
				</FormItem>
				<FormItem label="Anti-Tank">
					<InputNumber
						value={weapon.direct.antiTank}
						onValueChange={(e) => updateWeapon(i, 'direct', 'antiTank', e.value)}
						showButtons
						min={1}
					/>
				</FormItem>
				<FormItem label="Firepower">
					<InputNumber
						value={weapon.direct.firePower}
						onValueChange={(e) => updateWeapon(i, 'direct', 'firePower', e.value)}
						showButtons
						min={1}
						max={6}
					/>
				</FormItem>
				{/*
				<label htmlFor="direct-special-rules">Special Rules</label>
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
				*/}
			</EditorSubSection>
		))}
		<div className="weapons-editor__add-button">
			<Button
				label="Add weapon"
				icon="pi pi-plus" iconPos="left"
				onClick={(e) => {
					e.preventDefault();
					addWeapon(defaultWeapon);
				}}
			/>
		</div>
	</EditorSection>
);

export const ConnectedWeaponsEditor = connector(WeaponsEditor);
