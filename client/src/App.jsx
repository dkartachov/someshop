import { useState, useEffect } from "react";
import Banner from "./components/banner/Banner";
import Sidebar from "./components/sidebar/Sidebar";
import Item from "./components/item/Item";

function App() {
  const endpoints = [
    'products',
    'customers',
    // 'orders',
  ];

  const [endpoint, setEndpoint] = useState('');
  const [data, setData] = useState({});

  useEffect(() => {
    console.log('called');
    let d = {};

    Promise.all(endpoints.map(async (endpoint) => {
      const res = await fetch(`/api/${endpoint}`, {
        method: 'GET',
      });

      d[endpoint] = await res.json();
    })).then(() => {
      setData(d);
    });
  });

  const onSelect = (option) => {
    setEndpoint(option);
  }

  const main = () => {
    switch(endpoint) {
      case 'products':
        return (
          data.products?.map(product => <Item key={product.product_id} item={[product.name, product.description]}/>)
        );
      case 'customers':
        return (
          data.customers?.map(customer => <Item key={customer.customer_id} item={[customer.first_name, customer.last_name]}/>)
        );
      case 'orders':
      default:
        return;
    }
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
