import { useContext } from 'react';
import { ShopContext } from '../store/context.jsx';

export function BasketItem({id, title, price, count}) {
  const {removeOrder, handleOrderCount} = useContext(ShopContext);

  return (
    <li className="basket__item">
      <p className="basket__item-title">{title}</p>

      <button
        className="basket__item-btn"
        onClick={() => handleOrderCount(id, -1)}
      >-</button>
      <p className="basket__item-count">x&nbsp;<span className="item-num">{count}</span></p>
      <button
        className="basket__item-btn"
        onClick={() => handleOrderCount(id, 1)}
      >+</button>
      
      <p className="basket__item-price price">=&nbsp;
        <span className="item-num">{(price * count).toLocaleString('ru-RU')}</span>
      </p>
      <button className="basket__item-close" onClick={() => removeOrder(id)}>×</button>
    </li>
  );
}