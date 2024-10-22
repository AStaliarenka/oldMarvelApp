import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { AuthState } from './@types';
// import { AuthState, AuthAction, AuthActionTypes } from './@types';

const initialState: AuthState = {
    isSignedIn: false,
    userId: null,
    error: null,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        userLoggedIn(state, action: PayloadAction<number>) {
            const userId = action.payload;
            
            state.isSignedIn = true;
            state.error = null;
            state.userId = userId;
        },
        userLoggedOut(state, action: PayloadAction<void>) {
            state.isSignedIn = false;
            state.error = null;
            state.userId = null;
        }
    }
});

const {actions, reducer} = authSlice;

export const {userLoggedIn, userLoggedOut} = actions;

export default reducer;
