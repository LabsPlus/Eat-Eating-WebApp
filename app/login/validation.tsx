import { UserData } from "./types";

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/;

export const validation = ({ email, password }: UserData) => {
  if (!email || !password)
    return "Por favor, preencha todos os campos obrigatórios.";

  if (!regexEmail.test(email) || !regexPassword.test(password))
    return " Por favor, verifique seu e-mail e senha e tente novamente.";
};
