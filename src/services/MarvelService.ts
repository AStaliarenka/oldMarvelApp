import { marvelAPI } from "./marvelApi";

import { useHttp } from "../hooks/http.hook";

import { Character} from "marvel-ts/dist/types";

import { character as myCharacter } from "../components/interfaces/character";

import { Comic } from "marvel-ts/dist/types";

type EntityWithThumbnail = {
	thumbnail: string;
}

export type ComicsShortInfo = Pick<Comic, 'id' | 'title'> & EntityWithThumbnail;

let _charactersTotal: number | undefined = 0;
let _comicsTotal: number | undefined = 0;

const useMarvelService = () => {
	const {loading, requestFunc, error, clearError} = useHttp();

	const getCharacters = async (offset: number = 210, limit?: number) => {
		const func = marvelAPI.getCharacters;
		const res = await requestFunc(func.bind(marvelAPI), {offset, limit: limit ? limit : 9}) as Awaited<ReturnType<typeof func>>;

		if (res.code === 200 && res.data?.results) {
			if (!_charactersTotal) {
				_charactersTotal = res.data.total;
			}

			return res.data.results.map(character => {
				return {
					id: character.id,
					name: character.name,
					thumbnail: character.thumbnail ? `${character.thumbnail.path}.${character.thumbnail.extension}` : '',
				};
			});
		}
	}

	const getComics = async (offset: number = 210, limit?: number) => {
		const func = marvelAPI.getComics;

		const comicsLimit = 8;

		const res = await requestFunc(func.bind(marvelAPI), {offset, limit: limit ? limit : comicsLimit}) as Awaited<ReturnType<typeof func>>;

		if (res.code === 200 && res.data?.results) {
			if (!_comicsTotal) {
				_comicsTotal = res.data.total;
			}

			const resultArr: ComicsShortInfo[] = res.data.results.map(comic => {
				return {
					id: comic.id,
					title: comic.title,
					thumbnail: comic.thumbnail ? `${comic.thumbnail.path}.${comic.thumbnail.extension}` : '',
				};
			});

			return resultArr;
		}
	}

	const transformCharacterData = (character: Character): myCharacter => {
		return {
			name: character.name || 'Unknown hero',
			description: character.description || 'no description about character',
			thumbnail: character.thumbnail ? `${character.thumbnail.path}.${character.thumbnail.extension}` : '',
			homepage: character.urls ? (character.urls[0].url || '/#') : '/#',
			wiki: character.urls ? (character.urls[1].url || '/#') : '/#',
			comics: character.comics
		};
	}

	const getCharactersTotalCount = () => {
		return _charactersTotal ? _charactersTotal : 0;
	}

	const getComicsTotalCount = () => {
		return _comicsTotal ? _comicsTotal : 0;
	}

	const getCharacterById = async (id: number) => {
		const func = marvelAPI.getCharacterById;
		const res = await requestFunc(func.bind(marvelAPI), id) as Awaited<ReturnType<typeof func>>;

		if (res.data?.results) {
			return transformCharacterData(res.data.results[0]);
		}
	}

	return {
		loading,
		error,
		getCharacterById,
		getCharacters,
		getCharactersTotalCount,
		clearError,
		getComics,
		getComicsTotalCount
	}
}

export default useMarvelService;
