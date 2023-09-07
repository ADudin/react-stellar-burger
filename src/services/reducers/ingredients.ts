import {
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_ITEMS_FAILED,
  TIngredientsActions
} from "../actions/ingredients";

import { IIngredient } from "../types/inrgedient-type";

export interface IIngredientsState {
  items: IIngredient[];
  itemsRequest: boolean;
  itemsFailed: boolean;
}

const initialState: IIngredientsState = {
  items: [],
  itemsRequest: false,
  itemsFailed: false,
};

export const ingredientsReducer = (state: IIngredientsState = initialState, action: TIngredientsActions) => {
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
        ...state,
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