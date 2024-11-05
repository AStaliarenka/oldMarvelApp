import { Objectvalues } from "../../helpers/common";

export const currencyNames = {
	dollar: "USD",
	euro: "EUR",
	russRubels: "RUB"
} as const

type Currency = Objectvalues<typeof currencyNames>

export type TestCurrencyProps = {baseCurrency: Currency, currency: Currency}