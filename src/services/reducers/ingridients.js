import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED
} from "../actions/ingridients";

const initialState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

export const ingridientsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true
      };
    }
    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsRequest: false,
        itemsFailed: false,
        items: action.payload
      };
    }
    case GET_ITEMS_FAILED: {
      return {
        itemsRequest: false,
        itemsFailed: true,
        items: initialState.items
      };
    }
    default: {
      return state;
    }
  }
};