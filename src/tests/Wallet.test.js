import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes de Route e tela da Wallet', () => {
  test('Verifica se após o login é redirecionado para a rota /carteira', () => {
    renderWithRouterAndRedux(<App />);

    const passEmail = 'a@a.com';
    const passPasword = '123456';
    const email = screen.getByRole('textbox');
    const pass = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole('button');

    userEvent.type(email, passEmail);
    userEvent.type(pass, passPasword);
    userEvent.click(button);

    const total = screen.getByText(/0\.00/i);
    const currency = screen.getByText(/brl/i);
    const inputDesc = screen.getByTestId('description-input');
    const inputVal = screen.getByTestId('value-input');
    const inputCurrency = screen.getByTestId('currency-input');
    const inputTag = screen.getByTestId('tag-input');
    const inputMethod = screen.getByTestId('method-input');

    expect(currency).toBeInTheDocument();
    expect(inputCurrency).toBeInTheDocument();
    expect(total).toBeInTheDocument();
    expect(inputVal).toBeInTheDocument();
    expect(inputDesc).toBeInTheDocument();
    expect(inputTag).toBeInTheDocument();
    expect(inputMethod).toBeInTheDocument();
  });
});
