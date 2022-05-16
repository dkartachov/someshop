import { useState, useEffect } from "react";
import Banner from "./components/banner/Banner";
import Sidebar from "./components/sidebar/Sidebar";
import Items from "./components/items/Items";
// import Item from "./components/item/Item";

function App() {
  const [endpoint, setEndpoint] = useState('products');
  const [loading, setLoading] = useState();
  const [data, setData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
    }, 500);

    fetch(`/api/${endpoint}`, {
      method: 'GET',
    })
    .then(res => res.json())
    .then(data => {
      setData(data);
    })
    .catch(e => {
      setData([{ error: "No items to show!" }]);
    })
    .finally(() => {
      clearTimeout(timer);
      setLoading(false);
    });

  }, [endpoint]);

  const onSelect = (option) => {
    setData([]);
    setEndpoint(option);
  }

  const main = () => {
    if (loading) return 'Loading...';

    return <Items module={endpoint} items={data}/>;
  }

  return (
    <>
      <Sidebar onSelect={onSelect}/>
      <div className="main">
        <Banner />
        {main()}
      </div>
    </>
  );
}

export default App;
