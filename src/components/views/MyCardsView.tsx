import React from 'react';
import { UnitCard } from '../../typing/UnitCard';
import { db } from '../../firebase';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../../store';
import './MyCardsView.scss';
import { UnitCardTile } from '../UnitCardTile/UnitCardTile';

export interface MyCardsViewState {
	cards: UnitCard[];
}

const connector = connect(
	(state: RootState) => ({
		currentUserID: state.auth.currentUserID,
	})
);

export type MyCardsViewProps = ConnectedProps<typeof connector>;

export class MyCardsView extends React.Component<MyCardsViewProps, MyCardsViewState> {
	constructor(props: MyCardsViewProps) {
		super(props);
		this.state = {
			cards: [],
		};
		this.loadMyCards = this.loadMyCards.bind(this);
	}

	componentDidMount() {
		this.loadMyCards();
	}

	componentDidUpdate(prevProps: MyCardsViewProps) {
		if (this.props.currentUserID !== prevProps.currentUserID) {
			this.loadMyCards();
		}
	}

	async loadMyCards(): Promise<void> {
		const { currentUserID } = this.props;
		if (!currentUserID) {
			return;
		}
		const documents = await db.collection('cards').where('authorID', '==', currentUserID).get();
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
			<div className="my-cards-view">
				<h1>My Cards</h1>
				<div className="my-cards-view__cards">
					{cards.map((card, i) => (
						<UnitCardTile key={i} card={card} linkURL={`/edit/${card.id}`} />
					))}
				</div>
			</div>
		);
	}
}

export const ConnectedMyCardsView = connector(MyCardsView);
