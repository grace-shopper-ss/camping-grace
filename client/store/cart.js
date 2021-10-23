import { ErrorSharp } from "@mui/icons-material";
import axios from "axios";

const LOAD_CART = "LOAD_CART";
const ADD_TO_CART = "ADD_TO_CART";
const ORDER_CART_ITEM = "ORDER_CART_ITEM";
// const UPDATE_CART = "UPDATE_CART";

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
export const getCart = (id) => {
  if (id) {
    return async (dispatch) => {
      try {
        const { data: cart } = await axios.get(`/api/cart/${id}`);
        dispatch(loadCart(cart));
      } catch (err) {
        console.log(err.message);
      }
    };
  } else {
    return async (dispatch) => {
      try {
        dispatch(loadCart([]));
      } catch (err) {
        console.log(err.message);
      }
    };
  }
};

export const addToCart = (items, auth, history) => {
  return async (dispatch) => {
    await Promise.all(
      items.map((item) => {
        axios
          .post(`/api/cart/${auth.id}`, item)
          .then((res) => dispatch(addItem(res.data)));
      })
    );
    history.push("/products");
  };
};

export const orderCartItems = (items, auth, history, order) => {
  return async (dispatch) => {
    await Promise.all(
      items.map((item) => {
        item.status = 'sold';
        axios
          .put(`/api/cart/product/${item.inventoryId}`, item)
          .then((res) => dispatch(orderItem(res.data)));
      })
    );
    history.push("/products");
  }
}

// export const changeCart = (item, auth, history) => {
//   return async (dispatch) => {
//     const { data: updated } = await axios.put(`/api/cart/${auth.id}/${item.id}`, item);
//     dispatch(updateCart(updated));
//     history.push(`/cart/${auth.id}`);
//   };
// };

const initialState = [];

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CART:
      return action.cart;
    case ADD_TO_CART:
      return [...state, action.item];
    case ORDER_CART_ITEM:
      return state;
    // case UPDATE_CART:
    //   return state.map((item) =>
    //     item.id === action.item.id ? action.item : item
    //   );
    default:
      return state;
  }
};
