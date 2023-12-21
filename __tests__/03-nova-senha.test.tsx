import "@testing-library/jest-dom";
import React from "react";

import { render, screen } from "@testing-library/react";
import NewPassword from "../app/nova-senha/page";

describe("NewPassword", () => {
  test("Verificando se as imagens laterais estão sendo renderizadas", async () => {
    render(<NewPassword />);
    expect(screen.getAllByAltText("IFBa"));
  });

  test("Verificando se o texto Recuperar senha está sendo rederizado", async () => {
    render(<NewPassword />);
    expect(screen.getByText("Recuperar senha")).toBeInTheDocument();
  });

  test("Verificando se os campos de entrado (input) do senha e confirmar senha estão sendo rederizandos na tela", async () => {
    render(<NewPassword />);
    expect(
      screen.getByPlaceholderText("Digite sua nova senha")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Confirme sua senha")
    ).toBeInTheDocument();
  });

  test("Verificando se o botão de registrar a nova senha esta sendo renderizado na tela ", async () => {
    render(<NewPassword />);
    const btnRegistrar = screen.getByRole("button", { name: "Registrar" });
    expect(btnRegistrar).toBeInTheDocument();
  });
});
