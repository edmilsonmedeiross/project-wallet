// Coloque aqui suas actions
export const ADD_CUSTOMER = 'ADD_CUSTOMER';
export const WALLET = 'WALLET';
export const LOGIN = 'LOGIN';

export const addCustomer = (value) => ({
  type: ADD_CUSTOMER,
  data: value,
});

export const deleteCustomer = (value) => ({
  type: WALLET,
  value,
});

export const login = (value) => ({
  type: LOGIN,
  value,
});
