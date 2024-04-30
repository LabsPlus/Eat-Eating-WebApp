import { IPasswordData } from "../Interfaces/admin.interfaces";
const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/;

export const isValidPassword = ({
  password,
  confirmPassword,
}: IPasswordData) => {
  if (!password) return "Os campos das senhas não podem estar vazios. Por favor, preencha-os antes de prosseguir.";

  if (!regexPassword.test(password))
    return "A senha deve conter entre 6 e 10 caracteres, incluindo pelo menos um número, uma letra maiúscula e uma minúscula.";

  if (password !== confirmPassword) return "As senhas digitadas não coincidem. Por favor, verifique a senha novamente.";
};
