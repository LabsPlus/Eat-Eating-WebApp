import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import UpdateUserPopover from '../app/components/update-user-popover/page';

describe('UpdateUserPopover component', () => {
  test("Verifica se os campos de entrada são renderizados corretamente", async () => {
    const { getByText, getByLabelText } = render(<UpdateUserPopover />);

    fireEvent.click(getByText("Atualizar usuário"));

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
