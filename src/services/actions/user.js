import { 
  postUserRegistration,
  postUserLogin,
  postUserLogout,
  postUserForgotPassword,
  postUserResetPassword,
  getUser,
  patchUserData
} from "../../utils/api";

export const POST_USER_REQUEST = 'POST_USER_REQUEST';
export const POST_USER_REGISTRATION_SUCCESS = 'POST_USER_REGISTRATION_SUCCESS';
export const POST_USER_REQUEST_FAILED = 'POST_USER_REQUEST_FAILED';
export const POST_USER_LOGIN_SUCCESS = 'POST_USER_LOGIN_SUCCESS';
export const UPDATE_USER_DATA_SUCCESS = 'UPDATE_USER_DATA_SUCCESS';
export const POST_USER_LOGOUT_SUCCESS = 'POST_USER_LOGOUT_SUCCESS';
export const POST_USER_FOGOT_PASSWORD_SUCCESS = 'POST_USER_FOGOT_PASSWORD_SUCCESS';
export const POST_USER_RESET_PASSWORD_SUCCESS = 'POST_USER_RESET_PASSWORD_SUCCESS';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';

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
        localStorage.setItem('accessToken', res.accessToken);
        localStorage.setItem('refreshToken', res.refreshToken);
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

export function logoutUser(data) {
  return function(dispatch) {
    dispatch({ type: POST_USER_REQUEST });
    postUserLogout(data).then(res => {
      if (res.success) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        dispatch({
          type: POST_USER_LOGOUT_SUCCESS
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

export function checkUserAuth() {
  return function(dispatch) {
    dispatch({ type: POST_USER_REQUEST });
    getUser().then(res => {
      if (res.success) {
        dispatch({
          type: GET_USER_SUCCESS,
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

export function updateUserData(data) {
  return function(dispatch) {
    dispatch({ type: POST_USER_REQUEST });
    patchUserData(data).then(res => {
      if (res.success) {
        dispatch({
          type: UPDATE_USER_DATA_SUCCESS,
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