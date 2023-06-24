import { getIngredients } from "../../utils/api";

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export function getItems() {
  return function(dispatch) {
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