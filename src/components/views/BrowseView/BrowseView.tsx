import React from 'react';
import { UnitCard } from '../../../typing/UnitCard';
import { db } from '../../../firebase';
import './BrowseView.scss';
import { UnitCardTile } from '../../general/UnitCardTile';

export interface BrowseViewState {
	cards: UnitCard[]
}

export class BrowseView extends React.Component<{}, BrowseViewState> {
	constructor(props: BrowseView) {
		super(props);
		this.state = {
			cards: [],
		};
		this.loadPublicCards = this.loadPublicCards.bind(this);

		this.loadPublicCards();
	}

	async loadPublicCards(): Promise<void> {
		const documents = await db.collection('cards').where('isPublic', '==', true).get();
		const cards = [];
		documents.forEach((doc) => {
			cards.push({
				...(doc.data()),
				id: doc.id,
			});
		});
		this.setState({ cards });
	}

	render() {
		const { cards } = this.state;
		return (
			<div className="browse-view">
				<h1>Browse</h1>
				<div className="browse-view__cards">
					{cards.map((card, i) => (
						<UnitCardTile key={i} card={card} useFooter linkURL={`/card/${card.id}`} />
					))}
				</div>
			</div>
		);
	}
}
