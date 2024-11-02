export const THEME_VALUES = {
	dark: "dark",
	light: "light"
} as const;

type ObjectValues<T> = T[keyof T];

export type ThemeState = ObjectValues<typeof THEME_VALUES>;