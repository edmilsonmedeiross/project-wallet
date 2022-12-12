import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class WalletForm extends Component {
  state = {
    totalValue: 0,
    description: '',
  };

  render() {
    const { totalValue, description } = this.state;
    const { currencies: { currencies } } = this.props;
    // const filteredCurrencies = currencies.filter((currency) => currency !== 'USDT');
    return (
      <div>
        WalletForm
        <form>
          <label htmlFor="value">
            <input
              id="value"
              type="number"
              value={ totalValue }
              onChange={ (e) => this.setState({ totalValue: e.target.value }) }
              data-testid="value-input"
            />
          </label>
          <label htmlFor="description">
            <input
              id="description"
              type="text"
              value={ description }
              onChange={ (e) => this.setState({ description: e.target.value }) }
              data-testid="description-input"
            />
          </label>
          <select data-testid="currency-input">
            { currencies.map((currency) => (
              <option
                key={ currency }
                value={ currency }
              >
                { currency }
              </option>)) }
          </select>
          <select data-testid="method-input">
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
          <select data-testid="tag-input">
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet,
});

WalletForm.propTypes = {
  currencies: PropTypes.shape({
    currencies: PropTypes.instanceOf(Array),
  }).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
