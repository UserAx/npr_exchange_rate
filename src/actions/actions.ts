import {
    DispatchTypes,
    FETCH_CURRENCIES,
    FETCH_CURRENCIES_ERROR,
    FETCH_EXCHANGED_RATE,
    FETCH_EXCHANGED_RATE_ERROR,
    FETCH_USD_RATE,
    FETCH_USD_RATE_ERROR,
    RESET_EXCHANGED_RATES
} from './ActionTypes';
import { generateAxiosInstance } from '../utils/AxiosInstance';
import { Dispatch } from 'react';

const apiKey = process.env.APIKEY;

interface EXCAHNGERATEINPUTS {
    to: string,
    amount: number,
    date?: string,
}

interface HISTORICRATEINPUTS {
    date: string, // YYYY-MM-DD
    targetCurrencies: string[],
    baseCurrency: string
}

export const fetchCurrencies = () => {
    return async (dispatch: Dispatch<DispatchTypes>) => {
        try {
            const res = await generateAxiosInstance().get(`symbols`);
            const currencies = Object.keys(res.data.symbols).map((key) => ({ label: res.data.symbols[key], value: key }));
            return dispatch({
                type: FETCH_CURRENCIES,
                payload: currencies
            });

        } catch (e: any) {
            console.log(e);
            return dispatch({
                type: FETCH_CURRENCIES_ERROR,
                payload: e?.message || "Unable to fetch data."
            });
        }
    }
}

export const fetchUsdRate = (amount: string) => {
    return async (dispatch: Dispatch<DispatchTypes>) => {
        try {
            const res = await generateAxiosInstance()
                .get(`convert?to=USD&from=NPR&amount=${amount}`);
            dispatch({
                type: FETCH_USD_RATE,
                payload: res?.data?.result
            });
        } catch (e: any) {
            console.log(e);
            dispatch({
                type: FETCH_USD_RATE_ERROR,
                payload: e?.message || "Unable to fetch data."
            });
        }
    }
}

export const fetchExchangedRate = ({ to, amount, date }: EXCAHNGERATEINPUTS) => {
    return async (dispatch: Dispatch<DispatchTypes>) => {
        try {
            const res = await generateAxiosInstance()
                .get(`convert?to=${to}&from=NPR&amount=${amount}&date=${date || ''}`);
            const data = {
                date: res.data?.date,
                amount: amount,
                exchangedAmount: res.data?.result,
                exchangeRate: res.data?.info?.rate,
                to: res.data?.query?.to,
                from: "NPR"
            };
            dispatch({
                type: FETCH_EXCHANGED_RATE,
                payload: data
            });
        } catch (e: any) {
            console.log(e);
            dispatch({
                type: FETCH_EXCHANGED_RATE_ERROR,
                payload: e?.message || "Unable to fetch data."
            });
        }
    }
}

export const fetchHistoricRates = ({ date, targetCurrencies, baseCurrency }: HISTORICRATEINPUTS) => {
    return async (dispatch: Dispatch<DispatchTypes>) => {
        try {
            const res = await generateAxiosInstance()
                .get(`${date}?symbols=${targetCurrencies.join(', ')}&base=${baseCurrency}`);
            dispatch({
                type: FETCH_EXCHANGED_RATE,
                payload: res.data
            });
        } catch (e: any) {
            console.log(e);
            dispatch({
                type: FETCH_EXCHANGED_RATE_ERROR,
                payload: e?.message || "Unable to fetch data."
            });
        }
    }
}