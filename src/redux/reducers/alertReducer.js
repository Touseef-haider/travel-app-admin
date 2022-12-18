import { SET_ALERTS } from "../actionTypes";

const initialState = [];

const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALERTS:
      return [...state, action.payload];

    default:
      return initialState;
  }
};

export default alertReducer;
