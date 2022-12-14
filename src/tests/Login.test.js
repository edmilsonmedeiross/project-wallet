import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Campos de input', () => {
  test('Verifica se os campos são corretamente', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPass = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole('button');
    expect(inputEmail).toBeInTheDocument();
    expect(inputPass).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  test('Verifica se o botão está desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
  });

  test('Verifica se, ao preencher os inputs, habilita o botão', () => {
    renderWithRouterAndRedux(<App />);
    const passEmail = 'a@a.com';
    const passPasword = '123456';
    const email = screen.getByRole('textbox');
    const passInput = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole('button');
    userEvent.type(email, passEmail);
    userEvent.type(passInput, passPasword);
    expect(button).toBeEnabled();
  });

  test('Se preenchendo 1 input corretamente desabilita o botão', () => {
    renderWithRouterAndRedux(<App />);
    const passEmail = 'test@test.com';
    const passPasword = '12345';
    const email = screen.getByRole('textbox');
    const pass = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole('button');
    userEvent.type(email, passEmail);
    userEvent.type(pass, passPasword);
    expect(button).toBeDisabled();
  });

  test('Verifica se ao preencher incorretamente, o botão é desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const failEmail = 'aa.com';
    const failPass = '12345';
    const email = screen.getByRole('textbox');
    const pass = screen.getByPlaceholderText(/password/i);
    const button = screen.getByRole('button');
    userEvent.type(email, failEmail);
    userEvent.type(pass, failPass);
    expect(button).toBeDisabled();
  });

  test('Verifica se, ao preencher apenas um dos campos, ou um dos campos incorretamente, o botão é desabilitado', () => {
    renderWithRouterAndRedux(<App />);
    const incorrectEmail = 'teste.com';
    const correctPassword = '123456';
    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/password/i);
    const enterButton = screen.getByRole('button');
    userEvent.type(emailInput, incorrectEmail);
    userEvent.type(passwordInput, correctPassword);
    expect(enterButton).toBeDisabled();
  });
});
