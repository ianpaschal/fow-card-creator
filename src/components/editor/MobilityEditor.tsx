import React from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { InputNumber } from 'primereact/inputnumber';
import { RootState } from '../../store';
import classNamesDedupe from 'classnames/dedupe';
import { MobilityAttribute, MobilityAttributeKeys, MobilityAttributes } from '../../enums/Mobility';
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

export type ReduxProps = ConnectedProps<typeof connector>;

export type MobilityEditorProps = ReduxProps;

export const MobilityEditor: React.FC<MobilityEditorProps> = ({
	mobility,
	setMobility,
}: MobilityEditorProps) => (
	<EditorSection className='mobility-editor' title="Mobility">
		{MobilityAttributeKeys.map((attribute: MobilityAttribute, i: number) => (
			<FormItem key={i} label={MobilityAttributes[ attribute ]}>
				<InputNumber
					value={mobility[ attribute ]}
					onValueChange={(e) => {
						const value = parseInt(e.target.value);
						setMobility(attribute, attribute === 'cross' ? Math.min(Math.max(1, value), 6) : value);
					}}
					showButtons
					min={attribute === 'cross' ? 1 : 0}
					max={attribute === 'cross' ? 6 : 72}
					step={attribute === 'cross' ? undefined : 2}
				/>
			</FormItem>
		))}
	</EditorSection>
);

export const ConnectedMobilityEditor = connector(MobilityEditor);
