import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { UnitCardTile } from '../../general/UnitCardTile';
import { fetchCardsByAuthorID } from '../../../store/cards/actions/fetchCardsByAuthorID';
import './MyCardsView.scss';
import { Page } from '../../general/Page';

export const MyCardsView = () => {
	const dispatch = useDispatch();
	const currentUserID = useSelector((state: RootState) => state.auth.currentUserID);
	const cards = useSelector((state: RootState) => state.cards.user);
	useEffect(() => {
		if (currentUserID && !cards) {
			dispatch(fetchCardsByAuthorID(currentUserID));
		}
	});
	return (
		<Page className="my-cards-view">
			<h1>My Cards</h1>
			<div className="my-cards-view__cards">
				{cards && cards.map((card, i) => (
					<UnitCardTile key={i} card={card} linkURL={`/edit/${card.id}`} />
				))}
			</div>
		</Page>
	);
};
