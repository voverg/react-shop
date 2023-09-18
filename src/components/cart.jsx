import { useContext } from 'react';
import { ShopContext } from '../store/context.jsx';

export function Cart({ count = 0 }) {
  const {handleBasketShow} = useContext(ShopContext);

  return (
    <div className="cart" onClick={() => handleBasketShow(true)}>
      <img src="basket-white-icon.svg" alt="Cart icon" className="cart__icon" />
      <p className="cart__count">{count}</p>
    </div>
  );
}