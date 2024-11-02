import { createSlice } from "@reduxjs/toolkit";

import { PayloadAction } from "@reduxjs/toolkit";

import { ThemeState, THEME_VALUES } from "./@types";

const getTheme = () => {
	const theme = `${window?.localStorage?.getItem("theme")}`;

	if (theme === THEME_VALUES.dark || theme === THEME_VALUES.light) {
		return theme;
	}

	const userMedia = window.matchMedia("(prefers-color-scheme: light)");

	if (userMedia.matches) {
		return THEME_VALUES.light;
	}

	return THEME_VALUES.dark;
}

const initialState: ThemeState = getTheme();

export const themeSlice = createSlice({
	name: "theme",
	initialState,
	reducers: {
		set: (state, action: PayloadAction<ThemeState>) => action.payload,
	},
});

export const { set } = themeSlice.actions;

export default themeSlice.reducer;