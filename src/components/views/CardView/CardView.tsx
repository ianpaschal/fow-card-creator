import React from 'react';
import { Button } from 'primereact/button';
import './CardView.scss';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../../store';
import { UnitCardFrontSVG } from '../../card/UnitCardFront';
import { auth, db } from '../../../firebase';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { setUnitCardActionCreator } from '../../../store/editor/editorActionCreators';
import { UnitCard } from '../../../typing/UnitCard';
import { createUnitCardPDF } from '../../../utils/createUnitCardPDF';
import { UnitCardBackSVG } from '../../card/UnitCardBack';
import { DownloadCardButton } from '../../general/DownloadCardButton/DownloadCardButton';
import { Page } from '../../general/Page';

const connector = connect(
	(state: RootState) => ({
		currentUserID: state.auth.currentUserID,
		cardAuthorID: state.editor.unitCard.authorID,
	}),
	(dispatch: Dispatch) => bindActionCreators({
		setUnitCard: setUnitCardActionCreator,
	}, dispatch),
);

export type CardViewProps = ConnectedProps<typeof connector> & RouteComponentProps;

export class CardView extends React.Component<CardViewProps> {
	constructor(props: CardViewProps) {
		super(props);
		this.downloadPDF = this.downloadPDF.bind(this);
		this.loadCard = this.loadCard.bind(this);
		this.editCard = this.editCard.bind(this);
	}

	get cardID() {
		const { location } = this.props;
		return location.pathname.split('/')[ 2 ];
	}

	componentDidMount() {
		this.loadCard();
	}

	componentDidUpdate(prevProps: CardViewProps) {
		const locationChanged = this.props.location !== prevProps.location;
		if (locationChanged) {
			this.loadCard();
		}
	}

	async loadCard(): Promise<void> {
		const { setUnitCard } = this.props;
		const document = await db.collection('cards').doc(this.cardID).get();
		setUnitCard(document.data() as UnitCard);
	}

	downloadPDF(e: React.MouseEvent) {
		e.preventDefault();
		createUnitCardPDF();
	};

	editCard() {
		const { history } = this.props;
		history.push(`/edit/${this.cardID}`);
	}

	getToolbarItems() {

	}

	render() {
		const { currentUserID, cardAuthorID } = this.props;
		return (
			<Page className="card-view" toolbarItems={[
				...(currentUserID === cardAuthorID ? [
					<div key="edit-button">
						<Button
							className="p-button-success"
							label="Edit"
							icon="pi pi-pencil"
							iconPos="left"
							onClick={this.editCard}
						/>
					</div>,
				] : []),
				(<div key="download-button">
					<DownloadCardButton />
				</div>),
			]}>
				<UnitCardFrontSVG />
				<UnitCardBackSVG />
			</Page>
		);
	}
}

export const RoutedCardView = withRouter(CardView);

export const ConnectedCardView = connector(RoutedCardView);
