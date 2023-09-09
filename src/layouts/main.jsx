import { useState, useEffect } from 'react';

import { Loader } from '../components/loader.jsx';
import { Goods } from '../components/goods.jsx';
import { Cart } from '../components/cart.jsx';
import { Basket } from '../components/basket.jsx';

import { Api } from '../services/api.js';

export function Main() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [isBasketShow, setBasketShow] = useState(false);

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

  const addOrder = (order) => {
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

  const removeOrder = (id) => {
    const newOrders = orders.filter((item) => item.id !== id);
    setOrders(newOrders);
  }

  const handleBasketShow = (isShow) => {
    setBasketShow(isShow);
  }

  useEffect(() => {
    getGoods();
  }, []);

  return (
    <main className="main">
      <div className="container">
        <Cart count={orders.length} handleBasketShow={handleBasketShow} />

        {loading
          ? <Loader />
          : <Goods goods={goods} addOrder={addOrder} />
        }

        {isBasketShow &&
          <Basket
            orders={orders}
            handleBasketShow={handleBasketShow}
            removeOrder={removeOrder}
          />
        }
        
      </div>
    </main>
  );

}

