import { StateI } from '../App';
import { createContext } from 'react';
import { asyncDispatch, AsyncDispatch, } from '../../utils/ThunkMiddleware';
import { DispatchTypes } from '../../actions/ActionTypes';
import { ExchangedRateI } from '../../actions/ExchangeRate';

const initialState = {currencies: [], exchangedRates: <ExchangedRateI[]> [], error: undefined, usdRate: 0};

export const StateContext = createContext({ state: <StateI> initialState, customDispatch: <AsyncDispatch<DispatchTypes>> asyncDispatch });
