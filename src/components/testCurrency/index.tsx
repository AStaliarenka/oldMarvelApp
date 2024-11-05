import cssClasses from "./cssClasses"
import { getBemElementClass } from "../../helpers/common"
import { TestCurrencyProps } from "./@types"
import { useQuery } from "react-query"
import Spinner from "../spinner/Spinner"
import MarvelButton from "../marvelButton"

import "./style.scss"

const TestCurrency = ({currency, baseCurrency}: TestCurrencyProps) => {
	const currencyController = new AbortController()
	const failedView = <div>Request Failed</div>
	const currencyApiKey = process.env.REACT_APP_FREE_CURRENCY_API_KEY

	const getCurrencies = async () => {
		const URL = "https://api.freecurrencyapi.com/v1/latest"

		if (currencyApiKey) {
			const res = await fetch(
				`${URL}?apikey=${currencyApiKey}&currencies=${currency}&base_currency=${baseCurrency}`,
				{
					signal: currencyController.signal
				}
			)

			return res.json();
		}

		else throw new Error("You don`t have an API key, see REDME.md");		
	}

	const rubAmplificator = 100

	const {data, error, isLoading} = useQuery("currencies", getCurrencies)

	if (error) return failedView

	if (isLoading) return (
		<div className={cssClasses.name}>
			<Spinner/>
		</div>
	)

	const currencyValue = data.data[currency];

	if (typeof currencyValue !== "number") return failedView

	const currencyValueAfterTransform = (currencyValue * 100).toFixed(4)

	return (
		<div className={cssClasses.name}>
			<div className={getBemElementClass(cssClasses.name, cssClasses.elements.infoBlock)}>
				<div className={getBemElementClass(cssClasses.name, cssClasses.elements.firstCurrencyBlock)}>
					<span>{`${rubAmplificator} ${baseCurrency}`}</span>
				</div>
				<div className={getBemElementClass(cssClasses.name, cssClasses.elements.secondCurrencyBlock)}>
					<span>{currencyValueAfterTransform}</span>
					<span>{` ${currency}`}</span>
				</div>
			</div>
			<MarvelButton
				buttonStyle="main"
				onClickHandler={() => {
					currencyController.abort();
  					console.log("Canceled fetch");
				}}
				text="cancel fetch"
				type="button"
			/>
		</div>
	)
}

export default TestCurrency