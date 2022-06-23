import {OptionI} from '../interfaces/Options';

interface PROPS {
  label: string,
  options: OptionI[],
  disabled?: boolean,
  name: string,
  required?: boolean
}

function SelectComponent(props: PROPS) {
  const { options, disabled, required, label, name } = props;

  return (
    <select disabled={disabled} name={name} required={required} className="reusable__select">
      <option value="">{label}</option>
      {options.map((option, index) => <option key={`${label}__${index}__option`} value={option.value}>{option.label}</option>)}
    </select>
  );
}

SelectComponent.defaultProps = {
  disabled: false,
  required: false
};

export default SelectComponent;
