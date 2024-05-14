import { IPasswordData } from "../Interfaces/admin.interfaces";

export const isValidPassword = ({
  password,
  confirmPassword,
}: IPasswordData) => {
  if (!password || !confirmPassword)
    return "Os campos das senhas não podem estar vazios. Por favor, preencha-os antes de prosseguir.";

  if (password !== confirmPassword)
    return "As senhas digitadas não coincidem. Por favor, verifique a senha novamente.";

};
