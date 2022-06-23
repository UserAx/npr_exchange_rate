import {useContext} from 'react';
import { StateContext } from '../../app/context/StateContext';
import NumberInput from '../input/NumberInputComponent';
import FormButton from '../FormComponents/FormButtonsComponent'; 
import RadioButton from '../RadioButton/RadioButtonComponent';
import { useState } from 'react';
import MultiSelect from '../multi-select/MultiSelectComponent';
import { OptionI } from '../interfaces/Options';
import { fetchExchangedRate } from '../../actions/actions';
import currencies from '../../assets/test/json/currencies.json';
import DateInput from '../input/DateInputComponent';

interface PROPS{
    handleDisplay: () => void
}

const ConverterComponent = (props: PROPS) => {

    const {handleDisplay} = props;

    const {state, customDispatch} = useContext(StateContext);

    const [showHistoric, setShowHistoric] = useState<boolean>(false);

    const handleShowHistoric = () => setShowHistoric(!showHistoric);

    const handleConvert = (e: any) => {
        e.preventDefault();
        //Input value
        const {amount_nepali, rate_date, currencies} = e.target.elements;
        const convertTo = currencies.value.split(',');

        //Reset our exchangedRates array
        customDispatch({
            type: "RESET_EXCHANGED_RATES",
            payload: []
        });
        
        //Then populate it with the new data
        convertTo.forEach(async (to: string) => 
            await customDispatch(fetchExchangedRate({
                to, amount: amount_nepali.value, 
                date: showHistoric ? rate_date?.value : ''
            }))
        );
        handleDisplay();
    }

    const handleReset = (e: any) => {
        const {reset_currencies} = e.target.elements;
        reset_currencies.click();
        setShowHistoric(false)
    };

    return (
        <form className='rate__convertor__component' onSubmit={handleConvert} onReset={handleReset}>
            <h1>Currency Converter</h1>
            <NumberInput showLabel={true} label="Amount in Nepali" min="1" required name="amount_nepali"/>
            <MultiSelect required max={5} resetElementName='reset_currencies' label="Exchange Currencies" options={state.currencies} name="currencies"/>
            <RadioButton handleRadio={handleShowHistoric} label="View Historic Data" id="rate-historic" />
            <DateInput disabled={!showHistoric} name="rate_date"/>
            <FormButton label="Convert" />
        </form>
    );
}

export default ConverterComponent;