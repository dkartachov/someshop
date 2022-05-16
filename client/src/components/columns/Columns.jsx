import './Columns.css';
import { moduleColumnMap } from '../../utils/enums';

const Columns = ({ module }) => {

    return (
        <div className='column-container'>
            {moduleColumnMap[module].map((column, index) => <div key={index} className='column-names'>{column}</div>)}
        </div>
    );
}

export default Columns;