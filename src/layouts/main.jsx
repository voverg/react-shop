import { useState, useEffect } from 'react';

import { Loader } from '../components/loader.jsx';
import { Goods } from '../components/goods.jsx';
import { Cart } from '../components/cart.jsx';

import { Api } from '../services/api.js';

export function Main() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const api = new Api();

  const getGoods = () => {
    api.getGoods().then((data) => {
      setGoods(data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }

  const addOrder = (id) => {
    const order = goods.filter((item) => item.id === id);
    setOrders([...orders, order]);
  }

  useEffect(() => {
    getGoods();
  }, []);

  return (
    <main className="main">
      <div className="container">
        <Cart count={orders.length} />
        {loading
          ? <Loader />
          : <Goods goods={goods} addOrder={addOrder} />
        }
      </div>
    </main>
  );

}

