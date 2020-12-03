import React from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { InputNumber } from 'primereact/inputnumber';
import { RootState } from '../../store';
import classNamesDedupe from 'classnames/dedupe';
import { ConnectedSoftStatEditorSection } from './SoftStatEditorSection';
import { setUnitIsComponentActionCreator } from '../../store/editor/editorActionCreators';
import { Checkbox } from 'primereact/checkbox';
import { EditorSection } from './EditorSection';
import { FormItem } from './FormItem';

const connector = connect(
	(state: RootState) => ({
		unit: state.editor.unit,
	}),
	(dispatch) => bindActionCreators({
		setUnitIsComponent: setUnitIsComponentActionCreator,
	}, dispatch),
);

export interface OwnProps {
	className?: string;
}

export type ReduxProps = ConnectedProps<typeof connector>;

export type SoftStatEditorProps = OwnProps & ReduxProps;

export const SoftStatEditor: React.FC<SoftStatEditorProps> = ({
	className: extraClassName,
	unit,
	setUnitIsComponent,
}: SoftStatEditorProps) => (
	<EditorSection className='soft-stat-editor' title="Soft Stats">
		<FormItem label="Is Component">
			<Checkbox
				onChange={(e) => setUnitIsComponent(e.checked)}
				checked={unit.isComponent}
			/>
		</FormItem>
		{!unit.isComponent && (
			<>
				<ConnectedSoftStatEditorSection attribute="motivation"/>
				<ConnectedSoftStatEditorSection attribute="skill"/>
				<ConnectedSoftStatEditorSection attribute="hitOn"/>
			</>
		)}
	</EditorSection>
);

export const ConnectedSoftStatEditor = connector(SoftStatEditor);
