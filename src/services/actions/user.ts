import { 
  postUserRegistration,
  postUserLogin,
  postUserLogout,
  postUserForgotPassword,
  postUserResetPassword,
  getUser,
  patchUserData
} from "../../utils/api";

import { TOKENS } from "../../utils/data";

import { 
  IUserRegistrationPostData,
  IUserLoginPostData,
  IUserLogoutPostData,
  IUserFogotPasswordPostData,
  IUserResetPasswordPostData,
  IUserPatchData,
  IUserRegistrationResponseData,
  IUserUpdateResponseData
} from "../types/user-types";

import { AppDispatch, AppThunk } from "../types/store-types";

export const POST_USER_REQUEST: 'POST_USER_REQUEST' = 'POST_USER_REQUEST';
export const POST_USER_REGISTRATION_SUCCESS: 'POST_USER_REGISTRATION_SUCCESS' = 'POST_USER_REGISTRATION_SUCCESS';
export const POST_USER_REQUEST_FAILED: 'POST_USER_REQUEST_FAILED' = 'POST_USER_REQUEST_FAILED';
export const POST_USER_LOGIN_SUCCESS: 'POST_USER_LOGIN_SUCCESS' = 'POST_USER_LOGIN_SUCCESS';
export const UPDATE_USER_DATA_SUCCESS: 'UPDATE_USER_DATA_SUCCESS' = 'UPDATE_USER_DATA_SUCCESS';
export const POST_USER_LOGOUT_SUCCESS: 'POST_USER_LOGOUT_SUCCESS' = 'POST_USER_LOGOUT_SUCCESS';
export const POST_USER_FOGOT_PASSWORD_SUCCESS: 'POST_USER_FOGOT_PASSWORD_SUCCESS' = 'POST_USER_FOGOT_PASSWORD_SUCCESS';
export const POST_USER_RESET_PASSWORD_SUCCESS: 'POST_USER_RESET_PASSWORD_SUCCESS' = 'POST_USER_RESET_PASSWORD_SUCCESS';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';

interface IPostUserRequest {
  readonly type: typeof POST_USER_REQUEST;
};

interface IPostUserRegistrationSuccess {
  readonly type: typeof POST_USER_REGISTRATION_SUCCESS;
  readonly payload: IUserRegistrationResponseData;
};

interface IPostUserRequestFailed {
  readonly type: typeof POST_USER_REQUEST_FAILED;
};

interface IPostUserLoginSuccess {
  readonly type: typeof POST_USER_LOGIN_SUCCESS;
  readonly payload: IUserRegistrationResponseData;
};

interface IUpdateUserDataSuccess {
  readonly type: typeof UPDATE_USER_DATA_SUCCESS;
  readonly payload: IUserUpdateResponseData;
};

interface IPostUserLogoutSuccess {
  readonly type: typeof POST_USER_LOGOUT_SUCCESS;
};

interface IPostUserFogotPasswordSuccess {
  readonly type: typeof POST_USER_FOGOT_PASSWORD_SUCCESS;
};

interface IPostUserResetPasswordSuccess {
  readonly type: typeof POST_USER_RESET_PASSWORD_SUCCESS;
};

interface IGetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload: IUserRegistrationResponseData;
};

export type TUserActions = IPostUserRequest
| IPostUserRegistrationSuccess
| IPostUserRequestFailed
| IPostUserLoginSuccess
| IUpdateUserDataSuccess
| IPostUserLogoutSuccess
| IPostUserFogotPasswordSuccess
| IPostUserResetPasswordSuccess
| IGetUserSuccess;

export const registerUser: AppThunk = (data: IUserRegistrationPostData) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: POST_USER_REQUEST });
    postUserRegistration(data).then(res => {
      if (res.success) {
        localStorage.setItem(TOKENS.accessToken, res.accessToken);
        localStorage.setItem(TOKENS.refreshToken, res.refreshToken);
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

export const loginUser: AppThunk = (data: IUserLoginPostData) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: POST_USER_REQUEST });
    postUserLogin(data).then(res => {
      if (res.success) {
        localStorage.setItem(TOKENS.accessToken, res.accessToken);
        localStorage.setItem(TOKENS.refreshToken, res.refreshToken);
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

export const logoutUser: AppThunk = (data: IUserLogoutPostData) => {
  return function(dispatch: AppDispatch) {
    dispatch({ type: POST_USER_REQUEST });
    postUserLogout(data).then(res => {
      if (res.success) {
        localStorage.removeItem(TOKENS.accessToken);
        localStorage.removeItem(TOKENS.refreshToken);
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

export const forgotUserPassword: AppThunk = (data: IUserFogotPasswordPostData) => {
  return function(dispatch: AppDispatch) {
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

export const resetUserPassword: AppThunk = (data: IUserResetPasswordPostData) => {
  return function(dispatch: AppDispatch) {
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

export const checkUserAuth: AppThunk = () => {
  return function(dispatch: AppDispatch) {
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

export const updateUserData: AppThunk = (data: IUserPatchData) => {
  return function(dispatch: AppDispatch) {
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