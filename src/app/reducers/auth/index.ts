import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

import { AuthState } from "./@types";
// import { AuthState, AuthAction, AuthActionTypes } from './@types';

const initialState: AuthState = {
	isSignedIn: false,
	roleId: null,
	username: null,
	error: null,
};

type UserData = {
	userId: number;
	username: string;
}

const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		userLoggedIn(state, action: PayloadAction<UserData>) {           
			state.isSignedIn = true;
			state.error = null;

			state.roleId = action.payload.userId; /* TODO: delete */
			state.username = action.payload.username;
		},
		userLoggedOut(state) {
			state.isSignedIn = false;
			state.error = null;

			state.roleId = null;
			state.username = null;
		}
	}
});

const {actions, reducer} = authSlice;

export const {userLoggedIn, userLoggedOut} = actions;

export default reducer;
