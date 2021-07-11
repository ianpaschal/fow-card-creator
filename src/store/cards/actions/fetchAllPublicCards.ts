import { Dispatch } from '@reduxjs/toolkit';
import { db } from '../../../firebase';
import { UnitCard } from '../../../typing/UnitCard';
import { actions, FetchCardsCompletePayload } from '../cardsSlice';

export function fetchAllPublicCards() {
	return async (dispatch: Dispatch) => {
		dispatch(actions.fetchCardsStarted());
		const snapshot = await db.collection('cards').where('isPublic', '==', true).get();
		const payload: FetchCardsCompletePayload = {
			public: [...snapshot.docs.map((doc) => doc.data() as UnitCard)],
		};
		dispatch(actions.fetchCardsComplete(payload));
	};
};
