import {getCurrentDate}  from '../../utils/utils';
  interface PROPS{
    disabled?: boolean,
    name: string,
    required?: boolean,
    min?: string,
  }

  function DateInputComponent(props: PROPS) {
    const {
      disabled, required, name, min  
    } = props;
    return (
      <div className="date__input__component">
        <input
          id={name}
          required={required}
          name={name}
          disabled={disabled}
          type="date"
          min={min}
          max={getCurrentDate()}
        />
      </div>
    );
  }
  
  DateInputComponent.defaultProps = {
    disabled: false,
    required: false,
    min: '2000-01-01'
  };
  
  export default DateInputComponent;
  