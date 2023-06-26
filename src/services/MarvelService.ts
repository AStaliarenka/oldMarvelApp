import keys from "./keys";

import { marvelAPI } from "./marvelApi";

import { useHttp } from "../hooks/http.hook";

import { Character} from "marvel-ts/dist/types";

import { character as myCharacter } from "../components/interfaces/character";

let _charactersTotal: number | undefined = 0;

class MarvelService {
	private _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	private _apiKeyParam = `apikey=${keys.public}`;
	private _charactersTotal: undefined | number;

	public getCharacterById = async (id: number) => {
		const res = await marvelAPI.getCharacterById(id);

		if (res.code === 200 && res.data?.results) {
			return this._transformCharacterData(res.data.results[0]);
		}
	}

	public getCharacters = async (offset: number = 210, limit?: number) => {
		const res = await marvelAPI.getCharacters({
			limit: limit ? limit : 9,
			offset
		});

		if (res.code === 200 && res.data?.results) {
			if (!this._charactersTotal) {
				this._charactersTotal = res.data.total;
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

	public get charactersTotalCount() {
		return this._charactersTotal ? this._charactersTotal : 0;
	}

	private _transformCharacterData(character: Character): myCharacter {
		return {
			name: character.name || 'Unknown hero',
			description: character.description || 'no description about character',
			thumbnail: character.thumbnail ? `${character.thumbnail.path}.${character.thumbnail.extension}` : '',
			homepage: character.urls ? (character.urls[0].url || '/#') : '/#',
			wiki: character.urls ? (character.urls[1].url || '/#') : '/#',
			comics: character.comics
		};
	}
}

const useMarvelService = () => {
	const {loading, requestFunc, error} = useHttp();

	const getCharacters = async (offset: number = 210, limit?: number) => {
		const func = marvelAPI.getCharacters;
		const res = await requestFunc(func, {offset, limit: limit ? limit : 9}) as Awaited<ReturnType<typeof func>>;

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
		getCharactersTotalCount
	}
}

export default MarvelService;

export {useMarvelService};
