// Coloque aqui suas actions
export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const CURRENCY_REQUEST = 'CURRENCY_REQUEST';
export const LOGIN = 'LOGIN';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const EXPENSES_DELETED_ID = 'EXPENSES_DELETED_ID';
export const EXPENSES_EDIT = 'EXPENSES_EDIT';
export const EXPENSES_EDIT_SAVE = 'EXPENSES_EDIT_SAVE';

export const addExpenses = (value) => ({
  type: ADD_CUSTOMER,
  payload: value,
});

export const requestApi = (value) => ({
  type: CURRENCY_REQUEST,
  payload: value,
});

export const login = (value) => ({
  type: LOGIN,
  payload: value,
});

export const exchangeRatesFetch = (value) => ({
  type: ADD_EXPENSE,
  payload: value,
});

export const expenseDelete = (expensesDeleted) => ({
  type: EXPENSES_DELETED_ID,
  payload: expensesDeleted,
});

export const expenseEdit = (value) => ({
  type: EXPENSES_EDIT,
  payload: value,
});

export const expenseEditSave = (value) => ({
  type: EXPENSES_EDIT_SAVE,
  payload: value,
});

export function globalFetchApi(infos) {
  return async (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => delete data.USDT
      && dispatch(addExpenses({ ...infos, exchangeRates: data })));
  };
}

export function fetchApi(paran) {
  return async (dispatch) => {
    fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((data) => dispatch(requestApi(Object.keys(data)
        .filter((currency) => currency !== 'USDT'))))
      .then(() => dispatch(login(paran)));
  };
}
