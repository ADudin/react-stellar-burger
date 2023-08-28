import { getIngredients } from "../../utils/api";
import { IIngredient } from "../types/inrgedient-type";
import { AppDispatch, AppThunk } from "../types/store-types";

export const GET_ITEMS_REQUEST: 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED: 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';
export const GET_ITEMS_FAILED_MESSAGE = 'Ошибка получения ингридиентов';

interface IGetItemsRequest {
  readonly type: typeof GET_ITEMS_REQUEST;
};

interface IGetItemsSuccess {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly payload: IIngredient[];
};

interface IGetItemsFailed {
  readonly type: typeof GET_ITEMS_FAILED;
};

export type TIngredientsActions = IGetItemsRequest
| IGetItemsSuccess
| IGetItemsFailed;

export const getItems: AppThunk = () => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: GET_ITEMS_REQUEST });
    getIngredients().then(res => {
      dispatch({
        type: GET_ITEMS_SUCCESS,
        payload: res.data
      });
    }).catch(err => {
      dispatch({
        type: GET_ITEMS_FAILED
      });
    });
  };
};