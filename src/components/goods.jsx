import { GoodsItem } from './goods-item.jsx';


export function Goods(props) {
  const {goods, addOrder} = props;

  return (
    <div className="goods">
      {goods.length ? goods.map((good) => {
        return <GoodsItem key={good.id} addOrder={addOrder} {...good} />
      }) : <h4 className="goods__not-found">No results</h4>
      }
    </div>
  );
}