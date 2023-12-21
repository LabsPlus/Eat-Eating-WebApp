"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import React from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface AuthContextProps {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  login: (
    userData: { email: string; password: string },
    remember: boolean
  ) => void;
  logout: () => void;
}

const AppContext = createContext<AuthContextProps | undefined>({
  user: null,
  setUser: () => {},
  login: async () => {},
  logout: () => {},
});

export function AuthContext({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    const sessionUser = JSON.parse(sessionStorage.getItem("user") || "null");
    storedUser ? setUser(storedUser) : setUser(sessionUser);
  }, []);

  const login = async (userData: { email: string }, remember: boolean) => {
    try {
      const response = await axios.post(`http://localhost:3000/auth`, userData);
      const { user, token, refreshToken } = response.data;

      if (remember) {
        localStorage.setItem("user", JSON.stringify(user.email));
        localStorage.setItem("token", JSON.stringify(token.token));
        localStorage.setItem(
          "refreshToken",
          JSON.stringify(refreshToken.refreshToken)
        );
      } else {
        sessionStorage.setItem("user", JSON.stringify(user.email));
        sessionStorage.setItem("token", JSON.stringify(token.token));
        sessionStorage.setItem(
          "refreshToken",
          JSON.stringify(refreshToken.refreshToken)
        );
      }

      setUser(user.email);

      toast.success("Autenticação bem-sucedida. Bem-vindo!");
      router.push("/dashboard");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data);
      } else {
        toast.error(
          "Error desconocido durante el login. Por favor, inténtelo de nuevo."
        );
      }
      console.error("Error durante el login", error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AppContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useAuthContext must be used within an AuthContext provider"
    );
  }

  return context;
}
