// action names
const SET_HERO_TEXT = "SET_HERO_TEXT";

// actions
const setHeroText = (heroText) => {
  return {
    type: SET_HERO_TEXT,
    heroText,
  };
};

// thunks
export const getHeroText = (heroText) => {
  return async (dispatch) => {
    try {  
      dispatch(setHeroText(heroText));
    } catch (err) {
      console.log(err.message);
    }
  };
};

// reducer
const initialState = [];

export default (state = initialState, action) => {
    switch (action.type) {
      case SET_HERO_TEXT:
        return action.heroText;
      default:
        return state;
    }
  };