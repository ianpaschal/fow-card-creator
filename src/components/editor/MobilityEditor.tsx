import React from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { InputNumber } from 'primereact/inputnumber';
import { RootState } from '../../store';
import { MobilityField, MobilityFieldKeys, MobilityFields } from '../../enums/MobilityFields';
import { setMobilityActionCreator } from '../../store/editor/editorActionCreators';
import { EditorSection } from './EditorSection';
import { FormItem } from './FormItem';

const connector = connect(
	(state: RootState) => ({
		mobility: state.editor.unitCard.unit.mobility,
	}),
	(dispatch) => bindActionCreators({
		setMobility: setMobilityActionCreator,
	}, dispatch),
);

export type MobilityEditorProps = ConnectedProps<typeof connector>;

export const MobilityEditor: React.FC<MobilityEditorProps> = ({
	mobility,
	setMobility,
}: MobilityEditorProps) => (
	<EditorSection className="mobility-editor" title="Mobility">
		{MobilityFieldKeys.map((key: MobilityField, i: number) => (
			<FormItem key={i} label={MobilityFields[ key ]}>
				<InputNumber
					value={mobility[ key ]}
					onValueChange={(e) => {
						const value = parseInt(e.target.value);
						setMobility(key, key === 'cross' ? Math.min(Math.max(1, value), 6) : value);
					}}
					showButtons
					min={key === 'cross' ? 1 : 0}
					max={key === 'cross' ? 6 : 72}
					step={key === 'cross' ? undefined : 2}
				/>
			</FormItem>
		))}
	</EditorSection>
);

export const ConnectedMobilityEditor = connector(MobilityEditor);
