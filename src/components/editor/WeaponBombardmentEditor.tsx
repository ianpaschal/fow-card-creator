import React from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { updateWeaponActionCreator } from '../../store/editor/editorActionCreators';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { FormItem } from './FormItem';
import './WeaponsEditor.scss';
import { Weapon } from '../../typing/Weapon';

const connector = connect(null, (dispatch) => bindActionCreators({
	updateWeapon: updateWeaponActionCreator,
}, dispatch));

export interface OwnProps {
	i: number;
	weapon: Weapon;
}

export type WeaponBombardmentEditorProps = OwnProps & ConnectedProps<typeof connector>;

export const WeaponBombardmentEditor: React.FC<WeaponBombardmentEditorProps> = ({
	i,
	updateWeapon,
	weapon,
}: WeaponBombardmentEditorProps) => (
	<>
		<FormItem label="Range">
			<InputNumber
				value={weapon.bombardment.range}
				onChange={(e) => updateWeapon(i, 'bombardment', { ...weapon.bombardment, range: e.value })}
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
				onChange={(e) => updateWeapon(i, 'bombardment', { ...weapon.bombardment, template: e.value })}
				checked={weapon.bombardment.template === 'BOMBARDMENT'}
			/>
			<label htmlFor="bombardment-type-artillery">Artillery</label>
			<RadioButton
				value="salvo"
				name="bombardment-type"
				onChange={(e) => updateWeapon(i, 'bombardment', { ...weapon.bombardment, template: e.value })}
				checked={weapon.bombardment.template === 'SALVO'}
			/>
			<label htmlFor="bombardment-type-salvo">Salvo</label>
		</FormItem>
		<FormItem label="Anti-Tank">
			<InputNumber
				value={weapon.bombardment.antiTank}
				onValueChange={(e) => updateWeapon(i, 'bombardment', { ...weapon.bombardment, antiTank: e.value })}
				showButtons
				min={1}
			/>
		</FormItem>
		<FormItem label="Firepower">
			<InputNumber
				value={weapon.bombardment.firePower}
				onValueChange={(e) => updateWeapon(i, 'bombardment', { ...weapon.bombardment, firePower: e.value })}
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
	</>
);

export const ConnectedWeaponBombardmentEditor = connector(WeaponBombardmentEditor);
