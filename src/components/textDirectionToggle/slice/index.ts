import { createSlice } from "@reduxjs/toolkit"
import { PayloadAction } from "@reduxjs/toolkit"

import { textDirectionState } from "./@types"

const getTextDirection = ():textDirectionState  => {
	// TODO: get from localstorage
	return "ltr"
}

const initialState: textDirectionState = getTextDirection()

export const textDirectionSlice = createSlice({
	name: "textDirectionToggle",
	initialState,
	reducers: {
		setTextDirection: (state, action: PayloadAction<textDirectionState>) => action.payload,
	},
})

export const { setTextDirection } = textDirectionSlice.actions

export default textDirectionSlice.reducer