import { useState, useEffect } from 'react';

import { Loader } from '../components/loader.jsx';
import { Goods } from '../components/goods.jsx';
import { Cart } from '../components/cart.jsx';
import { Basket } from '../components/basket.jsx';
import { Alert } from '../components/alert.jsx';

import { Api } from '../services/api.js';

export function Main() {
  const [goods, setGoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const [isBasketShow, setBasketShow] = useState(false);
  const [alerts, setAlerts] = useState([]);

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
    
    setAlerts([...alerts, order.title]);
  }

  const removeOrder = (id) => {
    const newOrders = orders.filter((item) => item.id !== id);
    setOrders(newOrders);
  }

  const handleOrderCount = (id, value) => {
    const newOrders = orders.map((item) => {
      if (id === item.id) {
        return {...item, count: item.count + value};
      }

      return item;
    }).filter((item) => item.count > 0);

    setOrders(newOrders);
  }

  const handleBasketShow = (isShow) => {
    setBasketShow(isShow);
  }

  const closeAlert = () => {
    const newAlerts = alerts.slice(1);
    setAlerts(newAlerts);
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
            handleOrderCount={handleOrderCount}
          />
        }

        {alerts.length > 0 && <Alert alerts={alerts} closeAlert={closeAlert} />}
        
      </div>
    </main>
  );

}

