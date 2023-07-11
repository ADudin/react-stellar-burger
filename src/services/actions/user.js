import { 
  postUserRegistration,
  postUserLogin,
  postUserForgotPassword,
  postUserResetPassword
} from "../../utils/api";

export const POST_USER_REQUEST = 'POST_USER_REQUEST';
export const POST_USER_REGISTRATION_SUCCESS = 'POST_USER_REGISTRATION_SUCCESS';
export const POST_USER_REQUEST_FAILED = 'POST_USER_REQUEST_FAILED';
export const POST_USER_LOGIN_SUCCESS = 'POST_USER_LOGIN_SUCCESS';
export const POST_USER_FOGOT_PASSWORD_SUCCESS = 'POST_USER_FOGOT_PASSWORD_SUCCESS';
export const POST_USER_RESET_PASSWORD_SUCCESS = 'POST_USER_RESET_PASSWORD_SUCCESS';

export function registerUser(data) {
  return function(dispatch) {
    dispatch({ type: POST_USER_REQUEST });
    postUserRegistration(data).then(res => {
      if (res.success) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({
          type: POST_USER_REGISTRATION_SUCCESS,
          payload: res
        });
      } else {
        dispatch({
          type: POST_USER_REQUEST_FAILED
        });
      }
    }).catch(err => {
      dispatch({
        type: POST_USER_REQUEST_FAILED
      });
    });
  };
};

export function loginUser(data) {
  return function(dispatch) {
    dispatch({ type: POST_USER_REQUEST });
    postUserLogin(data).then(res => {
      if (res.success) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("refreshToken", res.refreshToken);
        dispatch({
          type: POST_USER_LOGIN_SUCCESS,
          payload: res
        });
      } else {
        dispatch({
          type: POST_USER_REQUEST_FAILED
        });
      }
    }).catch(err => {
      dispatch({
        type: POST_USER_REQUEST_FAILED
      });
    });
  };
};

export function forgotUserPassword(data) {
  return function(dispatch) {
    dispatch({ type: POST_USER_REQUEST });
    postUserForgotPassword(data).then(res => {
      if (res.success) {
        dispatch({
          type: POST_USER_FOGOT_PASSWORD_SUCCESS
        });
      } else {
        dispatch({
          type: POST_USER_REQUEST_FAILED
        });
      }
    }).catch(err => {
      dispatch({
        type: POST_USER_REQUEST_FAILED
      });
    });
  };
};

export function resetUserPassword(data) {
  return function(dispatch) {
    dispatch({ type: POST_USER_REQUEST });
    postUserResetPassword(data).then(res => {
      if (res.success) {
        dispatch({
          type: POST_USER_RESET_PASSWORD_SUCCESS
        });
      } else {
        dispatch({
          type: POST_USER_REQUEST_FAILED
        });
      }
    }).catch(err => {
      dispatch({
        type: POST_USER_REQUEST_FAILED
      });
    });
  };
};