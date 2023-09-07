import { 
  ADD_ITEM, 
  REMOVE_ITEM,
  MOVE_ITEM,
  RESET_ITEMS,
  TBurgerConstructorActions
} from "../actions/burger-constructor";

import { IIngredient } from "../types/inrgedient-type";

export interface IBurgerConstructorState {
  bun: null | IIngredient;
  ingredients: IIngredient[];
}

const initialState: IBurgerConstructorState = {
  bun: null,
  ingredients: []
}

export const burgerConstructorReducer = (state: IBurgerConstructorState = initialState, action: TBurgerConstructorActions) => {
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
      if (action.payload === 'bun') {
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
    case MOVE_ITEM: {
      const newItems = [...state.ingredients];
      const dragItem = newItems[action.payload.dragIndex];
      newItems.splice(action.payload.dragIndex, 1);
      newItems.splice(action.payload.hoverIndex, 0, dragItem);
      return {
        ...state,
        ingredients: newItems
      };
    }
    case RESET_ITEMS: {
      return {
        ...state,
        bun: initialState.bun,
        ingredients: initialState.ingredients
      };
    }
    default: {
      return state;
    }
  }
};