import { postOrder } from "../../utils/api";

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';

export function sendOrder(orderData) {
  return function(dispatch) {
    dispatch({ type: POST_ORDER_REQUEST });
    postOrder(orderData).then(res => {
      dispatch({
        type: POST_ORDER_SUCCESS,
        payload: res.order.number
      });
    }).catch(err => {
      dispatch({
        type: POST_ORDER_FAILED
      });
    });
  };
};