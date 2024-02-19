"use client";
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import UserManager from "../app/dashboard/gerenciar-usuarios/page";

describe("UserManager component", () => {
  test("renders correctly", () => {
    render(<UserManager />);

    expect(screen.getByText("Gerenciamento de Usuarios")).toBeInTheDocument();
  });
});
