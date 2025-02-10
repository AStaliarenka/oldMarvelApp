import { configureStore} from "@reduxjs/toolkit";

import authReducer from "../reducers/auth";
import themeReducer from "../../components/theme/slice";
import marvelReducer from "../reducers/marvel";
import textDirectionReducer from "../../components/textDirectionToggle/slice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		theme: themeReducer,
		marvel: marvelReducer,
		textDirection: textDirectionReducer
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;