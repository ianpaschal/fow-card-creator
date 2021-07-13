import React from 'react';
import { Button } from 'primereact/button';
import { ConnectedGeneralEditor } from '../../editor/GeneralEditor';
import { ConnectedMobilityEditor } from '../../editor/MobilityEditor';
import { ConnectedCharacteristicsEditor } from '../../editor/CharacteristicsEditor';
import { ConnectedWeaponsEditor } from '../../editor/WeaponsEditor';
import './EditView.scss';
import { ConnectedSoftStatEditor } from '../../editor/SoftStatEditor';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, store } from '../../../store';
import { UnitCardFrontSVG } from '../../card/UnitCardFront';
import { ConnectedArmorEditor } from '../../editor/ArmorEditor';
import { ConnectedSaveEditor } from '../../editor/SaveEditor';
import { auth, db } from '../../../firebase';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import {
	setIsPublicActionCreator,
	setUnitCardActionCreator,
} from '../../../store/editor/editorActionCreators';
import { UnitCard } from '../../../typing/UnitCard';
import { createUnitCardPDF } from '../../../utils/createUnitCardPDF';
import { ConnectedImagesEditor } from '../../editor/ImagesSection';
import { UnitCardBackSVG } from '../../card/UnitCardBack';
import { DownloadCardButton } from '../../general/DownloadCardButton/DownloadCardButton';
import { createDefaultUnitCard } from '../../../utils/createDefaultUnitCard';
import { SiteSettings } from '../../../SiteSettings';
import { SplitButton } from 'primereact/splitbutton';
import { Page } from '../../general/Page/Page';

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

export type EditViewProps = OwnProps & ConnectedProps<typeof connector> & RouteComponentProps;

export interface EditViewState {
	view: 'editor' | 'split' | 'preview';
	isPDFGenerating: boolean;
	windowWidth: number;
}

export class EditView extends React.Component<EditViewProps, EditViewState> {
	constructor(props: EditViewProps) {
		super(props);
		this.state = {
			windowWidth: window.innerWidth,
			view: window.innerWidth > 800 ? 'split' : 'editor',
			isPDFGenerating: false,
		};
		this.downloadPDF = this.downloadPDF.bind(this);
		this.loadCard = this.loadCard.bind(this);
		this.saveCard = this.saveCard.bind(this);
		this.createCard = this.createCard.bind(this);
		this.onWindowResize = this.onWindowResize.bind(this);
	}

	// TODO: Convert to useEffect hook?
	componentDidMount() {
		const { location } = this.props;
		const cardID = location.pathname.split('/')[ 2 ];
		if (cardID && auth.currentUser) {
			this.loadCard();
		} else {
			this.createCard();
		}
		window.addEventListener('resize', this.onWindowResize);
	}

	// TODO: Convert to useEffect hook?
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

	componentWillUnmount() {
		window.removeEventListener('resize', this.onWindowResize);
	}

	onWindowResize() {
		const { view } = this.state;
		this.setState({
			windowWidth: window.innerWidth,
			view: window.innerWidth < 800 && view === 'split' ? 'editor' : view,
		});
	}

	// TODO: Move to middleware?
	async createCard(): Promise<void> {
		const { setUnitCard } = this.props;
		if (!auth.currentUser) {
			return;
		}
		const ref = db.collection('cards').doc();
		setUnitCard({
			...createDefaultUnitCard(),
			authorID: auth.currentUser.uid,
			id: ref.id,
		});
	}

	// TODO: Move to middleware?
	async loadCard(): Promise<void> {
		const { location, setUnitCard } = this.props;
		const cardID = location.pathname.split('/')[ 2 ];
		if (!cardID || !auth.currentUser) {
			return;
		}
		const document = await db.collection('cards').doc(cardID).get();
		setUnitCard(document.data() as UnitCard);
	}

	// TODO: Move to middleware?
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
		history.push(SiteSettings.ROUTE_MY_CARDS);
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
		const { armor, save } = this.props;
		const { view, windowWidth } = this.state;
		return (
			<Page className="edit-view" toolbarItems={[
				<div key="save-close-button">
					<Button type="submit" label={windowWidth >= 720 ? 'Save & Close' : null} icon="pi pi-save" iconPos="left" />
				</div>,
				<div key="view-select-button">
					<SplitButton
						label={view[ 0 ].toUpperCase() + view.substring(1)}
						model={[
							{ label: 'Editor', value: 'editor', command: () => this.setState({ view: 'editor' }) },
							...(windowWidth >= 720 ? [{ label: 'Split', value: 'split', command: () => this.setState({ view: 'split' })  }] : []),
							{ label: 'Preview', value: 'preview', command: () => this.setState({ view: 'preview' })  },
						]}
					/>
				</div>,
				<div key="download-button">
					<DownloadCardButton />
				</div>,
			]}>
				{(view === 'editor' || view === 'split') && (
					<div className="edit-view__edit-pane">
						<form onSubmit={this.saveCard}>
							<ConnectedGeneralEditor />
							<ConnectedImagesEditor />
							<ConnectedCharacteristicsEditor />
							{armor && (
								<ConnectedArmorEditor />
							)}
							{save && (
								<ConnectedSaveEditor />
							)}
							<ConnectedSoftStatEditor />
							<ConnectedMobilityEditor />
							<ConnectedWeaponsEditor />
						</form>
					</div>
				)}
				{(view === 'preview' || view === 'split') && (
					<div className="edit-view__preview-pane">
						<UnitCardFrontSVG />
						<UnitCardBackSVG />
					</div>
				)}
			</Page>
		);
	}
}

export const ConnectedEditView = connector(withRouter(EditView));
