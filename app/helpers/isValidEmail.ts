import { IEmailRecovery } from "../Interfaces/admin.interfaces";
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const isValidEmail = ({ email }: IEmailRecovery) => {
  if (!email) return "Por favor, insira um endereço de e-mail.";

  if (!regexEmail.test(email)) return "Por favor, insira um e-mail válido.";
};
