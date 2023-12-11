import "@testing-library/jest-dom";
import React from "react";
// import { render, screen } from "@testing-library/react";

import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "../app/login/page";

describe("LoginForm", () => {
  test("it should have text 'Insira seu e-mail e senha para iniciar!'", () => {
    render(<LoginForm />);
    expect(
      screen.getByText(/Insira seu e-mail e senha para iniciar!/i)
    ).toBeInTheDocument();
  });

  test("it should have input login", () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
  });

  test("it should have input senha", () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText(/senha/i)).toBeInTheDocument();
  });

  test("it should have a text manter conectado", () => {
    render(<LoginForm />);
    expect(screen.getByText(/manter conectado/i)).toBeInTheDocument();
  });

  test("it should have a link esqueceu a senha", () => {
    render(<LoginForm />);
    const btnEsqueciSenha = screen.getByText("Esqueceu sua senha?");
    expect(btnEsqueciSenha.getAttribute("href")).toEqual("/recuperacao-senha");
  });

  test("it should have a button login", () => {
    render(<LoginForm />);
    const btnLogin = screen.getByRole("button", {
      name: "Login",
    });
    expect(btnLogin).toBeInTheDocument();
  });

  test("it should have a text 'Bem-vindo!' ", () => {
    render(<LoginForm />);
    expect(screen.getByText(/bem-vindo/i)).toBeInTheDocument();
  });

  test("it should have a text 'Entre e inicie essa jornada conosco' ", () => {
    render(<LoginForm />);
    expect(
      screen.getByText(/entre e inicie essa jornada conosco/i)
    ).toBeInTheDocument();
  });
});
