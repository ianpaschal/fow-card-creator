import React from 'react';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import {
	setPrimaryImageFormatActionCreator,
	setPrimaryImageURLActionCreator,
} from '../../store/editor/editorActionCreators';
import { EditorSection } from './EditorSection';
import { FormItem } from './FormItem';
import { storage } from '../../firebase';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { getFormValues } from '../../utils/getFormValues';
import { ImageFormats } from '../../enums/ImageFormats';

const connector = connect(
	(state: RootState) => ({
		cardID: state.editor.unitCard.id,
		primaryImageURL: state.editor.unitCard.unit.primaryImageURL,
		primaryImageFormat: state.editor.unitCard.unit.primaryImageFormat,
	}),
	(dispatch) => bindActionCreators({
		setPrimaryImageURL: setPrimaryImageURLActionCreator,
		setPrimaryImageFormat: setPrimaryImageFormatActionCreator,
	}, dispatch),
);

export type ImagesEditorProps = ConnectedProps<typeof connector>;

export class ImagesEditor extends React.Component<ImagesEditorProps> {

	constructor(props: ImagesEditorProps) {
		super(props);
		this.onUpload = this.onUpload.bind(this);
		this.onDelete = this.onDelete.bind(this);
	}

	onUpload(e: React.ChangeEvent<HTMLInputElement>) {
		const { cardID, setPrimaryImageURL } = this.props;
		const file = e.target.files[ 0 ];
		const extension = file.name.split('.').pop();
		const fileURL = `/images/${cardID}/primary.${extension}`;
		const uploadTask = storage.ref(fileURL).put(file, {
			contentType: file.type,
		});
		uploadTask.on('state_changed', (snapShot) => {
			// takes a snap shot of the process as it is happening
			// console.log(snapShot);
		}, (err) => {
			// catches the errors
			console.error(err);
		}, () => {
			// gets the functions from storage refences the image storage in firebase by the children
			// gets the download url then sets the image from firebase as the value for the imgUrl key:
			storage.ref(fileURL).getDownloadURL().then((url) => {
				// console.log(url);
				setPrimaryImageURL(url);
			}).catch((error) => {
				// A full list of error codes is available at
				// https://firebase.google.com/docs/storage/web/handle-errors
				switch (error.code) {
				  case 'storage/object-not-found':
					// File doesn't exist
						break;
				  case 'storage/unauthorized':
					// User doesn't have permission to access the object
						break;
				  case 'storage/canceled':
					// User canceled the upload
						break;

				  // ...

				  case 'storage/unknown':
					// Unknown error occurred, inspect the server response
						break;
				}
			});
		});
	}

	onDelete(e) {
		e.preventDefault();
		const { cardID, setPrimaryImageURL, primaryImageURL } = this.props;
		const extension = primaryImageURL.match('\.(gif|jpe?g|tiff?|png|webp|bmp)+');
		const fileURL = `/images/${cardID}/primary.${extension[ 1 ]}`;
		storage.ref(fileURL).delete().then(() => {
			setPrimaryImageURL(null);
		}).catch((error) => {
			console.error(error);
		});
	}

	render() {
		const { primaryImageURL, primaryImageFormat, setPrimaryImageFormat } = this.props;
		return (
			<EditorSection className="images-editor" title="Images">
				<FormItem label="Primary Image">
					{!primaryImageURL ? (
						<input type="file" id="myFile" name="filename" onChange={this.onUpload} />
					) : (
						<Button
							className="p-button-danger"
							label="Remove"
							icon="pi pi-times" iconPos="left"
							onClick={this.onDelete}
						/>
					)}

					{/* <FileUpload
						name="splash"
						mode="basic"
						accept="image/*"
						auto
						customUpload
						uploadHandler={this.onUpload}
					/> */}
				</FormItem>
				<FormItem label="Image Format">
					<Dropdown
						value={primaryImageFormat}
						options={getFormValues(ImageFormats)}
						onChange={(e) => setPrimaryImageFormat(e.value)}
					/>
				</FormItem>
			</EditorSection>
		);
	}
}

export const ConnectedImagesEditor = connector(ImagesEditor);
