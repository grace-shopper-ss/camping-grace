import axios from "axios";

const LOAD_CART = "LOAD_CART";
const ADD_TO_CART = "ADD_TO_CART";
const UPDATE_INVENTORY = "UPDATE_INVENTORY";
const REMOVE_CART_ITEM = "REMOVE_CART_ITEM";

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

export const updateInventory = (item) => {
  return {
    type: UPDATE_INVENTORY,
    item,
  };
};

export const removeItem = (item) => {
  return {
    type: REMOVE_CART_ITEM,
    item,
  };
};

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
    history.push(`/cart`);
  };
};

export const reserveCartItems = (items, history) => {
  return async (dispatch) => {
    items.map((item) => {
      item.status = "reserved";
      axios
        .put(`/api/inventories/${item.inventoryId}`, item)
        .then((res) => dispatch(updateInventory(res.data)));
    });
  };
};

export const orderCartItems = (items, history) => {
  return async (dispatch) => {
    items.map((item) => {
      item.status = "sold";
      axios
        .put(`/api/inventories/${item.inventoryId}`, item)
        .then((res) => dispatch(updateInventory(res.data)));
    });
    history.push("/products");
  };
};

export const removeCartItems = (items, order, history) => {
  return async (dispatch) => {
    items.map((item) => {
      axios
        .delete(`/api/cart/${order.id}/${item.inventoryId}`, item)
        .then((res) => dispatch(removeItem(res.data)));
      item.status = "available";
      axios
        .put(`/api/inventories/${item.inventoryId}`, item)
        .then((res) => dispatch(updateInventory(res.data)));
    });
    history.push(`/cart`);
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
    case UPDATE_INVENTORY:
      return state;
    case REMOVE_CART_ITEM:
      return state.filter((item) => item.status !== "available");
    default:
      return state;
  }
};
