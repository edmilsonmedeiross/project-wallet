import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import mockData from './helpers/mockData';

describe('componente Login', () => {
  test('teste se os componentes do login estão sendo renderizados', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /entrar/i });
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByTestId(/password-input/i);

    expect(button).toBeInTheDocument();
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
  });

  test('teste se é possivel escrever nos inputs e clicar no botão do login', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button', { name: /entrar/i });
    const inputEmail = screen.getByRole('textbox');
    const email = 'a@a.com';
    const inputPassword = screen.getByTestId(/password-input/i);

    userEvent.type(inputPassword, '123456');
    userEvent.type(inputEmail, email);

    expect(inputEmail.value).toBe(email);
    expect(button.disabled).toBe(false);
    userEvent.click(button);
    expect(inputPassword.value).toBe('123456');

    const title = screen.getByRole('heading', {
      name: /trybewallet/i,
    });

    expect(title).toBeInTheDocument();
  });

  test('teste se o botão fica desabilitado com senha inferior a 6 digitos', () => {
    renderWithRouterAndRedux(<App />);

    const inputPassword = screen.getByTestId(/password-input/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    const inputEmail = screen.getByRole('textbox');

    userEvent.type(inputPassword, '1234');
    userEvent.type(inputEmail, 'a@a.com');

    expect(inputEmail.value).toBe('a@a.com');
    expect(button.disabled).toBe(true);
    expect(inputPassword.value).toBe('1234');
  });

  test('teste se o botão fica desabilitado com o email errado', () => {
    renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', { name: /entrar/i });
    const inputPassword = screen.getByTestId(/password-input/i);
    const inputEmail = screen.getByRole('textbox');

    userEvent.type(inputEmail, 'aaa');
    userEvent.type(inputPassword, '123456');

    expect(inputPassword.value).toBe('123456');
    expect(inputEmail.value).toBe('aaa');
    expect(button.disabled).toBe(true);
  });
});

describe('Header', () => {
  test('teste se os dados estão na tela', () => {
    renderWithRouterAndRedux(<App />);

    const inputPassword = screen.getByTestId(/password-input/i);
    const button = screen.getByRole('button', { name: /entrar/i });
    const inputEmail = screen.getByRole('textbox');

    userEvent.type(inputEmail, 'a@a.com');
    userEvent.type(inputPassword, '123456');
    userEvent.click(button);

    const title = screen.getByRole('heading', {
      name: /trybewallet/i,
    });

    const price = screen.getByTestId(/total-field/i);
    // const emailEl = screen.getByText(/a@a\.com/i);

    expect(price).toBeInTheDocument();
    expect(title).toBeInTheDocument();
    // expect(emailEl).toBeInTheDocument();
  });
});

describe('WalletForm', () => {
  test('teste se os elementos estão na tela', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />);

    const button = screen.getByRole('button', { name: /entrar/i });
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByTestId(/password-input/i);

    userEvent.type(inputEmail, 'a@a.com');
    userEvent.type(inputPassword, '123456');
    userEvent.click(button);

    expect(global.fetch).toHaveBeenCalledWith('https://economia.awesomeapi.com.br/json/all');
    expect(global.fetch).toHaveBeenCalledTimes(1);

    const buttonAdd = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    const descriptionEl = screen.getByRole('textbox');
    const brlEl = screen.getByText(/brl/i);

    expect(descriptionEl).toBeInTheDocument();
    expect(buttonAdd).toBeInTheDocument();
    expect(brlEl).toBeInTheDocument();
  });
  // coment
});
