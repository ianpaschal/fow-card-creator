import React from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { InputNumber } from 'primereact/inputnumber';
import { RootState } from '../../store';
import { setSaveRatingActionCreator } from '../../store/editor/editorActionCreators';
import { EditorSection } from './EditorSection';
import { FormItem } from './FormItem';
import { DiceRollValue } from '../../typing/DiceRollValue';
import { UnitTypes } from '../../enums/UnitTypes';

const connector = connect(
	(state: RootState) => ({
		save: state.editor.unitCard.unit.save,
	}),
	(dispatch) => bindActionCreators({
		setSaveRating: setSaveRatingActionCreator,
	}, dispatch),
);

export type SaveEditorProps = ConnectedProps<typeof connector>;

export const SaveEditor: React.FC<SaveEditorProps> = ({
	save,
	setSaveRating,
}: SaveEditorProps) => (
	<EditorSection className="armor-editor" title="Save">
		<FormItem label={`${UnitTypes[ save.type ]} Save`}>
			<InputNumber
				value={save.value}
				onValueChange={(e) => {
					const value = parseInt(e.target.value);
					setSaveRating({ type: save.type, value: Math.min(6, Math.max(1, value)) as DiceRollValue });
				}}
				showButtons
				min={1}
				max={6}
				step={1}
			/>
		</FormItem>
	</EditorSection>
);

export const ConnectedSaveEditor = connector(SaveEditor);
