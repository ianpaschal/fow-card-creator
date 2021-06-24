import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { FirebaseUser } from '../../typing/FirebaseUser';

export interface AuthState {
	currentUserID: string | null;
}

export const initialState: AuthState = {
	currentUserID: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setCurrentUserID: (state: AuthState, action: PayloadAction<string>): AuthState => ({
			...state,
			currentUserID: action.payload,
		}),
	},
});

export const { actions, reducer } = authSlice;
