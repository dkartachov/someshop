import './Option.css';

const Option = ({ text, onSelect }) => {
    return (
        <div className="option" onClick={() => onSelect(text)}>
            {text}
        </div>
    );
}

export default Option;