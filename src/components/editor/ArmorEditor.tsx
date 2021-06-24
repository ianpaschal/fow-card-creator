import React from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { InputNumber } from 'primereact/inputnumber';
import { RootState } from '../../store';
import classNamesDedupe from 'classnames/dedupe';
import { ArmorAttribute, ArmorAttributeKeys, ArmorAttributes } from '../../enums/ArmorAttributes';
import { setArmorAttributeActionCreator } from '../../store/editor/editorActionCreators';
import { EditorSection } from './EditorSection';
import { FormItem } from './FormItem';

const connector = connect(
	(state: RootState) => ({
		armor: state.editor.unitCard.unit.armor,
	}),
	(dispatch) => bindActionCreators({
		setArmorAttribute: setArmorAttributeActionCreator,
	}, dispatch),
);

export type ReduxProps = ConnectedProps<typeof connector>;

export type ArmorEditorProps = ReduxProps;

export const ArmorEditor: React.FC<ArmorEditorProps> = ({
	armor,
	setArmorAttribute,
}: ArmorEditorProps) => (
	<EditorSection className='armor-editor' title="Armor">
		{ArmorAttributeKeys.map((attribute: ArmorAttribute, i: number) => (
			<FormItem key={i} label={ArmorAttributes[ attribute ]}>
				<InputNumber
					value={armor[ attribute ]}
					onValueChange={(e) => {
						const value = parseInt(e.target.value);
						setArmorAttribute(attribute, Math.min(99, Math.max(0, value)));
					}}
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
