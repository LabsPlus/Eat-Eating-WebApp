import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Popover from "../app/dashboard/gerenciar-usuarios/add-user/AddUser";

describe("Popover Component", () => {
  test("Renderizando o nome do botão", () => {
    const { getByText } = render(<Popover />);
    expect(getByText("Adicionar usuários")).toBeInTheDocument();
  });

  test("Verificando se o modal abre ao clicar no botão", async () => {
    const { getByText, getByTestId } = render(<Popover />);
    fireEvent.click(getByText("Adicionar usuários"));
    await waitFor(() => {
      expect(getByTestId("modal")).toBeInTheDocument();
    });
  });

  test('Verificando se o modal fecha ao clicar no botão "Cancelar"', async () => {
    const { getByText } = render(<Popover />);
    fireEvent.click(getByText("Adicionar usuários"));
    fireEvent.click(getByText("Cancelar"));
  });

  test("Verifica se os campos de entrada são renderizados corretamente", async () => {
    const { getByText, getByLabelText } = render(<Popover />);

    fireEvent.click(getByText("Adicionar usuários"));

    // Primeira etapa
    const nameInput = getByLabelText("Nome completo") as HTMLInputElement;
    const selectCategoria = getByText("Usuário") as HTMLInputElement;
    const typeStudentGrantIdInput = getByText("Bolsa") as HTMLSelectElement;
    const enrollmentInput = getByLabelText("Matrícula") as HTMLInputElement;
    const dailyMealsInput = getByLabelText(
      "Refeições diárias"
    ) as HTMLInputElement;

    expect(nameInput).toBeInTheDocument();
    expect(selectCategoria).toBeInTheDocument();
    expect(typeStudentGrantIdInput).toBeInTheDocument();
    expect(enrollmentInput).toBeInTheDocument();
    expect(dailyMealsInput).toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: "João Silva" } });
    fireEvent.change(selectCategoria, { target: { value: "FUNCIONARIO" } });
    fireEvent.change(typeStudentGrantIdInput, {
      target: { value: "INTEGRAL" },
    });
    fireEvent.change(enrollmentInput, { target: { value: "123456" } });
    fireEvent.change(dailyMealsInput, { target: { value: "2" } });

    expect(nameInput.value).toBe("João Silva");
    expect(selectCategoria.value).toBe("FUNCIONARIO");
    expect(typeStudentGrantIdInput.value).toBe("INTEGRAL");
    expect(enrollmentInput.value).toBe("123456");
    expect(dailyMealsInput.value).toBe("2");

    // Segunda etapa
    const nextButton = getByText("Próximo");
    fireEvent.click(nextButton);

    await waitFor(() => {
      const emailInput = getByLabelText("E-mail") as HTMLInputElement;
      const passwordInput = getByLabelText("Senha") as HTMLInputElement;
      const recoveryEmailInput = getByLabelText(
        "E-mail de Recuperação"
      ) as HTMLInputElement;

      expect(emailInput).toBeInTheDocument();
      expect(passwordInput).toBeInTheDocument();
      expect(recoveryEmailInput).toBeInTheDocument();

      fireEvent.change(emailInput, { target: { value: "joao@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "senha123" } });
      fireEvent.change(recoveryEmailInput, {
        target: { value: "recovery@example.com" },
      });

      expect(emailInput.value).toBe("joao@example.com");
      expect(passwordInput.value).toBe("senha123");
      expect(recoveryEmailInput.value).toBe("recovery@example.com");
    });
  });
});
