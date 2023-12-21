import { UserData } from "./types";
const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/;

export const validation = ({ password, confirmPassword }: UserData) => {
  if (!password) return "Por favor, insira sua nova senha.";

  if (!regexPassword.test(password))
    return "A senha deve conter entre 6 e 10 caracteres, incluindo pelo menos um número, uma letra maiúscula e uma minúscula.";

  if (password !== confirmPassword) return "As senhas não coincidem.";
};
