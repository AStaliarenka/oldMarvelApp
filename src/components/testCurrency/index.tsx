import cssClasses from "./cssClasses"
import { getBemElementClass } from "../../helpers/common"
import { TestCurrencyProps, TestCurrencyContainerProps } from "./@types"
import { useQueryClient, useQuery } from "@tanstack/react-query"
import Spinner from "../spinner/Spinner"
import MarvelButton from "../marvelButton"
import { useDidMount } from "../../helpers/common"
import useFreeCurrencyService, {currencyNames} from "../../services/freecurrencyService"

import "./style.scss"

const TestCurrencyContainer = ({children}: TestCurrencyContainerProps) => {
	return <div className={cssClasses.name}>{children}</div>
}

const TestCurrency = ({currency, baseCurrency}: TestCurrencyProps) => {
	const {getCurrency} = useFreeCurrencyService(); 
	const failedView = <div>Request Failed</div>

	const CURRENCY_QUERY_NAME = "currencies"
	const RUB_AMPLIFICATOR = 100

	const queryClient = useQueryClient()

	// isLoading - only for first query, after refetch you need to use isFetching (it depends)
	const {data, isError, isLoading, refetch} = useQuery({queryKey: [CURRENCY_QUERY_NAME], queryFn:
		async ({signal}) => {
			return getCurrency(currency, baseCurrency, signal)
		}
	})

	useDidMount(() => {
		return () => {
			queryClient.cancelQueries({queryKey: [CURRENCY_QUERY_NAME]})
			console.log("Unmount testCurrency")
		}
	})

	if (isError) {
		return <TestCurrencyContainer>{failedView}</TestCurrencyContainer>
	}

	if (isLoading) {
		return <TestCurrencyContainer>{<Spinner/>}</TestCurrencyContainer>
	}

	const currencyValue = data?.data[currency]

	if (typeof currencyValue !== "number") {
		return <TestCurrencyContainer>{failedView}</TestCurrencyContainer>
	}

	return (
		<TestCurrencyContainer>
			<div className={getBemElementClass(cssClasses.name, cssClasses.elements.infoBlock)}>
				<div className={getBemElementClass(cssClasses.name, cssClasses.elements.firstCurrencyBlock)}>
					<span>{`${RUB_AMPLIFICATOR} ${baseCurrency}`}</span>
				</div>
				<div className={getBemElementClass(cssClasses.name, cssClasses.elements.secondCurrencyBlock)}>
					<span>
						{baseCurrency === currencyNames.russRubels ? (currencyValue * RUB_AMPLIFICATOR).toFixed(4) : currencyValue}
					</span>
					<span>{` ${currency}`}</span>
				</div>
			</div>
			<MarvelButton
				buttonStyle="main"
				onClickHandler={() => {
					queryClient.cancelQueries({queryKey: [CURRENCY_QUERY_NAME]})
					console.log("Canceled fetch")
				}}
				text="cancel fetch"
				type="button"
			/>
			<MarvelButton
				buttonStyle="secondary"
				onClickHandler={() => {
					refetch()
					// queryClient.invalidateQueries({
					// 	queryKey: [CURRENCY_QUERY_NAME],
					// 	refetchType: "all"
					// })
					console.log("Refetch")
				}}
				text="update"
				type="button"
			/>
		</TestCurrencyContainer>
	)
}

export default TestCurrency