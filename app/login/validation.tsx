import { UserData } from "./types";

const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const regexPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,10}$/;

export const validation = ({ email, password }: UserData) => {
  if (!regexEmail.test(email)) return "Por favor, insira um e-mail válido.";
  if (!regexPassword.test(password))
    return "Por favor, insira uma senha válida.";
};
