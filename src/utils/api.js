const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export function getIngridients() {
  return fetch(baseUrl).then(checkReponse);
}