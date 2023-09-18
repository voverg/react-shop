import { createContext, useReducer } from 'react';
import { reducer } from './reducer.js';

export const ShopContext = createContext();

const initialState = {
  goods: [],
  orders: [],
  alerts: [],
  loading: true,
  isBasketShow: false,
};

export function ContextProvider(props) {
  const [value, dispatch] = useReducer(reducer, initialState);

  value.addOrder = (order) => {
    dispatch({ type: 'ADD_ORDER', payload: {order} });
  }

  value.removeOrder = (id) => {
    dispatch({ type: 'REMOVE_ORDER', payload: {id} });
  }

  value.closeAlert = () => {
    dispatch({type: 'CLOSE_ALERT'});
  }

  value.handleOrderCount = (id, value) => {
    dispatch({ type: 'HANDLE_ORDER_COUNT', payload: {id, value} });
  }

  value.handleBasketShow = (isShow) => {
    dispatch({ type: 'HANDLE_BASKET_SHOW', payload: {isShow} });
  }

  value.setGoods = (data) => {
    dispatch({ type: 'SET_GOODS', payload: {data} })
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
}