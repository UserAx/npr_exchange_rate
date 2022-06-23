interface PROPS {
    label: string;
    id: string;
    handleRadio: () => void;
}

function RadioButtonComponent(props: PROPS) {
    const {label, id, handleRadio } = props;
    return (
        <div className="radio__button__component">
            <input id={id} type="checkbox" onClick={handleRadio} />
            <label htmlFor={id}>{label}</label>
        </div>
    );
}

export default RadioButtonComponent;