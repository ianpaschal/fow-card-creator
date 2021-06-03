import React from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { RootState } from '../../store';
import {
	setEraActionCreator,
	setNationalityActionCreator,
	setSubTitleActionCreator,
	setTitleActionCreator,
	setSubTitleAboveTitleActionCreator,
} from '../../store/editor/editorActionCreators';
import { getFormValues } from '../../utils/getFormValues';
import { Nations } from '../../enums/Nations';
import { Eras } from '../../enums/Eras';
import { EditorSection } from './EditorSection';
import { FormItem } from './FormItem';
import { Checkbox } from 'primereact/checkbox';

const connector = connect(
	(state: RootState) => ({
		unit: state.editor.unit,
	}),
	(dispatch) => bindActionCreators({
		setEra: setEraActionCreator,
		setNationality: setNationalityActionCreator,
		setSubTitle: setSubTitleActionCreator,
		setTitle: setTitleActionCreator,
		setSubTitleAboveTitle: setSubTitleAboveTitleActionCreator,
	}, dispatch),
);

export type ReduxProps = ConnectedProps<typeof connector>;

export type GeneralEditorProps = ReduxProps;

export const GeneralEditor: React.FC<GeneralEditorProps> = ({
	unit,
	setEra,
	setNationality,
	setSubTitle,
	setTitle,
	setSubTitleAboveTitle,
}: GeneralEditorProps) => (
	<EditorSection className='general-editor' title="General">
		<FormItem label="Title">
			<InputText
				value={unit.title}
				onChange={(e) => setTitle(e.currentTarget.value)}
				placeholder="Title"
			/>
		</FormItem>
		<FormItem label="Sub-Title">
			<InputText
				value={unit.subTitle}
				onChange={(e) => setSubTitle(e.currentTarget.value)}
				placeholder="Sub-Title"
			/>
		</FormItem>
		<FormItem label="Above Title?">
			<Checkbox onChange={(e) => setSubTitleAboveTitle(e.checked)} checked={unit.subTitleAboveTitle} />
		</FormItem>
		<FormItem label="Nation">
			<Dropdown
				value={unit.nationality}
				options={getFormValues(Nations)}
				onChange={(e) => setNationality(e.value)}
				placeholder="Select a nationality"
			/>
		</FormItem>
		<FormItem label="Era">
			<Dropdown
				value={unit.era}
				options={getFormValues(Eras)}
				onChange={(e) => setEra(e.value)}
				placeholder="Select an era"
			/>
		</FormItem>
	</EditorSection>
);

export const ConnectedGeneralEditor = connector(GeneralEditor);
