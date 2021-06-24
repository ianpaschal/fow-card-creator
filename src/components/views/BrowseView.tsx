import React from 'react';
import { UnitCard } from '../../typing/UnitCard';
import { db } from '../../firebase';
import { Card } from 'primereact/card';
import './BrowseView.scss';
import { Link } from 'react-router-dom';

export interface BrowseViewProps {
}

export interface BrowseViewState {
	cards: UnitCard[]
}

export class BrowseView extends React.Component<BrowseViewProps, BrowseViewState> {
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
		console.log(documents);
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
						<Link key={i} to={`/card/${card.id}`}>
							<Card style={{
								backgroundColor: card.unit.accentColor,
							}}>
								{card?.unit?.title || 'Untitled'}
							</Card>
						</Link>
					))}
				</div>
			</div>
		);
	}
}
