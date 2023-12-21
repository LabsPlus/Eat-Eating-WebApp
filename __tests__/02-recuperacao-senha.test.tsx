import "@testing-library/jest-dom";
import React from "react";

import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RecoverPassword from "../app/recuperacao-senha/page";

describe("RecoverPassword", () => {
  test("Verificando se as imagens laterais estão sendo renderizadas", async () => {
    render(<RecoverPassword />);
    const images = screen.getAllByAltText("IFBa");
    expect(images.length).toBe(2);
  });

  test("Verificando se ao clicar no botão voltar a rota funcionará", () => {
    render(<RecoverPassword />);

    const btnToGoBack = screen.getByRole("link");
    expect(btnToGoBack.getAttribute("href")).toEqual("/login");
  });

  test("Verificando se o texto Recuperar senha está sendo rederizado", async () => {
    render(<RecoverPassword />);
    expect(screen.getByText("Recuperar senha")).toBeInTheDocument();
  });

  test("Verificando se o campo de entrado (input) do email está rederizando na tela", async () => {
    render(<RecoverPassword />);
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });

  test("Verificando se o botão de enviar o email está renderizando na tela ", async () => {
    render(<RecoverPassword />);
    const btnEnviar = screen.getByRole("button", { name: "Enviar" });
    expect(btnEnviar).toBeInTheDocument();
  });

  // test("Verifica se o email é enviado ao preencher o formulário corretamente", async () => {
  //   render(<RecoverPassword />);
  //   const emailInput = screen.getByPlaceholderText("Email");
  //   const sendButton = screen.getByRole("button", { name: "Enviar" });

  //   fireEvent.change(emailInput, { target: { value: "user@gmail.com" } });
  //   fireEvent.click(sendButton);

  //   await waitFor(() => {
  //     const errorMessage = screen.getByText("Email enviado com sucesso!", { exact: false });
  //     expect(errorMessage).toBeInTheDocument();
  //   });
  // });

  // test("Verifica se o email não é enviado ao preencher o formulário com um email inválido", async () => {
  //   render(<RecoverPassword />);
  //   const emailInput = screen.getByPlaceholderText("Email");
  //   const sendButton = screen.getByRole("button", { name: "Enviar" });

  //   fireEvent.change(emailInput, { target: { value: "emailinvalido" } });
  //   fireEvent.click(sendButton);

  //   await waitFor(() => {
  //     const errorMessage = screen.getByText(
  //       "Por favor, insira um email válido.",
  //       { exact: false }
  //     );
  //     expect(errorMessage).toBeInTheDocument();
  //   });
  // });
});
