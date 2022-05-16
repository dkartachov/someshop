import Columns from "../columns/Columns";
import Item from "../item/Item";
import { getColumnProviders } from "../../utils/utils";

const Items = ({ module, items }) => {
    return (
        <>
            <Columns module={module}/>
            {(items.length && items[0].error) ? items[0].error : items.map(item => <Item key={item.id} item={getColumnProviders(module, item)} />)}
        </>
    );
}

export default Items;