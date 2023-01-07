import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userLogin: { email }, userWallet: { expenses } } = this.props;
    const total = expenses.reduce((acc, cur) => (
      acc + (+cur.value * cur.exchangeRates[cur.currency].ask)), 0);
    return (
      <div>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">{ total.toFixed(2) }</p>
        <p data-testid="header-currency-field">BRL</p>
        Header
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  userLogin: state.user,
  userWallet: state.wallet,
});

Header.propTypes = {
  userLogin: PropTypes.shape(
    { email: PropTypes.string.isRequired,
    },
  ).isRequired,
  userWallet: PropTypes.shape().isRequired,
  // dispatch: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(Header);
