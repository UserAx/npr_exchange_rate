import { useEffect, useReducer, useState, useMemo } from 'react';
import {DispatchTypes} from '../actions/ActionTypes';
import { StateI } from './App';
import { fetchCurrencies, fetchUsdRate } from '../actions/actions';
import { asyncDispatch } from '../utils/ThunkMiddleware';
import Converted from '../assets/img/converted.svg';
import Converter from '../components/converter/ConverterComponent';
import { StateContext } from './context/StateContext';
import Table from '../components/table/TableComponent';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import CreditsComponent from '../components/credits/CreditsComponent';

const reducer = (state: StateI, action: DispatchTypes) : StateI => {
    switch(action.type) {
        case "FETCH_CURRENCIES": return {...state, currencies: action.payload};
        case "FETCH_CURRENCIES_ERROR": return {...state, error: action.payload};
        case "FETCH_EXCHANGED_RATE": return {
            ...state, 
            exchangedRates: state.exchangedRates
            .filter((exchangeRate) => exchangeRate.to !== action.payload.to)
            .concat([action.payload])
        };
        case "FETCH_EXCHANGED_RATE_ERROR": return {...state, error: action.payload};
        case "FETCH_USD_RATE": return {...state, usdRate: action.payload};
        case "FETCH_USD_RATE_ERROR": return {...state, error: action.payload};
        case "RESET_EXCHANGED_RATES": return {...state, exchangedRates: action.payload};
        default: return state;
    }
};

export const initialState = {currencies: [], exchangedRates: [], error: undefined, usdRate: 0};

function AppComponent() {

    const [mounted, setMounted] = useState(false);
    const [open, setOpen] = useState<boolean>(false);
    const [openCredits, setOpenCredits] = useState<boolean>(false);

    //Reducer state and dispatch
    const [state, dispatch] = useReducer(reducer, initialState);

    //Our custom async dispatch
    const customDispatch = useMemo(() => asyncDispatch(dispatch), [dispatch]);

    //Fetch currencies and npr-usd exchange rate
    useEffect(() => {
        //In dev:
        // customDispatch(fetchUsdRate("1"));
        // customDispatch(fetchCurrencies());
        // In Prod:
        if(mounted) {
            customDispatch(fetchUsdRate("1"));
            customDispatch(fetchCurrencies());
        }
        setMounted(true);
    },[mounted]);

    // useEffect(() => console.log(state), [state]);

    //Handlers
    const handleModal = () => setOpen(!open);
    const handleCreditsModal = () => setOpenCredits(!openCredits);

    return (
        <StateContext.Provider value={{state, customDispatch}}>
            <div className="app__component__container">
                <div className="app__component">
                    <div  className="app__header">
                        <h1>NEPALI EXCHANGE RATES</h1>
                        <button type='button' onClick={handleCreditsModal}>CREDITS</button>
                    </div>
                    <div className="app__exchange__rates__display">
                        <span>1 NPR</span>
                        <img style={{width: "2rem"}} src={Converted} />
                        <span>{state.usdRate || "..."} USD</span>
                    </div>
                    <Converter handleDisplay={handleModal}/>
                    <Modal open={open} onClose={handleModal} center>
                        <Table exchangedRates={state.exchangedRates} />
                    </Modal>
                    <Modal open={openCredits} onClose={handleCreditsModal} center>
                        <CreditsComponent />
                    </Modal>
                </div>
            </div>
        </StateContext.Provider>
    )
}

export default AppComponent;