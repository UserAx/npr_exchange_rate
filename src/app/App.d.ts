import { OptionI } from "../components/interfaces/Options"
import { ExchangeRateI } from "../actions/ExchangeRate"

export interface StateI {
    currencies: OptionI[],
    exchangedRates: ExchangeRateI[],
    error?: string,
    usdRate?: number,
}