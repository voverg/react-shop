import { useState, useEffect, useContext } from 'react';

import { ShopContext } from '../store/context.jsx';
import { Loader } from '../components/loader.jsx';
import { Goods } from '../components/goods.jsx';
import { Cart } from '../components/cart.jsx';
import { Basket } from '../components/basket.jsx';
import { Alert } from '../components/alert.jsx';

import { Api } from '../services/api.js';

export function Main() {
  const {goods, setGoods, alerts, orders, isBasketShow, loading} = useContext(ShopContext);
  const api = new Api();

  const getGoods = () => {
    api.getGoods().then((data) => {
      setGoods(data);
    }).catch((error) => {
      console.log(error);
    });
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
          : <Goods goods={goods} />
        }

        {isBasketShow && <Basket />}

        {alerts.length > 0 && <Alert />}
        
      </div>
    </main>
  );

}

