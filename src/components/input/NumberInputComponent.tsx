interface PROPS{
  disabled?: boolean,
  label: string,
  name: string,
  showLabel?: boolean,
  required?: boolean,
  min?: string,
}

function NumberInputComponent(props: PROPS) {
  const {
    disabled, label, required, name, min,  showLabel,
  } = props;

  //Handle invalid input
  const handleOnInput = (e: any) => {
    const maxLimit = 1000000000;
    //Either has non-numbers or has decimal place or has more than 9 zero places
    if(!e.target.value.match(/[0-9]+/)  || e.target.value.includes(".") || e.target.value > maxLimit){
      return e.target.classList.add("number__input__invalid");
    }
    e.target.classList.remove("number__input__invalid");
  }

  return (
    <div className="number__input__component">
      {showLabel && <label htmlFor={name}>{label}</label>}
      <input
        id={name}
        required={required}
        name={name}
        disabled={disabled}
        type="number"
        placeholder={!showLabel ? label : ''}
        min={min}
        max="1000000000"
        // pattern="^[0-9]+$"
        onInput={handleOnInput}
      />
    </div>
  );
}

NumberInputComponent.defaultProps = {
  disabled: false,
  showLabel: true,
  required: false,
  min: 0,
};

export default NumberInputComponent;
