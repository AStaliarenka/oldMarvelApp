import keys from "./keys";

import { marvelAPI } from "./marvelApi";

import { Character } from "marvel-ts/dist/types";

class MarvelService {
	private _apiBase = 'https://gateway.marvel.com:443/v1/public/';
	private _apiKeyParam = `apikey=${keys.public}`;

	public getResource = async (url: string) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`)
		}

		return res.json();
	}

	public getAllCharacters = (additionalParams?: {limit?: number, offset?: number}) => {
		let url = `${this._apiBase}characters?${this._apiKeyParam}`;

		if (additionalParams) {
			const keys = Object.keys(additionalParams) as Array<keyof typeof additionalParams>;

			if (keys.length) {
				keys.forEach((key) => {
					url += `&${key}=${additionalParams[key]}`;
				});
			}
		}

		return this.getResource(url);
	}

	public getCharacterById = async (id: number) => {
		const res = await marvelAPI.getCharacterById(id);

		if (res.code === 200 && res.data?.results) {
			return this._transformCharacterData(res.data.results[0]);
		}
	}

	public getCharacters = async (offset: number) => {
		const res = await marvelAPI.getCharacters({
			limit: 9,
			offset
		});

		if (res.code === 200 && res.data?.results) {
			return res.data.results.map(character => {
				return {
					id: character.id,
					name: character.name,
					thumbnail: character.thumbnail ? `${character.thumbnail.path}.${character.thumbnail.extension}` : '',
				};
			});
		}
	}

	private _transformCharacterData(character: Character) {
		return {
			name: character.name,
			description: character.description || 'no description about character',
			thumbnail: character.thumbnail ? `${character.thumbnail.path}.${character.thumbnail.extension}` : '',
			homepage: character.urls ? (character.urls[0].url || '/#') : '/#',
			wiki: character.urls ? (character.urls[1].url || '/#') : '/#',
		};
	}
}

export default MarvelService;
