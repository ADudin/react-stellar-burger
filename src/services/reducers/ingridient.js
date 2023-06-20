import { 
  SHOW_ITEM,
  HIDE_ITEM
} from "../actions/ingridient";

const initialState = {
  currentItem: {}
}

export const ingridientReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ITEM: {
      return { ...state, currentItem: action.payload };
    }
    case HIDE_ITEM: {
      return { ...state, currentItem: initialState.currentItem };
    }
    default: {
      return state;
    }
  }
};