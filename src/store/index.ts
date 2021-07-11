import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';

import { reducer as auth } from './auth/authSlice';
import { reducer as cards }from './cards/cardsSlice';
import { reducer as editor } from './editor/editorSlice';

export const rootReducer = combineReducers({
	auth,
	cards,
	editor,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
	reducer: rootReducer,
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
});
