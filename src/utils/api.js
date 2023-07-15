const baseUrl = 'https://norma.nomoreparties.space/api';
const ingredientsEndPoint = 'ingredients';
const orderPostEndPoint = 'orders';
const userRegistartionEndPoint = 'auth/register';
const userLoginEndPoint = 'auth/login';
const userLogoutEndPoint = 'auth/logout';
const refreshUserTokenEndPoint = 'auth/token';
const getUserEndPoint = 'auth/user';
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

export function postOrder(orderData) {
  return request(orderPostEndPoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredients: orderData
    })
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
      token: localStorage.getItem("refreshToken"),
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
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      localStorage.setItem('accessToken', refreshData.accessToken);
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
      authorization: localStorage.getItem('accessToken')
    },
  });
};