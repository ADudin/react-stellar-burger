import { 
  ADD_ITEM, 
  REMOVE_ITEM 
} from "../actions/burger-constructor";

const initialState = {
  bun: null,
  ingredients: []
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
        ingredients: [ ...state.ingredients, action.payload ]
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
        ingredients: state.ingredients.filter(item => item.key !== action.payload)
      };
    }
    default: {
      return state;
    }
  }
};