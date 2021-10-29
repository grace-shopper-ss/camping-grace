const ADD_TO_LOCAL_CART = "ADD_TO_LOCAL_CART";

// actions
export const guestAddItem = (item) => {
  return {
    type: ADD_TO_LOCAL_CART,
    item,
  };
};

// thunks
export const addToGuestCart = (items, history) => {
  return async (dispatch) => {
    await Promise.all(
      items.map((item) => {
        return dispatch(guestAddItem(item))
      })
    );
    history.push("/products");
  };
};

const initialState = [];

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_LOCAL_CART:
      return [...state, action.item];
    default: 
      return state;
  }
};