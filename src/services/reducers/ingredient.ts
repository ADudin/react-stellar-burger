import { 
  SHOW_ITEM,
  HIDE_ITEM,
  TIngredientActions
} from "../actions/ingredient";

import { IIngredient } from "../types/inrgedient-type";

export interface IIngredientState {
  currentItem: IIngredient;
};

const initialState: IIngredientState = {
  currentItem: {
    calories: 0,
    carbohydrates: 0,
    fat: 0,
    image: '',
    image_large: '',
    image_mobile: '',
    key: '',
    name: '',
    price: 0,
    proteins: 0,
    type: '',
    __v: 0,
    _id: '',
  }
};

export const ingredientReducer = (state: IIngredientState = initialState, action: TIngredientActions) => {
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