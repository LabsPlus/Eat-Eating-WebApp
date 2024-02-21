"use client";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import UserManager from "../app/dashboard/gerenciar-usuarios/page";

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(),
      removeListener: jest.fn(),
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
});

afterAll(() => {
  jest.clearAllMocks();
});

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    pathname: "/",
    query: "",
    asPath: "/",
  }),
}));

jest.mock("../app/components/PrivateRoute/PrivateRoute", () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe("UserManager component", () => {
  test("Verificando se está renderizando corretamente", () => {
    render(<UserManager />);

    expect(screen.getByText("Gerenciamento de Usuarios")).toBeInTheDocument();
  });

  test("Verificando se exibe a data atual", () => {
    render(<UserManager />);

    const currentDate = new Date();
    const dateFormatter = new Intl.DateTimeFormat("pt-BR");
    const formattedDate = dateFormatter.format(currentDate);

    expect(screen.getByText(formattedDate)).toBeInTheDocument();
  });

  test("Renderizando os componentes filhos", async () => {
    render(<UserManager />);

    await waitFor(
      () => {
        expect(screen.getByTestId("search-component")).toBeInTheDocument();
      },
      { timeout: 15000 }
    );

    await waitFor(() => {
      expect(screen.getByTestId("popover-component")).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByTestId("pagination-component")).toBeInTheDocument();
    });
  });
});
