import React from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import { EditorSubSection } from './EditorSubSection';
import {
	addWeaponActionCreator,
	removeWeaponActionCreator,
	updateWeaponActionCreator,
	updateWeaponNameActionCreator,
} from '../../store/editor/editorActionCreators';
import { defaultBombardment, defaultDirectFire, defaultWeapon } from '../../store/editor/defaultWeapon';
import { InputText } from 'primereact/inputtext';
import { Checkbox } from 'primereact/checkbox';
import { Button } from 'primereact/button';
import { EditorSection } from './EditorSection';
import { FormItem } from './FormItem';
import './WeaponsEditor.scss';
import { ConnectedWeaponDirectEditor } from './WeaponDirectEditor';
import { ConnectedWeaponBombardmentEditor } from './WeaponBombardmentEditor';

const connector = connect(
	(state: RootState) => ({
		weapons: state.editor.unitCard.unit.weapons,
	}),
	(dispatch) => bindActionCreators({
		addWeapon: addWeaponActionCreator,
		updateWeapon: updateWeaponActionCreator,
		removeWeapon: removeWeaponActionCreator,
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
	updateWeaponName,
}: WeaponsEditorProps) => (
	<EditorSection className="weapons-editor" title="Weapons">
		{weapons.map((weapon, i) => (
			<EditorSubSection key={i} onRemove={() => removeWeapon(i)}>
				<FormItem label="Name">
					<InputText
						value={weapon.name}
						onChange={(e) => updateWeaponName(i, e.currentTarget.value)}
						placeholder="Name"
					/>
				</FormItem>

				<h3>Bombardment</h3>
				<FormItem label="Can Bombard">
					<Checkbox
						checked={Boolean(weapon.bombardment)}
						onChange={(e) => updateWeapon(i, 'bombardment', e.checked ? defaultBombardment : null)}
					/>
				</FormItem>
				{Boolean(weapon.bombardment) && (
					<ConnectedWeaponBombardmentEditor i={i} weapon={weapon} />
				)}

				<h3>Direct Fire</h3>
				<FormItem label="Can Direct Fire">
					<Checkbox
						checked={Boolean(weapon.direct)}
						onChange={(e) => updateWeapon(i, 'direct', e.checked ? defaultDirectFire : null)}
					/>
				</FormItem>
				{Boolean(weapon.direct) && (
					<ConnectedWeaponDirectEditor i={i} mode="direct" weapon={weapon} />
				)}

				<h3>Secondary Fire</h3>
				<FormItem label="Secondary Firing Mode">
					<Checkbox
						checked={Boolean(weapon.secondary)}
						onChange={(e) => updateWeapon(i, 'secondary', e.checked ? {
							...defaultDirectFire,
							name: '',
						} : null)}
					/>
				</FormItem>
				{Boolean(weapon.secondary) && (
					<ConnectedWeaponDirectEditor i={i} mode="secondary" weapon={weapon} />
				)}
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
