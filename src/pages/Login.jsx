import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchApi } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
  };

  render() {
    const { email, password } = this.state;
    const { history, dispatch } = this.props;
    return (
      <main>
        Login
        <input
          required
          type="text"
          onChange={ (e) => this.setState({ email: e.target.value }) }
          placeholder="E-mail"
          data-testid="email-input"
        />
        <input
          type="password"
          onChange={ (e) => this.setState({ password: e.target.value }) }
          placeholder="password"
          data-testid="password-input"
        />
        <button
          type="button"
          disabled={ password.length < +'6' || !email.match(
            /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm,
          ) }
          onClick={ () => { dispatch(fetchApi(email)); history.push('/carteira'); } }
        >
          Entrar
        </button>
      </main>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape(
    { push: PropTypes.func.isRequired,
    },
  ).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
