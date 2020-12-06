// Copyright (c) 2020 Ian Paschal

import React from 'react';
import classNamesDedupe from 'classnames/dedupe';
import { Button } from 'primereact/button';
import { ConnectedGeneralEditor } from '../editor/GeneralEditor';
import { ConnectedMobilityEditor } from '../editor/MobilityEditor';
import { ConnectedCharacteristicsEditor } from '../editor/CharacteristicsEditor';
import { ConnectedWeaponsEditor } from '../editor/WeaponsEditor';
import { ConnectedCardPreview } from '../CardPreview';
import { SelectButton } from 'primereact/selectbutton';
import './EditView.scss';
import { ConnectedSoftStatEditor } from '../editor/SoftStatEditor';
import { bindActionCreators } from '@reduxjs/toolkit';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import { setBaseRatingActionCreator, addModifierActionCreator, updateModifierActionCreator, removeModifierActionCreator } from '../../store/editor/editorActionCreators';
import { Unit } from '../../typing/Unit';
import { ConnectedPrintFront } from '../print/PrintFront';

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
							className="p-disabled"
							label="Export PDF"
							icon="pi pi-download"
							iconPos="right"
							tooltip="Coming soon!"
							tooltipOptions={{ position: 'bottom' }}/>
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
							<ConnectedPrintFront/>
							{/* <ConnectedCardPreview /> */}
						</div>
					)}
				</div>
			</form>
		);
	}
}

export const ConnectedEditView = connector(EditView);
