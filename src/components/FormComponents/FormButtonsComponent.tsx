interface PROPS {
  label: any
  className?: string,
  disabled: boolean
}

function FormButtonsComponent(props: PROPS) {
  const { label, className, disabled, } = props;
  return (
    <div className={`form__button__component ${className}`}>
      <button type="submit" 
      disabled={disabled}>{label}</button>
      <button type="reset">Cancel</button>
    </div>
  );
}

FormButtonsComponent.defaultProps = {
  className: '',
  disabled: false
};

export default FormButtonsComponent;
