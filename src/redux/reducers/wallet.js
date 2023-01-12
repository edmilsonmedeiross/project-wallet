// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { CURRENCY_REQUEST, ADD_CUSTOMER,
  EXPENSES_DELETED_ID, EXPENSES_EDIT_SAVE, EXPENSES_EDIT } from '../actions';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  totalExpensesSum: 0,
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
  case EXPENSES_DELETED_ID:
    return {
      ...state,
      expenses: action.payload,
    };

  case EXPENSES_EDIT_SAVE:
    return {
      ...state,
      idToEdit: action.payload,
      editor: true,
    };

  case EXPENSES_EDIT:
    return {
      ...state,
      expenses: state.expenses
        .map((expense) => (expense.id === Number(state.idToEdit)
          ? ({ id: expense.id, ...action.payload, exchangeRates: expense.exchangeRates })
          : expense)),
      editor: false,
    };

  default:
    return state;
  }
}

export default walletPerson;
