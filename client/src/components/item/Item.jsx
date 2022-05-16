import './Item.css';

const Item = ({ item }) => {
    return (
        <div className='container'>
            {item.filter(i => i).map((prop, index) => <div key={index} className='display'>{prop}</div>)}
        </div>
    );
}

export default Item;