import React from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import { ConnectedSoftStatEditorSection } from './SoftStatEditorSection';
import { setUnitIsComponentActionCreator } from '../../store/editor/editorActionCreators';
import { Checkbox } from 'primereact/checkbox';
import { EditorSection } from './EditorSection';
import { FormItem } from './FormItem';

const connector = connect(
	(state: RootState) => ({
		isComponent: state.editor.unitCard.unit.isComponent,
	}),
	(dispatch) => bindActionCreators({
		setUnitIsComponent: setUnitIsComponentActionCreator,
	}, dispatch),
);

export type ReduxProps = ConnectedProps<typeof connector>;

export type SoftStatEditorProps = ReduxProps;

export const SoftStatEditor: React.FC<SoftStatEditorProps> = ({
	isComponent,
	setUnitIsComponent,
}: SoftStatEditorProps) => (
	<EditorSection className='soft-stat-editor' title="Soft Stats">
		<FormItem label="Is Component">
			<Checkbox
				onChange={(e) => setUnitIsComponent(e.checked)}
				checked={isComponent}
			/>
		</FormItem>
		{!isComponent && (
			<>
				<ConnectedSoftStatEditorSection attribute="motivation"/>
				<ConnectedSoftStatEditorSection attribute="skill"/>
				<ConnectedSoftStatEditorSection attribute="hitOn"/>
			</>
		)}
	</EditorSection>
);

export const ConnectedSoftStatEditor = connector(SoftStatEditor);
