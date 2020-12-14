// Copyright (c) 2020 Ian Paschal

import React from 'react';
import classNamesDedupe from 'classnames/dedupe';
import { Button } from 'primereact/button';
import { ConnectedGeneralEditor } from '../editor/GeneralEditor';
import { ConnectedMobilityEditor } from '../editor/MobilityEditor';
import { ConnectedCharacteristicsEditor } from '../editor/CharacteristicsEditor';
import { ConnectedWeaponsEditor } from '../editor/WeaponsEditor';
import { SelectButton } from 'primereact/selectbutton';
import './EditView.scss';
import { ConnectedSoftStatEditor } from '../editor/SoftStatEditor';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import { setBaseRatingActionCreator, addModifierActionCreator, updateModifierActionCreator, removeModifierActionCreator } from '../../store/editor/editorActionCreators';
import { Unit } from '../../typing/Unit';
import { CardFrontSVG } from '../print/CardFrontSVG';
import ReactDOMServer from 'react-dom/server';
import PDFKit from 'pdfkit';

const connector = connect(
	(state: RootState) => ({
		unit: state.editor.unit,
	}),
	(dispatch) => bindActionCreators({
		setBaseRating: setBaseRatingActionCreator,
		addModifier: addModifierActionCreator,
		updateModifier: updateModifierActionCreator,
		removeModifier: removeModifierActionCreator,
	}, dispatch),
);

export interface OwnProps {
	className?: string;
	onSave: (unit: Unit) => Promise<void>;
}

export type ReduxProps = ConnectedProps<typeof connector>;

export type EditViewProps = OwnProps & ReduxProps;

export interface EditViewState {
	view: 'editor' | 'split' | 'preview';
}

export class EditView extends React.Component<EditViewProps, EditViewState> {
	constructor(props: EditViewProps) {
		super(props);
		this.state = {
			view: 'split',
		};
		this.downloadSVG = this.downloadSVG.bind(this);
		this.downloadPDF = this.downloadPDF.bind(this);
	}

	downloadPDF(e) {
		e.preventDefault();

		const { unit } = this.props;
		const doc = new PDFKit();
		const chunks = [];
		const stream = doc.pipe({
			// writable stream implementation
			write: (chunk) => chunks.push(chunk),
			end: () => {
				const pdfBlob = new Blob(chunks, {
					type: 'application/octet-stream',
				});
				const blobUrl = URL.createObjectURL(pdfBlob);
				window.open(blobUrl);
			},
			// readable streaaam stub iplementation
			on: (event, action) => {},
			once: (...args) => {},
			emit: (...args) => {},
		});

		PDFKit.SVGtoPDF(doc, ReactDOMServer.renderToString(<CardFrontSVG unit={unit}/>), 0, 0);

		doc.end();
	};

	downloadSVG(e) {
		const { unit } = this.props;
		e.preventDefault();
		const plainText = ReactDOMServer.renderToString(<CardFrontSVG unit={unit}/>);
		console.log(plainText);

		const element = document.createElement('a');
		const file = new Blob([ plainText ], { type: 'text/plain;charset=utf-8' });
		element.href = URL.createObjectURL(file);
		element.download = 'my-unit-card.svg';
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	}

	render() {
		const { className, onSave, unit } = this.props;
		const { view } = this.state;
		return (
			<form className={classNamesDedupe('edit-view', className)} onSubmit={(e) => {
				e.preventDefault();
				onSave(unit);
			}}>
				<div className="edit-view__toolbar">
					<div className="edit-view__toolbar-section">
						<Button label="Save &amp; Close" icon="pi pi-arrow-left" iconPos="left"/>
						{/* <Button label="Duplicate"
					className="p-button-secondary p-button-outlined" /> */}
					</div>
					<div className="edit-view__toolbar-section">
						<SelectButton
							value={view}
							options={[
								{ label: 'Editor', value: 'editor' },
								{ label: 'Split', value: 'split' },
								{ label: 'Preview', value: 'preview' },
							]}
							onChange={(e) => {
								if (!e.value || e.value === view) {
									return;
								}
								this.setState({ view: e.value });
							}}
						></SelectButton>
					</div>
					<div className="edit-view__toolbar-section">
						<Button
							// className="p-disabled"
							label="Export SVG"
							icon="pi pi-download"
							iconPos="right"
							// tooltip="Coming soon!"
							tooltipOptions={{ position: 'bottom' }}
							onClick={this.downloadPDF}
						/>
					</div>
				</div>

				<div className="edit-view__main">
					{(view === 'editor' || view === 'split') && (
						<div className="edit-view__edit-pane">
							<ConnectedGeneralEditor/>
							<ConnectedCharacteristicsEditor/>
							<ConnectedSoftStatEditor/>
							<ConnectedMobilityEditor/>
							<ConnectedWeaponsEditor/>
						</div>
					)}
					{(view === 'preview' || view === 'split') && (
						<div className="edit-view__preview-pane">
							<CardFrontSVG unit={unit}/>
						</div>
					)}
				</div>
			</form>
		);
	}
}

export const ConnectedEditView = connector(EditView);
