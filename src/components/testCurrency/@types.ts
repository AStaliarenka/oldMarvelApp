import { Currency } from "../../services/freecurrencyService"

export type TestCurrencyContainerProps = {
	children: React.ReactNode
}

export type TestCurrencyProps = {
	baseCurrency: Currency,
	currency: Currency
}