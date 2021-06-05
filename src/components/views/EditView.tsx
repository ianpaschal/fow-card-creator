/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import classNamesDedupe from 'classnames/dedupe';
import { Button } from 'primereact/button';
import { ConnectedGeneralEditor } from '../editor/GeneralEditor';
import { ConnectedMobilityEditor } from '../editor/MobilityEditor';
import { ConnectedCharacteristicsEditor } from '../editor/CharacteristicsEditor';
import { ConnectedWeaponsEditor } from '../editor/WeaponsEditor';
import { SelectButton } from 'primereact/selectbutton';
import './EditView.scss';
import { ConnectedSoftStatEditor } from '../editor/SoftStatEditor';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import { Unit } from '../../typing/Unit';
import { createUnitCardPDF } from '../../utils/createUnitCardPDF';
import { UnitCardFront } from '../card/UnitCardFront';
import { UnitCardBackSVG } from '../card/UnitCardBack';
import { ConnectedArmorEditor } from '../editor/ArmorEditor';
import { ConnectedSaveEditor } from '../editor/SaveEditor';

const connector = connect(
	(state: RootState) => ({
		unit: state.editor.unit,
	})
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
			view: window.innerWidth > 959 ? 'split' : 'preview',
		};
		this.downloadPDF = this.downloadPDF.bind(this);
	}

	downloadPDF(e: React.MouseEvent) {
		e.preventDefault();
		const { unit } = this.props;
		createUnitCardPDF(unit);
	};

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
						{/* <Button label="Duplicate" className="p-button-secondary p-button-outlined" /> */}
					</div>
					<div className="edit-view__toolbar-section">
						<SelectButton
							value={view}
							options={[
								{ label: 'Editor', value: 'editor' },
								...(window.innerWidth > 959 ? [{ label: 'Split', value: 'split' }] : []),
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
							label="Export PDF"
							icon="pi pi-download"
							iconPos="right"
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
							{unit.armor && (
								<ConnectedArmorEditor/>
							)}
							{unit.save && (
								<ConnectedSaveEditor/>
							)}
							<ConnectedSoftStatEditor/>
							<ConnectedMobilityEditor/>
							<ConnectedWeaponsEditor/>
						</div>
					)}
					{(view === 'preview' || view === 'split') && (
						<div className="edit-view__preview-pane">
							<UnitCardFront.SVG unit={unit} />
							<UnitCardBackSVG unit={unit} />
						</div>
					)}
				</div>
			</form>
		);
	}
}

export const ConnectedEditView = connector(EditView);
