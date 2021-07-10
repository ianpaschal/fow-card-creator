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
	setIsPublicActionCreator,
} from '../../store/editor/editorActionCreators';
import { getFormValues } from '../../utils/getFormValues';
import { Nations } from '../../enums/Nations';
import { Eras } from '../../enums/Eras';
import { EditorSection } from './EditorSection';
import { FormItem } from './FormItem';
import { Checkbox } from 'primereact/checkbox';
import { RadioButton } from 'primereact/radiobutton';

const connector = connect(
	(state: RootState) => ({
		title: state.editor.unitCard.unit.title,
		subTitle: state.editor.unitCard.unit.subTitle,
		subTitleAboveTitle: state.editor.unitCard.unit.subTitleAboveTitle,
		nationality: state.editor.unitCard.unit.nationality,
		era: state.editor.unitCard.unit.era,
		isPublic: state.editor.unitCard.isPublic,
	}),
	(dispatch) => bindActionCreators({
		setEra: setEraActionCreator,
		setNationality: setNationalityActionCreator,
		setSubTitle: setSubTitleActionCreator,
		setTitle: setTitleActionCreator,
		setSubTitleAboveTitle: setSubTitleAboveTitleActionCreator,
		setIsPublic: setIsPublicActionCreator,
	}, dispatch),
);

export type GeneralEditorProps = ConnectedProps<typeof connector>;

export const GeneralEditor: React.FC<GeneralEditorProps> = ({
	title,
	subTitle,
	subTitleAboveTitle,
	nationality,
	era,
	setEra,
	setNationality,
	setSubTitle,
	setTitle,
	setSubTitleAboveTitle,
	isPublic,
	setIsPublic,
}: GeneralEditorProps) => (
	<EditorSection className="general-editor" title="General">
		<FormItem label="Visibility">
			<RadioButton
				value="public"
				name="visibility"
				onChange={(e) => setIsPublic(true)}
				checked={isPublic}
			/>
			<label htmlFor="visibility-public">Public</label>
			<RadioButton
				value="private"
				name="visibility"
				onChange={(e) => setIsPublic(false)}
				checked={!isPublic}
			/>
			<label htmlFor="visibility-private">Private</label>
		</FormItem>
		<FormItem label="Title">
			<InputText
				value={title}
				onChange={(e) => setTitle(e.currentTarget.value)}
				placeholder="Title"
			/>
		</FormItem>
		<FormItem label="Sub-Title">
			<InputText
				value={subTitle}
				onChange={(e) => setSubTitle(e.currentTarget.value)}
				placeholder="Sub-Title"
			/>
		</FormItem>
		<FormItem label="Above Title?">
			<Checkbox onChange={(e) => setSubTitleAboveTitle(e.checked)} checked={subTitleAboveTitle} />
		</FormItem>
		<FormItem label="Nation">
			<Dropdown
				value={nationality}
				options={getFormValues(Nations)}
				onChange={(e) => setNationality(e.value)}
				placeholder="Select a nationality"
			/>
		</FormItem>
		<FormItem label="Era">
			<Dropdown
				value={era}
				options={getFormValues(Eras)}
				onChange={(e) => setEra(e.value)}
				placeholder="Select an era"
			/>
		</FormItem>
	</EditorSection>
);

export const ConnectedGeneralEditor = connector(GeneralEditor);
