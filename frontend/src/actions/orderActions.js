import orderService from '../services/orderService.js'

export function loadOrders() {
  return async dispatch => {
    try {
      const orders = await orderService.queryAll();
      dispatch(setOrders(orders));
    } catch (err) {
      console.log('OrderActions: err in loadOrders', err);
    }
  };
}

export function loadOrder(orderId) {
  console.log('order id', orderId);
  return async dispatch => {
    try {
      const order = await orderService.query(orderId);
      console.log('order action', order);

      dispatch(setOrder(order));
    } catch (err) {
      console.log('OrderActions: err in loadOrder', err);
    }
  };
}

export function addOrder(newOrder) {
  return async dispatch => {
    try {
      const addedOrder = await orderService.add(newOrder);
      console.log('order action', newOrder);
      dispatch(_addOrder(addedOrder));
    } catch (err) {
      console.log('OrderActions: err in loadOrder', err);
    }
  };
}

  export function updateOrder(order) {
    return async dispatch => {
      try {
        await orderService.update(order);
        dispatch(_updateOrder(order));
      } catch (err) {
        console.log('OrderActions: err in updateOrder', err);
      }
    };
  }

  function setOrder(order) {
    return {
      type: 'SET_ORDER',
      order
    };
  }

  function _addOrder(order) {
    return {
      type: 'ORDER_ADD',
      order
    };
  }

  function _updateOrder(orderId) {
    return {
      type: 'ORDER_UPDATE',
      orderId
    };
  }

  function setOrders(orders) {
    return {
      type: 'SET_ORDERS',
      orders
    };
  }
