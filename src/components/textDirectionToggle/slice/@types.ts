export const TEXT_DIRECTION_VALUES = {
	rtl: "rightToLeft",
	ltr: "leftToRight"
} as const;

type ObjectValues<T> = T[keyof T];

export type textDirectionState = ObjectValues<typeof TEXT_DIRECTION_VALUES>;