export const TEXT_DIRECTION_VALUES = {
	rightToLeft: "rtl",
	leftToRight: "ltr"
} as const;

type ObjectValues<T> = T[keyof T];

export type textDirectionState = ObjectValues<typeof TEXT_DIRECTION_VALUES>;