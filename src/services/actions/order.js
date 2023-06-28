import { postOrder } from "../../utils/api";

export const POST_ORDER_REQUEST = 'POST_ORDER_REQUEST';
export const POST_ORDER_SUCCESS = 'POST_ORDER_SUCCESS';
export const POST_ORDER_FAILED = 'POST_ORDER_FAILED';
export const POST_ORDER_FAILED_MESSAGE = 'Ошибка отправки заказа';

export function sendOrder(orderData) {
  return function(dispatch) {
    dispatch({ type: POST_ORDER_REQUEST });
    postOrder(orderData).then(res => {
      console.log(res);
      if (res.success) {
        dispatch({
          type: POST_ORDER_SUCCESS,
          payload: res.order.number
        });
      } else {
        dispatch({
          type: POST_ORDER_FAILED
        });
      }
      
    }).catch(err => {
      dispatch({
        type: POST_ORDER_FAILED
      });
    });
  };
};