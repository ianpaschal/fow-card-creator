import React from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import classNamesDedupe from 'classnames/dedupe';
import { EditorSubSection } from './EditorSubSection';
import { WeaponAttributes, WeaponAttributeKeys } from '../../enums/WeaponAttributes';
import {
	addWeaponActionCreator,
	removeWeaponActionCreator,
	updateWeaponActionCreator,
} from '../../store/editor/editorActionCreators';

const connector = connect(
	(state: RootState) => ({
		weapons: state.editor.unit.weapons,
	}),
	(dispatch) => bindActionCreators({
		addWeapon: addWeaponActionCreator,
		removeWeapon: removeWeaponActionCreator,
		updateWeapon: updateWeaponActionCreator,
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
	updateWeapon,
}: WeaponsEditorProps) => (
	<div className={classNamesDedupe('weapons-editor', 'card-editor__section', extraClassName)}>
		{weapons.map((weapon, i) => (
			<EditorSubSection key={i} onRemove={() => removeWeapon(i)}>
				<input type="text"/>
			</EditorSubSection>
		))}
	</div>
);

export const ConnectedWeaponsEditor = connector(WeaponsEditor);
