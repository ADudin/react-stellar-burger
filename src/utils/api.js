const baseUrl = 'https://norma.nomoreparties.space/api';
const ingredientsEndPoint = 'ingredients';
const orderPostEndPoint = 'orders';
const userRegistartionEndPoint = 'auth/register';
const userLoginEndPoint = 'auth/login';
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