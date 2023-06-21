import { 
  ADD_ITEM, 
  REMOVE_ITEM 
} from "../actions/burger-constructor";

const initialState = {
  bun: null,
  ingridients: []
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      if (action.payload.type === 'bun') {
        return { 
          ...state, 
          bun: action.payload
        };
      }

      return { 
        ...state, 
        ingridients: [ ...state.ingridients, action.payload ]
      };
    }
    case REMOVE_ITEM: {
      if (action.payload.type === 'bun') {
        return { 
          ...state, 
          bun: initialState.bun
        };
      }

      return {
        ...state,
        ingridients: state.ingridients.filter(item => item.key !== action.payload)
      };
    }
    default: {
      return state;
    }
  }
};