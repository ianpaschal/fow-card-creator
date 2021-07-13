import React, { useEffect } from 'react';
import { UnitCardTile } from '../../general/UnitCardTile';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { fetchAllPublicCards } from '../../../store/cards/actions/fetchAllPublicCards';
import './BrowseView.scss';
import { Page } from '../../general/Page/Page';

export const BrowseView = () => {
	const dispatch = useDispatch();
	const cards = useSelector((state: RootState) => state.cards.public);
	useEffect(() => {
		dispatch(fetchAllPublicCards());
	});
	return (
		<Page className="browse-view">
			<h1>Browse</h1>
			<div className="browse-view__cards">
				{cards && cards.map((card, i) => (
					<UnitCardTile key={i} card={card} useFooter linkURL={`/card/${card.id}`} />
				))}
			</div>
		</Page>
	);
};
