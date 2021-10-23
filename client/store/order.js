import axios from "axios";

const SET_CURRENT_ORDER = "SET_CURRENT_ORDER";
const COMPLETE_CURRENT_ORDER = "COMPLETE_CURRENT_ORDER";
const CREATE_NEW_ORDER = "CREATE_NEW_ORDER";

// actions
export const setCurrentOrder = (order) => {
  return { type: SET_CURRENT_ORDER, order };
};

export const completeCurrentOrder = (order) => {
  return { type: COMPLETE_CURRENT_ORDER, order };
};

export const createNewOrder = (order) => {
  return { type: CREATE_NEW_ORDER, order };
};

// thunks
export const setOrder = (id) => {
  if (id) {
    return async (dispatch) => {
      try {
        const { data: order } = await axios.get(`/api/orders/${id}`);
        dispatch(setCurrentOrder(order));
      } catch (err) {
        console.log(err.message);
      }
    };
  } else {
    return async (dispatch) => {
      try {
        const order = {
          id: 0,
          userId: 0,
          status: "pending",
        };
        dispatch(setCurrentOrder(order));
      } catch (err) {
        console.log(err.message);
      }
    };
  }
};

export const completeOrder = (order) => {
  order.status = "complete";
  return async (dispatch) => {
    const { data: completed } = await axios.put(
      `/api/orders/${order.userId}`,
      order
    );
    dispatch(completeCurrentOrder(completed));
  };
};

export const createOrder = (user) => {
  const order = {
    userId: user.id,
    status: "pending",
  };
  return async (dispatch) => {
    const { data: newOrder } = await axios.post("/api/orders", order);
    dispatch(createNewOrder(newOrder));
  };
};

const initialState = [];

// reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_ORDER:
      return action.order;
    case COMPLETE_CURRENT_ORDER:
      return action.order;
    case CREATE_NEW_ORDER:
      return action.order;
    default:
      return state;
  }
};
