// Copyright (c) 2020 Ian Paschal

import React from 'react';
import { Button } from 'primereact/button';
import './CardView.scss';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import { UnitCardFrontSVG } from '../card/UnitCardFront';
import { auth, db } from '../../firebase';
import { RouteComponentProps } from 'react-router';
import { withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from '@reduxjs/toolkit';
import { setUnitCardActionCreator } from '../../store/editor/editorActionCreators';
import { UnitCard } from '../../typing/UnitCard';
import { createUnitCardPDF } from '../../utils/createUnitCardPDF';
import { UnitCardBackSVG } from '../card/UnitCardBack';

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
		const userIDChanged = this.props.currentUserID !== prevProps.currentUserID;
		const locationChanged = this.props.location !== prevProps.location;
		if (userIDChanged || locationChanged) {
			this.loadCard();
		}
	}

	async loadCard(): Promise<void> {
		const { setUnitCard } = this.props;
		if (!auth.currentUser) {
			return;
		}
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

	render() {
		const { currentUserID, cardAuthorID } = this.props;
		return (
			<div className="card-view">
				<div className="card-view__toolbar">
					{(currentUserID === cardAuthorID) && (
						<div className="card-view__toolbar-section">
							<Button
								className="p-button-success"
								label="Edit"
								icon="pi pi-pencil"
								iconPos="left"
								onClick={this.editCard}
							/>
						</div>
					)}
					<div className="card-view__toolbar-section">
						<Button
							label="Export PDF"
							icon="pi pi-download"
							iconPos="right"
							onClick={this.downloadPDF}
						/>
					</div>
				</div>
				<div className="card-view__main">
					<UnitCardFrontSVG />
					<UnitCardBackSVG />
				</div>
			</div>
		);
	}
}

export const RoutedCardView = withRouter(CardView);

export const ConnectedCardView = connector(RoutedCardView);
