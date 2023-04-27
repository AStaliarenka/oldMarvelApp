import keys from "./keys";

class MarvelService {
	getResource = async (url: string) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`)
		}

		return res.json();
	}

	getAllCharacters = () => {
		return this.getResource(`https://gateway.marvel.com:443/v1/public/characters?apikey=${keys.public}`);
	}
}

export default MarvelService;
