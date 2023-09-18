import { useContext } from 'react';
import { ShopContext } from '../store/context.jsx';

import { BasketItem } from './basket-item.jsx';

export function Basket() {
  const {orders, handleBasketShow} = useContext(ShopContext);
  const totalPrice = orders.reduce((acc, item) => {
    return acc + item.price * item.count;
  }, 0);

  return (
    <div className="basket">
      <div className="basket__overlay" onClick={() => handleBasketShow(false)}></div>

      <div className="basket__content">
        <div className="basket__header">
          <h3 className="basket__title">Корзина</h3>
          <button className="basket__header-close"  onClick={() => handleBasketShow(false)}>×</button>
        </div>

        <ul className="basket__list">
          {orders.length
            ? orders.map((item) => {
                return <BasketItem
                        key={item.id}
                        {...item}
                      />
              })
            : <h4 className="basket__not-found">Корзина пуста</h4>
          }
        </ul>

        <div className="basket__footer">
          <p className="basket__footer-title">Общая сумма:&nbsp;</p>
          <span className="basket__total-price price">{totalPrice.toLocaleString('ru-RU')}</span>
        </div>
      </div>

    </div>
  );
}