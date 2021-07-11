import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UnitCard } from '../../typing/UnitCard';

export interface FetchCardsCompletePayload {
	public?: UnitCard[];
	user?: UnitCard[];
	errors?: any[];
}

export interface CardsState {
	public: UnitCard[];
	user: UnitCard[];
	request: {
		isPending: boolean;
		errors: any[];
	},
}

export const initialState: CardsState = {
	public: null,
	user: null,
	request: {
		isPending: null,
		errors: [],
	},
};

export const editorSlice = createSlice({
	name: 'cards',
	initialState,
	reducers: {
		fetchCardsStarted: (state: CardsState): CardsState => ({
			...state,
			request: {
				...state.request,
				isPending: true,
			},
		}),
		fetchCardsComplete: (state: CardsState, action: PayloadAction<FetchCardsCompletePayload>): CardsState => ({
			...state,
			public: action.payload.public || state.public,
			user: action.payload.user || state.user,
			request: {
				isPending: false,
				errors: action.payload.errors || state.request.errors,
			},
		}),
	},
});

export const { actions, reducer } = editorSlice;
