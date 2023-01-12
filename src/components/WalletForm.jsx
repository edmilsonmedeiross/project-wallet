import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { globalFetchApi, expenseEdit } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  handleInputChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  clearForm = () => {
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  editForm = () => {
    const { dispatch } = this.props;
    dispatch(expenseEdit(this.state));
    this.clearForm();
  };

  handleClickButton = () => {
    const { value, description, currency, method, tag } = this.state;
    const { dispatch, expenses } = this.props;

    const expense = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
    };

    dispatch(globalFetchApi(expense));
    this.clearForm();
  };

  render() {
    const { value, description, method, tag } = this.state;
    const {
      currencies: { currencies }, editor,
    } = this.props;
    // const filteredCurrencies = currencies.filter((currency) => currency !== 'USDT');
    return (
      <div>
        WalletForm
        <form>
          <label htmlFor="value">
            <input
              id="value"
              name="value"
              type="number"
              value={ value }
              onChange={ this.handleInputChange }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            <input
              id="description"
              name="description"
              type="text"
              value={ description }
              onChange={ this.handleInputChange }
              data-testid="description-input"
            />
          </label>
          <select
            data-testid="currency-input"
            name="currency"
            onChange={ this.handleInputChange }
          >
            {currencies.map((el) => (
              <option key={ el } value={ el }>
                {el}
              </option>
            ))}
          </select>
          <select
            onChange={ this.handleInputChange }
            name="method"
            data-testid="method-input"
            value={ method }
          >
            <option defaultValue="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select
            name="tag"
            data-testid="tag-input"
            onChange={ this.handleInputChange }
            value={ tag }
          >
            <option defaultValue="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </form>
        <button
          type="button"
          onClick={ editor ? this.editForm : this.handleClickButton }
        >
          { editor ? 'Editar Despesa' : 'Adicionar despesa' }
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
});

WalletForm.propTypes = {
  editor: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.instanceOf(Array).isRequired,
  currencies: PropTypes.shape({
    currencies: PropTypes.instanceOf(Array),
  }).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
