// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCY_REQUEST, ADD_CUSTOMER, ADD_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
};

function walletPerson(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CURRENCY_REQUEST:
    return {
      ...state,
      currencies: action.payload,
    };
  case ADD_CUSTOMER:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
    };
  default:
    return state;
  }
}

export default walletPerson;
