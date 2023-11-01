import { Reducer } from '@reduxjs/toolkit'

import { AuthState, AuthAction, AuthActionTypes } from './@types';

const userInitialState: AuthState = {
    isSignedIn: false,
    userId: null,
    error: null,
};

// PayloadAction<number, (typeof actions)[keyof typeof actions]>

export const authReducer: Reducer<AuthState, AuthAction> = (state = userInitialState, action) => {
    switch (action.type) {
        case AuthActionTypes.login:
            return {isSignedIn: true, userId: action.payload, error: null};
        case AuthActionTypes.logout:
            return {isSignedIn: false, userId: null, error: null};
        default:
            return {...state, error: 'Unexpected error on authReducer'};
    }
};
