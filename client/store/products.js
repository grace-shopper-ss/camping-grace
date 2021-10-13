// modules
import axios from "axios";

// action names
const SET_PRODUCTS = "SET_PRODUCTS";

// actions
const setProducts = (products) => {
  return {
    type: SET_PRODUCTS,
    products,
  };
};

// thunks
export const getProducts = () => {
  return async (dispatch) => {
    try {
      const { data: products } = await axios.get("/api/products");
      dispatch(setProducts(products));
    } catch (err) {
      console.log(err.message);
    }
  };
};

// reducer
const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
      case SET_PRODUCTS:
        return action.products;
      default:
        return state;
    }
  };