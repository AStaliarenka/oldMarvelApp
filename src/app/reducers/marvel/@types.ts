import { ModifiedComic, ModifiedCharacter } from "../../../services/MarvelService"

export type Comics = ModifiedComic[]

export type Characters = ModifiedCharacter[]

export type MarvelState = {
	comics: Comics | null,
	characters: Characters | null
}