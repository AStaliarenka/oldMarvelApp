import cssClasses from "./cssClasses"
import { getBemElementClass } from "../../helpers/common"
import { TestCurrencyProps, TestCurrencyContainerProps } from "./@types"
import { useQuery, useQueryClient } from "react-query"
import Spinner from "../spinner/Spinner"
import MarvelButton from "../marvelButton"
import { useDidMount } from "../../helpers/common"

import "./style.scss"

const TestCurrencyContainer = ({children}: TestCurrencyContainerProps) => {
	return <div className={cssClasses.name}>{children}</div>
}

const TestCurrency = ({currency, baseCurrency}: TestCurrencyProps) => {
	const failedView = <div>Request Failed</div>
	const currencyApiKey = process.env.REACT_APP_FREE_CURRENCY_API_KEY

	const CURRENCY_QUERY_NAME = "currencies"
	const RUB_AMPLIFICATOR = 100

	const queryClient = useQueryClient()

	const {data, error, isLoading, refetch} = useQuery(CURRENCY_QUERY_NAME, async ({signal}) => {
		const URL = "https://api.freecurrencyapi.com/v1/latest"

		if (currencyApiKey) {
			const res = await fetch(
				`${URL}?apikey=${currencyApiKey}&currencies=${currency}&base_currency=${baseCurrency}`,
				{
					signal
				}
			)

			return res.json()
		}

		else throw new Error("You don`t have an API key, see README.md")
	})

	useDidMount(() => {
		return () => {
			queryClient.cancelQueries(CURRENCY_QUERY_NAME)
			console.log("Unmount testCurrency")
		}
	})

	if (error) return <TestCurrencyContainer children={failedView}/>

	if (isLoading) return <TestCurrencyContainer children={<Spinner/>}/>

	const currencyValue = data?.data?.[currency]

	if (typeof currencyValue !== "number") return <TestCurrencyContainer children={failedView}/>

	const currencyValueAfterTransform = (currencyValue * 100).toFixed(4)

	return (
		<TestCurrencyContainer>
			<div className={getBemElementClass(cssClasses.name, cssClasses.elements.infoBlock)}>
				<div className={getBemElementClass(cssClasses.name, cssClasses.elements.firstCurrencyBlock)}>
					<span>{`${RUB_AMPLIFICATOR} ${baseCurrency}`}</span>
				</div>
				<div className={getBemElementClass(cssClasses.name, cssClasses.elements.secondCurrencyBlock)}>
					<span>{currencyValueAfterTransform}</span>
					<span>{` ${currency}`}</span>
				</div>
			</div>
			<MarvelButton
				buttonStyle="main"
				onClickHandler={() => {
					queryClient.cancelQueries(CURRENCY_QUERY_NAME)
					console.log("Canceled fetch")
				}}
				text="cancel fetch"
				type="button"
			/>
			<MarvelButton
				buttonStyle="secondary"
				onClickHandler={() => {
					refetch()
					console.log("Refetch")
				}}
				text="update"
				type="button"
			/>
		</TestCurrencyContainer>
	)
}

export default TestCurrency