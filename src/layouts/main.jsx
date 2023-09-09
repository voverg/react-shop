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
    console.log('Orders', orders);

  const getGoods = () => {
    api.getGoods().then((data) => {
      setGoods(data);
      setLoading(false);
    }).catch((error) => {
      console.log(error);
      setLoading(false);
    });
  }

  const addOrder = (order) => {
    // const order = goods.filter((item) => item.id === id)[0];
    const orderIndex = orders.findIndex((item) => item.id === order.id);

    if (orderIndex < 0) {
      setOrders([...orders, order]);
    } else {
      const newOrders = orders.map((item) => {
        if (item.id === order.id) {
          return {...item, count: item.count + 1}
        }

        return item;
      });
      setOrders(newOrders);
    }
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

