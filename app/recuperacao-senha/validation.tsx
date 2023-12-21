import { UserData } from "./types";
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const validation = ({ email }: UserData) => {
  if (!email) return "Por favor, insira um endereço de e-mail.";

  if (!regexEmail.test(email)) return "Por favor, insira um e-mail válido.";
};
