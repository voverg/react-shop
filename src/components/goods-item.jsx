export function GoodsItem({id, title, description, price, img, count, addOrder}) {
  // const goodsItemImgPath = poster === 'N/A' ? `https://placehold.co/300x400?text=${title}` : poster;

  return (
    <div className="goods__item" id={id}>
      <img src={img} alt="image" className="goods__img" />
      <h4 className="goods__title">{title}</h4>
      <p className="goods__description">{description}</p>
      <div className="goods__action">
        <p className="goods__price price">{price.toLocaleString('ru-RU')}</p>
        <button
          className="goods__btn"
          onClick={() => addOrder({ id, title, description, price, img, count })}
        >
          В корзину
        </button>
      </div>
    </div>
  );
}