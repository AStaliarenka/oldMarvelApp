import { Objectvalues } from "../../helpers/common";

export const currencyNames = {
	dollar: "USD",
	euro: "EUR",
	russRubels: "RUB"
} as const

type Currency = Objectvalues<typeof currencyNames>

export type TestCurrencyContainerProps = {
	children: React.ReactNode
}

export type TestCurrencyProps = {
	baseCurrency: Currency,
	currency: Currency
}