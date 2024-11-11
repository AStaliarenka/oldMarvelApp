import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Characters, Comics, MarvelState } from "./@types"

const initialState: MarvelState = {
	comics: null,
	characters: null
}

export const marvelSlice = createSlice({
	name: "startComicsAndCharacters",
	initialState,
	reducers: {
		setStartComicsPack: (state, action: PayloadAction<Comics>) => {
			state.comics = action.payload
		},
		setStartCharactersPack: (state, action: PayloadAction<Characters>) => {
			state.characters = action.payload
		}
	}
})

export const {setStartCharactersPack, setStartComicsPack} = marvelSlice.actions

export default marvelSlice.reducer