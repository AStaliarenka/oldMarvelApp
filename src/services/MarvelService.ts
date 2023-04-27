const publicKey = '1d18ec33ec67fa73cd178c7411bdf75a';

class MarvelService {
	getResource = async (url: string) => {
		const res = await fetch(url);

		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`)
		}

		return res.json();
	}

	getAllCharacters = () => {
		return this.getResource(`https://gateway.marvel.com:443/v1/public/characters?apikey=${publicKey}`);
	}
}

export default MarvelService;
