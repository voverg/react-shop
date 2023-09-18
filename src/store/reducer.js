export function reducer(state, {type, payload}) {
  switch(type) {
    case 'SET_GOODS':
      return {...state, goods: payload.data, loading: false};
    case 'ADD_ORDER':
      const orderIndex = state.orders.findIndex((item) => item.id === payload.order.id);
      let newOrders = [];
      const alerts = [...state.alerts, payload.order.title];

      if (orderIndex < 0) {
        newOrders = [...state.orders, payload.order];
      } else {
        newOrders = state.orders.map((item) => {
          if (item.id === payload.order.id) {
            return {...item, count: item.count + 1}
          }

          return item;
        });
      }
      return {...state, orders: newOrders, alerts};
    case 'CLOSE_ALERT':
      return {...state, alerts: state.alerts.slice(1)};
    case 'REMOVE_ORDER':
      const orders = state.orders.filter((item) => item.id !== payload.id);
      return {...state, orders }
    case 'HANDLE_ORDER_COUNT':
      const newOrderList = state.orders.map((item) => {
        if (payload.id === item.id) {
          return {...item, count: item.count + payload.value};
        }

        return item;
      }).filter((item) => item.count > 0);

      return {...state, orders: newOrderList};
    case 'HANDLE_BASKET_SHOW':
      return {...state, isBasketShow: payload.isShow};
    case 'SET_LOADING':
      return {...state, loading: payload.isLoading};
    default:
      return state;
  }
}