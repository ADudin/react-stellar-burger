import { TOKENS } from "./data";

const baseUrl = 'https://norma.nomoreparties.space/api';
const ingredientsEndPoint = 'ingredients';
const orderGetEndPoint = 'orders';
const orderPostEndPoint = 'orders';
const userRegistartionEndPoint = 'auth/register';
const userLoginEndPoint = 'auth/login';
const userLogoutEndPoint = 'auth/logout';
const refreshUserTokenEndPoint = 'auth/token';
const getUserEndPoint = 'auth/user';
const updateUserDataEndPoint = 'auth/user';
const forgotPasswordEndPoint = 'password-reset';
const resetPasswordEndPoint = 'password-reset/reset';

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

function request(endpoint, options) {
  return fetch(`${baseUrl}/${endpoint}`, options).then(checkReponse);
}

export function getIngredients() {
  return request(ingredientsEndPoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

export function postUserRegistration(data) {
  return request(userRegistartionEndPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password,
      name: data.name
    })
  });
};

export function postUserLogin(data) {
  return request(userLoginEndPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: data.email,
      password: data.password
    })
  });
};

export function postUserLogout(data) {
  return request(userLogoutEndPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: data
    })
  });
};

export function postUserForgotPassword(data) {
  return request(forgotPasswordEndPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: data.email
    })
  });
};

export function postUserResetPassword(data) {
  return request(resetPasswordEndPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password: data.password,
      token: data.token
    })
  });
};

export const refreshToken = () => {
  return request(refreshUserTokenEndPoint, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem(TOKENS.refreshToken),
    })
  });
};

export const fetchWithRefresh = async (endpoint, options) => {
  try {
    return await request(endpoint, options);
  } catch (err) {
    if (err.message === 'jwt expired') {
      const refreshData = await refreshToken(); //обновляем токен
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem(TOKENS.refreshToken, refreshData.refreshToken);
      localStorage.setItem(TOKENS.accessToken, refreshData.accessToken);
      options.headers.authorization = refreshData.accessToken;
      return await request(endpoint, options); // повторяем запрос
    } else {
      return Promise.reject(err);
    }
  }
};

export function getUser() {
  return fetchWithRefresh(getUserEndPoint, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem(TOKENS.accessToken)
    },
  });
};

export function patchUserData(data) {
  return fetchWithRefresh(updateUserDataEndPoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem(TOKENS.accessToken)
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      password: data.password
    })
  });
};

export function postOrder(orderData) {
  return fetchWithRefresh(orderPostEndPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem(TOKENS.accessToken)
    },
    body: JSON.stringify({
      ingredients: orderData
    })
  });
};

export function getOrder(orderNumber) {
  return request(`${orderGetEndPoint}/${orderNumber}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
};