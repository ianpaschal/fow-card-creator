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
import { connect, ConnectedProps } from 'react-redux';
import { RootState, store } from '../../store';
import { UnitCardFrontSVG } from '../card/UnitCardFront';
import { ConnectedArmorEditor } from '../editor/ArmorEditor';
import { ConnectedSaveEditor } from '../editor/SaveEditor';
import { auth, db } from '../../firebase';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import {
	setIsPublicActionCreator,
	setUnitCardActionCreator,
} from '../../store/editor/editorActionCreators';
import { UnitCard } from '../../typing/UnitCard';
import { createUnitCardPDF } from '../../utils/createUnitCardPDF';
import { ConnectedImagesEditor } from '../editor/ImagesSection';
import { defaultUnitCard } from '../../store/editor/defaultUnitCard';
import { UnitCardBackSVG } from '../card/UnitCardBack';
import { DownloadCardButton } from '../DownloadCardButton/DownloadCardButton';

const connector = connect(
	(state: RootState) => ({
		armor: !!(state.editor.unitCard.unit.armor),
		save: !!(state.editor.unitCard.unit.save),
		currentUserID: state.auth.currentUserID,
		isPublic: state.editor.unitCard.isPublic,
	}),
	(dispatch: Dispatch) => bindActionCreators({
		setUnitCard: setUnitCardActionCreator,
		setIsPublic: setIsPublicActionCreator,
	}, dispatch),
);

export interface OwnProps {
	className?: string;
}

export type ReduxProps = ConnectedProps<typeof connector>;

export type EditViewProps = OwnProps & ReduxProps & RouteComponentProps;

export interface EditViewState {
	view: 'editor' | 'split' | 'preview';
	isPDFGenerating: boolean;
}

export class EditView extends React.Component<EditViewProps, EditViewState> {
	constructor(props: EditViewProps) {
		super(props);
		this.state = {
			view: window.innerWidth > 800 ? 'split' : 'preview',
			isPDFGenerating: false,
		};
		this.downloadPDF = this.downloadPDF.bind(this);
		this.loadCard = this.loadCard.bind(this);
		this.saveCard = this.saveCard.bind(this);
		this.createCard = this.createCard.bind(this);
	}

	componentDidMount() {
		const { location } = this.props;
		const cardID = location.pathname.split('/')[ 2 ];
		if (cardID && auth.currentUser) {
			this.loadCard();
		} else {
			this.createCard();
		}
	}

	componentDidUpdate(prevProps: EditViewProps) {
		if (this.props.currentUserID !== prevProps.currentUserID) {
			const cardID = location.pathname.split('/')[ 2 ];
			if (cardID && auth.currentUser) {
				this.loadCard();
			} else {
				this.createCard();
			}
		}
		if (this.props.location !== prevProps.location) {
			const cardID = location.pathname.split('/')[ 2 ];
			if (cardID && auth.currentUser) {
				this.loadCard();
			} else {
				this.createCard();
			}
		}
	}

	async createCard(): Promise<void> {
		const { setUnitCard } = this.props;
		if (!auth.currentUser) {
			return;
		}
		const ref = db.collection('cards').doc();
		setUnitCard({
			...defaultUnitCard,
			authorID: auth.currentUser.uid,
			id: ref.id,
		});
	  }

	async loadCard(): Promise<void> {
		const { location, setUnitCard } = this.props;
		const cardID = location.pathname.split('/')[ 2 ];
		if (!cardID || !auth.currentUser) {
			return;
		}
		const document = await db.collection('cards').doc(cardID).get();
		setUnitCard(document.data() as UnitCard);
	}

	async saveCard(e: React.FormEvent<HTMLFormElement>): Promise<void> {
		e.preventDefault();
		const { history, currentUserID } = this.props;
		if (!auth.currentUser) {
			return;
		}
		const data: UnitCard = {
			...store.getState().editor.unitCard,
			authorID: currentUserID,
		};
		await db.collection('cards').doc(data.id).set(data);
		history.push('/mycards');
	}

	downloadPDF(e: React.MouseEvent) {
		e.preventDefault();
		this.setState({
			isPDFGenerating: true,
		}, () => {
			createUnitCardPDF(() => {
				this.setState({
					isPDFGenerating: false,
				});
			});
		});
	};

	// eslint-disable-next-line complexity
	render() {
		const { className, armor, save } = this.props;
		const { view } = this.state;
		return (
			<form className={classNamesDedupe('edit-view', className)} onSubmit={this.saveCard}>

				<div className="edit-view__toolbar">
					<div className="edit-view__toolbar-section">
						<Button type="submit" label="Save &amp; Close" icon="pi pi-arrow-left" iconPos="left"/>
					</div>
					{/* <div className="edit-view__toolbar-section">
						<Button label="Duplicate" className="p-button-secondary p-button-outlined" />
					</div> */}

					<div className="edit-view__toolbar-section">
						<SelectButton
							value={view}
							options={[
								{ label: 'Editor', value: 'editor' },
								...(window.innerWidth > 800 ? [{ label: 'Split', value: 'split' }] : []),
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
						<DownloadCardButton />
					</div>
				</div>
				<div className="edit-view__main">
					{(view === 'editor' || view === 'split') && (
						<div className="edit-view__edit-pane">
							<ConnectedGeneralEditor/>
							<ConnectedImagesEditor/>
							<ConnectedCharacteristicsEditor/>
							{armor && (
								<ConnectedArmorEditor/>
							)}
							{save && (
								<ConnectedSaveEditor/>
							)}
							<ConnectedSoftStatEditor/>
							<ConnectedMobilityEditor/>
							<ConnectedWeaponsEditor/>
						</div>
					)}
					{(view === 'preview' || view === 'split') && (
						<div className="edit-view__preview-pane">
							<UnitCardFrontSVG />
							<UnitCardBackSVG />
						</div>
					)}
				</div>
			</form>
		);
	}
}

export const ConnectedEditView = connector(withRouter(EditView));
