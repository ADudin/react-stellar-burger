import { 
  POST_USER_REQUEST,
  POST_USER_REGISTRATION_SUCCESS,
  POST_USER_REQUEST_FAILED,
  POST_USER_LOGIN_SUCCESS,
  POST_USER_FOGOT_PASSWORD_SUCCESS,
  POST_USER_RESET_PASSWORD_SUCCESS
} from "../actions/user";

const initialState = {
  name: '',
  email: '',
  userRequest: false,
  userRequestFailed: false,
  authorized: false,
  changePasswordRequestSent: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_USER_REQUEST: {
      return { ...state, userRequest: true };
    }
    case POST_USER_REGISTRATION_SUCCESS: {
      return {
        ...state,
        userRequest: false,
        userRequestFailed: false,
        name: action.payload.user.name,
        email: action.payload.user.email,
        authorized: true
      };
    }
    case POST_USER_LOGIN_SUCCESS: {
      return {
        ...state,
        userRequest: false,
        userRequestFailed: false,
        name: action.payload.user.name,
        email: action.payload.user.email,
        authorized: true
      };
    }
    case POST_USER_FOGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        userRequest: false,
        userRequestFailed: false,
        changePasswordRequestSent: true
      };
    }
    case POST_USER_RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        userRequest: false,
        userRequestFailed: false,
        changePasswordRequestSent: false
      }
    }
    case POST_USER_REQUEST_FAILED: {
      return {
        ...state,
        userRequest: false,
        userRequestFailed: true,
        name: initialState.name,
        email: initialState.email,
        authorized: false
      };
    }
    default: {
      return state;
    }
  }
};