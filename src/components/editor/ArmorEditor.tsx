import React from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { InputNumber } from 'primereact/inputnumber';
import { RootState } from '../../store';
import { ArmorField, ArmorFieldKeys, ArmorFields } from '../../enums/ArmorFields';
import { setArmorRatingActionCreator } from '../../store/editor/editorActionCreators';
import { EditorSection } from './EditorSection';
import { FormItem } from './FormItem';

const connector = connect(
	(state: RootState) => ({
		armor: state.editor.unitCard.unit.armor,
	}),
	(dispatch) => bindActionCreators({
		setArmorRating: setArmorRatingActionCreator,
	}, dispatch),
);

export type ReduxProps = ConnectedProps<typeof connector>;

export type ArmorEditorProps = ReduxProps;

export const ArmorEditor: React.FC<ArmorEditorProps> = ({
	armor,
	setArmorRating,
}: ArmorEditorProps) => (
	<EditorSection className="armor-editor" title="Armor">
		{ArmorFieldKeys.map((key: ArmorField, i: number) => (
			<FormItem key={i} label={ArmorFields[ key ]}>
				<InputNumber
					value={armor[ key ]}
					onValueChange={(e) => setArmorRating({
						...armor,
						[ key ]: Math.min(99, Math.max(0, parseInt(e.target.value))),
					})}
					showButtons
					min={0}
					max={99}
					step={1}
				/>
			</FormItem>
		))}
	</EditorSection>
);

export const ConnectedArmorEditor = connector(ArmorEditor);
