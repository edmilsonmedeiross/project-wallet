// Coloque aqui suas actions
export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const CURRENCY_REQUEST = 'CURRENCY_REQUEST';
export const LOGIN = 'LOGIN';

export const addCustomer = (value) => ({
  type: ADD_CUSTOMER,
  data: value,
});

export const requestApi = (value) => ({
  type: CURRENCY_REQUEST,
  payload: value,
});

export const login = (value) => ({
  type: LOGIN,
  payload: value,
});

export function fetchApi(paran) {
  return async (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => dispatch(requestApi(Object.keys(data)
        .filter((currency) => currency !== 'USDT'))))
      .then(() => dispatch(login(paran)));
  };
}
