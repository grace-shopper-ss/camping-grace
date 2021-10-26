import axios from "axios";

const LOAD_CART = "LOAD_CART";
const ADD_TO_CART = "ADD_TO_CART";
const RESERVE_CART_ITEM = "RESERVE_CART_ITEM";
const ORDER_CART_ITEM = "ORDER_CART_ITEM";

// actions
export const loadCart = (cart) => {
  return {
    type: LOAD_CART,
    cart,
  };
};

export const addItem = (item) => {
  return {
    type: ADD_TO_CART,
    item,
  };
};

export const reserveItem = (item) => {
  return {
    type: RESERVE_CART_ITEM,
    item,
  };
};

export const orderItem = (item) => {
  return {
    type: ORDER_CART_ITEM,
    item,
  };
};

// export const updateCart = (item) => {
//   return {
//     type: UPDATE_CART,
//     item,
//   };
// };

// thunks
export const getCart = (order) => {
  return async (dispatch) => {
    try {
      const { data: cart } = await axios.get(`/api/cart/${order.id}`);
      dispatch(loadCart(cart));
    } catch (err) {
      console.log(err.message);
    }
  };
};

export const addToCart = (items, order, history) => {
  return async (dispatch) => {
    items.map((item) => {
      axios
        .post(`/api/cart/${order.id}`, item)
        .then((res) => dispatch(addItem(res.data)));
    });
    history.push("/products");
  };
};

export const reserveCartItems = (items, history) => {
  return async (dispatch) => {
    items.map((item) => {
      item.status = "reserved";
      axios
        .put(`/api/inventories/${item.inventoryId}`, item)
        .then((res) => dispatch(reserveItem(res.data)));
    });
    history.push("/products");
  };
};

export const orderCartItems = (items, history) => {
  return async (dispatch) => {
    items.map((item) => {
      item.status = "sold";
      axios
        .put(`/api/inventories/${item.inventoryId}`, item)
        .then((res) => dispatch(orderItem(res.data)));
    });
    history.push("/products");
  };
};

const initialState = [];

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CART:
      return action.cart;
    case ADD_TO_CART:
      return [...state, action.item];
    case RESERVE_CART_ITEM:
      return state;
    case ORDER_CART_ITEM:
      return state;
    default:
      return state;
  }
};
