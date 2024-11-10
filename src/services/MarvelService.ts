import { marvelAPI } from "./marvelApi";
import { useHttp } from "../hooks/http.hook";
import { Character} from "marvel-ts/dist/types";
import { character as myCharacter } from "../components/interfaces/character";
import { ComicParameters, CharacterParameters, Comic } from "marvel-ts/dist/types";
import { useCallback } from "react";

// import { Comic } from "marvel-ts/dist/types";

// type EntityWithThumbnail = {
// 	thumbnail: string;
// }

// export type ComicsShortInfo = Pick<Comic, 'id' | 'title' | 'description' | 'textObjects'> & EntityWithThumbnail;

export type ModifiedComic = {
	id: number;
	title: string;
	language: string;
	description: string;
	price: string;
	pageCount: number | string;
	thumbnail: string;
}

let _charactersTotal: number | undefined = 0;
let _comicsTotal: number | undefined = 0;

const useMarvelService = () => {
	const {loading, requestFunc, error, clearError, process, setProcess, processNames} = useHttp();

	const getCharacters = useCallback(async (offset: number = 210, limit?: number) => {
		const func = marvelAPI.getCharacters;

		const params: CharacterParameters = {offset, limit: limit ? limit : 9};
		const res = await requestFunc(func.bind(marvelAPI), params);

		if (res?.code === 200 && res.data?.results) {
			if (!_charactersTotal) {
				_charactersTotal = res.data.total;
			}

			return res.data.results.map(character => {
				return {
					id: character.id,
					name: character.name,
					thumbnail: character.thumbnail ? `${character.thumbnail.path}.${character.thumbnail.extension}` : "",
				};
			});
		} else return null;
	}, [requestFunc]);

	function transformComicData(comic: Comic) {
		return {
			id: comic.id || 0,
			title: comic.title || "unknown",
			thumbnail: comic.thumbnail ? `${comic.thumbnail.path}.${comic.thumbnail.extension}` : "",
			language: (comic.textObjects?.length && comic.textObjects[0].language) ? comic.textObjects[0].language : "unknown", /* TODO: lang list*/
			description: comic.description ? comic.description : "No description",
			price: (comic.prices?.length && comic.prices[0].price) ? String(comic.prices[0].price) : "unknown price",
			pageCount: comic.pageCount ? comic.pageCount : "unknown"
		};
	}

	const getComicById = useCallback(async (comicId: number) => {
		const func = marvelAPI.getComicById;

		const res = await requestFunc(func.bind(marvelAPI), comicId);

		if (res?.code === 200 && res.data?.results) {
			return transformComicData(res.data?.results[0]);
		} else return null;
	}, [requestFunc]);

	const getComics = useCallback(async (offset: number = 210, limit?: number) => {
		const func = marvelAPI.getComics;

		const comicsLimit = 8;

		const params: ComicParameters = {offset, limit: limit ? limit : comicsLimit, issueNumber: 1};

		const res = await requestFunc(func.bind(marvelAPI), params);

		if (res?.code === 200 && res.data?.results) {
			if (!_comicsTotal) {
				_comicsTotal = res.data.total;
			}

			const resultArr: ModifiedComic[] = res.data.results.map(comic => {
				return transformComicData(comic);
			});

			return resultArr;
		} else return null;
	}, [requestFunc]);

	const transformCharacterData = (character: Character): myCharacter => {
		return {
			name: character.name || "Unknown hero",
			description: character.description || "no description about character",
			thumbnail: character.thumbnail ? `${character.thumbnail.path}.${character.thumbnail.extension}` : "",
			homepage: character.urls ? (character.urls[0].url || "/#") : "/#",
			wiki: character.urls ? (character.urls[1].url || "/#") : "/#",
			comics: character.comics
		};
	}

	const getCharactersTotalCount = () => {
		return _charactersTotal ? _charactersTotal : 0;
	}

	const getComicsTotalCount = () => {
		return _comicsTotal ? _comicsTotal : 0;
	}

	const getCharacterById = useCallback(async (id: number) => {
		const func = marvelAPI.getCharacterById;

		const res = await requestFunc(func.bind(marvelAPI), id);
		/* TODO: res can be undefined, something interesting */

		if (res?.data?.results) {
			return transformCharacterData(res.data.results[0]);
		}
		else return null;
	}, [requestFunc]);

	return {
		loading,
		error,
		getCharacterById,
		getCharacters,
		getCharactersTotalCount,
		clearError,
		getComics,
		getComicById,
		getComicsTotalCount,
		process,
		processNames,
		setProcess
	}
}

export default useMarvelService;
