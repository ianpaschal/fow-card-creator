import { createAction, Dispatch } from '@reduxjs/toolkit';
import { actions } from './authSlice';

export const setCurrentUserID = (userID: string) => (dispatch: Dispatch) => {
	dispatch(actions.setCurrentUserID(userID));
};
