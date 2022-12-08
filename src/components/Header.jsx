import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { userLogin: { email } } = this.props;
    return (
      <div>
        <h4 data-testid="email-field">{ email }</h4>
        <h4 data-testid="total-field">0</h4>
        <h4 data-testid="header-currency-field">BRL</h4>
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
  // dispatch: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(Header);
