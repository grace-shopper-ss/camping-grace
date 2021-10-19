import axios from "axios";

const LOAD_CART = "LOAD_CART";
const UPDATE_CART = "UPDATE_CART";

// actions
export const loadCart = (cart) => {
  return {
    type: LOAD_CART,
    cart,
  };
};

export const updateCart = (cart) => {
  return {
    type: UPDATE_CART,
    cart,
  };
};

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

export const changeCart = (cart, auth, history) => {
  return async (dispatch) => {
    const { data: updated } = await axios.put(`/api/cart/${auth.id}`, cart);
    dispatch(updateCart(updated));
    history.push(`/cart/${auth.id}`);
  };
};

const initialState = [];

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CART:
      return action.cart;
    case UPDATE_CART:
      return state.map((cart) =>
        cart.id === action.cart.id ? action.cart : cart
      );
    default:
      return state;
  }
};
