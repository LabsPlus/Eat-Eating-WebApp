import { IEmailRecovery } from "../Interfaces/admin.interfaces";
const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

export const isValidEmail = ({ email }: IEmailRecovery) => {
  if (!email)
    return "O campo de e-mail não pode estar vazio. Por favor, preencha-os antes de prosseguir";

  if (!regexEmail.test(email))
    return "O endereço de e-mail fornecido não é válido. Verifique e tente novamente.";
};
