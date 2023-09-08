export function Cart({ count = 0 }) {
  return (
    <div className="cart">
      <img src="basket-white-icon.svg" alt="Cart icon" className="cart__icon" />
      <p className="cart__count">{count}</p>
    </div>
  );
}