import React from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { updateWeaponActionCreator } from '../../store/editor/editorActionCreators';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { FormItem } from './FormItem';
import './WeaponsEditor.scss';
import { Weapon } from '../../typing/Weapon';

const connector = connect(null, (dispatch) => bindActionCreators({
	updateWeapon: updateWeaponActionCreator,
}, dispatch));

export interface OwnProps {
	i: number;
	mode: 'direct' | 'secondary';
	weapon: Weapon;
}

export type ReduxProps = ConnectedProps<typeof connector>;

export type WeaponDirectEditorProps = OwnProps & ReduxProps;

export const WeaponDirectEditor: React.FC<WeaponDirectEditorProps> = ({
	i,
	mode,
	updateWeapon,
	weapon,
}: WeaponDirectEditorProps) => (
	<>
		{mode === 'secondary' && (
			<FormItem label="Name">
				<InputText
					value={weapon[ mode ].name}
					onChange={(e) => updateWeapon(i, mode, { ...weapon[ mode ], name: e.currentTarget.value })}
					placeholder="Name"
				/>
			</FormItem>
		)}
		<FormItem label="Range">
			<InputNumber
				id="direct-range"
				name="direct-range"
				value={weapon[ mode ].range}
				onChange={(e) => updateWeapon(i, mode, { ...weapon[ mode ], range: e.value })}
				showButtons
				step={2}
				min={0}
				max={96}
			/>
		</FormItem>
		<FormItem label="Halted ROF">
			<InputNumber
				value={weapon[ mode ].rof.halted}
				onChange={(e) => updateWeapon(i, mode, {
					...weapon[ mode ],
					rof: {
						...weapon[ mode ].rof,
						halted: e.value,
					},
				})}
				showButtons
				min={1}
			/>
		</FormItem>
		<FormItem label="Moving ROF">
			<InputNumber
				value={weapon[ mode ].rof.moving}
				onChange={(e) => updateWeapon(i, mode, {
					...weapon[ mode ],
					rof: {
						...weapon[ mode ].rof,
						moving: e.value,
					},
				})}
				showButtons
				min={1}
			/>
		</FormItem>
		<FormItem label="Anti-Tank">
			<InputNumber
				value={weapon[ mode ].antiTank}
				onValueChange={(e) => updateWeapon(i, mode, { ...weapon[ mode ], antiTank: e.value })}
				showButtons
				min={1}
			/>
		</FormItem>
		<FormItem label="Firepower">
			<InputNumber
				value={weapon[ mode ].firePower}
				onValueChange={(e) => updateWeapon(i, mode, { ...weapon[ mode ], firePower: e.value })}
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
	</>
);

export const ConnectedWeaponDirectEditor = connector(WeaponDirectEditor);
