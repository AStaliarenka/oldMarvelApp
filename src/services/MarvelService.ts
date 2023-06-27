import { marvelAPI } from "./marvelApi";

import { useHttp } from "../hooks/http.hook";

import { Character} from "marvel-ts/dist/types";

import { character as myCharacter } from "../components/interfaces/character";

let _charactersTotal: number | undefined = 0;

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
		clearError
	}
}

export default useMarvelService;
