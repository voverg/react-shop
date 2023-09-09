export function BasketItem({id, title, price, count, removeOrder}) {
  return (
    <li className="basket__item">
      <p className="basket__item-title">{title}</p>

      <button className="basket__item-btn">-</button>
      <p className="basket__item-count">&nbsp;x&nbsp;{count}</p>
      <button className="basket__item-btn">+</button>
      
      <p className="basket__item-price price">&nbsp;=&nbsp;{(price * count).toLocaleString('ru-RU')}</p>
      <button className="basket__item-close" onClick={() => removeOrder(id)}>×</button>
    </li>
  );
}