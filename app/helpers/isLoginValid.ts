import { IUserData } from "../Interfaces/admin.interfaces";

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/;

export const isLoginValid = ({ email, password }: IUserData) => {
  if (!email || !password)
    return "Os campos de e-mail e senha não podem estar vazios. Por favor, preencha-os antes de prosseguir.";

  if (!regexEmail.test(email) || !regexPassword.test(password))
    return "E-mail ou senha inválidos. Verifique e tente novamente.";
};
