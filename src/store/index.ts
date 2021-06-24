import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';

import { reducer as auth } from './auth/authSlice';
import { reducer as editor } from './editor/editorSlice';

export const rootReducer = combineReducers({
	auth,
	editor,
});

export type RootState = ReturnType<typeof rootReducer>;

export const store = configureStore({
	reducer: rootReducer,
	// Disable RTK's serializable check:
	// https://github.co/rt2zz/redux-persist/issues/988
	middleware: getDefaultMiddleware({
		serializableCheck: false,
	}),
});
