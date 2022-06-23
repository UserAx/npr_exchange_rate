import { ExchangedRateI } from "./ExchangeRate";
export const FETCH_CURRENCIES = "FETCH_CURRENCIES";
export const FETCH_USD_RATE = "FETCH_USD_RATE";
export const FETCH_EXCHANGED_RATE = "FETCH_EXCHANGED_RATE";
export const RESET_EXCHANGED_RATES = "RESET_EXCHANGED_RATES";


export const FETCH_CURRENCIES_ERROR = "FETCH_CURRENCIES_ERROR";
export const FETCH_USD_RATE_ERROR = "FETCH_USD_RATE_ERROR";
export const FETCH_EXCHANGED_RATE_ERROR = "FETCH_EXCHANGED_RATE_ERROR";

type error = string;

interface fetchCurrencies {
    type: typeof FETCH_CURRENCIES,
    payload: any
}

interface fetchUsdRate {
    type: typeof FETCH_USD_RATE,
    payload: number
}

interface fetchExchangedRate {
    type: typeof FETCH_EXCHANGED_RATE,
    payload: ExchangedRateI
}

interface resetExchangedRates {
    type: typeof RESET_EXCHANGED_RATES,
    payload: any[]
}

interface fetchCurrenciesError {
    type: typeof FETCH_CURRENCIES_ERROR,
    payload: error
}

interface fetchExchangedRateError {
    type: typeof FETCH_EXCHANGED_RATE_ERROR,
    payload: error
}

interface fetchUsdRateError {
    type: typeof FETCH_USD_RATE_ERROR,
    payload: error
}

export type DispatchTypes = fetchCurrencies | fetchCurrenciesError | fetchExchangedRate | fetchExchangedRateError | fetchUsdRate | fetchUsdRateError | resetExchangedRates;