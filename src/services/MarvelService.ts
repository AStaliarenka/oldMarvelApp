import keys from "./keys";

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

	public getCharacterById = (id: number) => {
		return this.getResource(`${this._apiBase}characters/${id}?${this._apiKeyParam}`);
	}
}

export default MarvelService;
