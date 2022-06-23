import { useState, useRef } from 'react';
import {OptionI} from '../interfaces/Options';
import cancel  from '../../assets/img/cancel.svg';

interface PROPS {
  label: string,
  options: OptionI[],
  disabled?: boolean,
  name: string,
  required?: boolean,
  max: number,
  resetElementName?: string,
}

function MultiSelectComponent(props: PROPS) {
  const { options, disabled, required, resetElementName, label, name, max } = props;

  const [value, setValue] = useState<string>('');
  const [selected, setSelected] = useState<string[]>([]);
  
  const inputRef: any = useRef(null);

  const handleInput = (e: any) => { 
    setValue(e.target.value || '');
  };

  const handleSelect = (e: any) => {
    
    const arraySize = selected.length;
    //If Max Limit is reached, report and stop input
    if(arraySize === max) {
      //Report max limit
      inputRef.current.setCustomValidity(`Max Limit: ${max}`);
      inputRef.current.reportValidity();
      //Reset validity on input
      inputRef.current.setCustomValidity("");
      inputRef.current.reportValidity();
      return;
    }
    //Else get value
    const {buttonOptionValue} = e.target.dataset;
    setSelected((prevValue) => {
      if(prevValue.includes(buttonOptionValue)) return prevValue;
      return prevValue.concat([buttonOptionValue]);
    });
    //Reset input
    setValue("");
  };
  
  const handleRemoveSelected = (e: any) => {
    setSelected((prevValue) => prevValue.filter((value) => value !== e.target.dataset.imgValue));
  }

  const handleReset = () => {
    //Reset values
    setValue('');
    setSelected([]);
    //Reset validity on input
    inputRef.current.setCustomValidity("");
    inputRef.current.reportValidity();
  };

  return (
    <div className='multi__select__component'>
      <span>{label}</span>
      <div>
        <button className="multi__select__reset" type="button" onClick={handleReset} name={resetElementName} >
          Clear
        </button>
        <div className={`multi__select__component__selected ${selected.length === 0 ? 'selected--edits' : ''}`}>
          {selected.length === 0 ? 
          (<span>Selected Options</span>) : 
          selected.map((value, index) => 
          <div key={`selected__value__${index}`}>
            <span>{value}</span>
            <button type="button" onClick={handleRemoveSelected} >
              <img src={cancel} data-img-value={value}/>
            </button>
          </div>
          )}
        </div>
        <div className="multi__select">
          <input ref={inputRef} className="multi__select__validaton" required={required}  name={name} value={selected.join(',')} />
          <input autoComplete="off" value={value} disabled={disabled} onChange={handleInput} type="text" />
          <div className='multi__select__options'>
            {options.map((option, index) => value && option.label.toLowerCase().startsWith(value.toLocaleLowerCase()) && 
            <button type="button" onClick={handleSelect} data-button-option-value={option.value} key={`option__${index}__${label}`}>{option.label}</button>)}
          </div>
        </div>
      </div>
    </div>
  );
}

MultiSelectComponent.defaultProps = {
  disabled: false,
  required: false,
  resetElementName: ''
};

export default MultiSelectComponent;
