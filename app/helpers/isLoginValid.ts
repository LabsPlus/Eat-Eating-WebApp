import { IUserData } from "../Interfaces/admin.interfaces";

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/;

export const isLoginValid = ({ email, password }: IUserData) => {
  if (!email || !password)
    return "Por favor, preencha todos os campos obrigatórios.";

  if (!regexEmail.test(email) || !regexPassword.test(password))
    return " Por favor, verifique seu e-mail e senha e tente novamente.";
};
