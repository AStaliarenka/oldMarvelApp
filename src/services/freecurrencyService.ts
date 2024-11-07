import { Objectvalues } from "../helpers/common"

export const currencyNames = {
	dollar: "USD",
	euro: "EUR",
	russRubels: "RUB"
} as const

export type Currency = Objectvalues<typeof currencyNames>

type currencyAnswerData = {[currencyNames.dollar]?: number, [currencyNames.russRubels]?: number, [currencyNames.euro]?: number}

type currencyAnswer = {data: currencyAnswerData}

const useFreeCurrencyService = () => {
	const URL = "https://api.freecurrencyapi.com/v1/latest"
	const currencyApiKey = process.env.REACT_APP_FREE_CURRENCY_API_KEY

	const getCurrency = async (currency: Currency, baseCurrency: Currency, signal: AbortSignal) => {
		if (currencyApiKey) {
			const res = await fetch(
				`${URL}?apikey=${currencyApiKey}&currencies=${currency}&base_currency=${baseCurrency}`,
				{
					signal
				}
			)

			return res.json() as unknown as Promise<Awaited<currencyAnswer>>
		}
		else throw new Error("You don`t have an API key, see README.md")
	}

	return {
		getCurrency
	}
}

export default useFreeCurrencyService