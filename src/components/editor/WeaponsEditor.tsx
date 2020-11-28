import React from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import classNamesDedupe from 'classnames/dedupe';
import { WeaponsAttribute, WeaponsAttributeKeys, WeaponsAttributes } from '../../enums/Weapons';
import { setWeaponsActionCreator } from '../../store/editor/editorActionCreators';

const connector = connect(
	(state: RootState) => ({
		weapons: state.editor.unit.weapons,
	}),
	(dispatch) => bindActionCreators({
		setWeapons: setWeaponsActionCreator,
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
	setWeapons,
}: WeaponsEditorProps) => (
	<div className={classNamesDedupe('card-editor__section', extraClassName)}>

		{WeaponsAttributeKeys.map((attribute: WeaponsAttribute, i: number) => (
			<div key={i} className="card-editor__input-row">
				<label htmlFor={attribute}>{WeaponsAttributes[ attribute ]}</label>
				<input type="number"
					id={attribute}
					name={attribute}
					min={attribute !== 'cross' ? '0' : '1'}
					max={attribute !== 'cross' ? '72' : '6'}
					step={attribute !== 'cross' ? '2' : undefined}
					onChange={(e) => {
						setWeapons(attribute, parseInt(e.target.value));
					}}
					value={weapons[ attribute ]}
				/>
			</div>
		))}

	</div>
);

export const ConnectedWeaponsEditor = connector(WeaponsEditor);
