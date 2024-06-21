"use client";

import React, { useState } from "react";
import { Button } from "antd";
import axios from "axios";

import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

import PasswordValidationChecklist from "../components/PasswordValidationChecklist/PasswordValidationChecklist";
import PasswordInput from "../components/Inputs/PasswordInput/PasswordInput";
import ExternalPages from "../components/Layout/ExternalPages";

import { IPasswordData } from "../Interfaces/admin.interfaces";
import { isValidPassword } from "../helpers/isValidPassword";
import { errorToast, successToast,} from "../services/toast-messages/toast-messages";

import styles from "./page.module.css";

const NewPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter();
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordData, setPasswordData] = useState<IPasswordData>({
    password: "",
    confirmPassword: "",
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialCharacter: false,
  });

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;
    const updatedPasswordData = { ...passwordData, [field]: value };
    updatedPasswordData.length = value.length >= 8 && value.length <= 15;
    updatedPasswordData.lowercase = /[a-z]/.test(value);
    updatedPasswordData.uppercase = /[A-Z]/.test(value);
    updatedPasswordData.number = /\d/.test(value);
    updatedPasswordData.specialCharacter =
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value);

    setPasswordData(updatedPasswordData);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regexPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,15}$/;

    const response = isValidPassword(passwordData);
    if (response) {
      return errorToast(response);
    }

    if (!regexPassword.test(passwordData.password)) {
      return; 
    }

    try {
      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_URL}/login/update-password-login`,
        {
          newPassword: passwordData.password,
          token: token,
        }
      );
      successToast("Senha alterada com sucesso.");
      setPasswordData({
        password: "",
        confirmPassword: "",
        length: false,
        lowercase: false,
        uppercase: false,
        number: false,
        specialCharacter: false,
      });
      router.push("/login");
    } catch (error) {
      console.error("Erro ao enviar o email:", error);
    }
  };

  return (
    <ExternalPages
      className="messageNewPassword" 
      titleMessage="Importante!"
      message="Seguir as recomendações do check-list ajudará a proteger suas informações pessoais e evitar acessos não autorizados."
    >
      <Link href="/login" className={styles.btnToGoBack}>
          <Image
            src="/images/icon-arrow-back.svg"
            alt="Seta horizontal para esquerda"
            width={24}
            height={24}
          />
        </Link>

        <h2 className={styles.title}>Recuperar senha</h2>

        <div className={styles.inputContainer}>
          <PasswordInput 
            value={passwordData.password}
            urlIcon="/images/icon-padlock-form.svg"
            altImage="Ícone de um cadeado para o formulário de senha"
            placeholder="Digite sua nova senha"
            handleChange={(e) => handlePasswordChange(e, "password")}
          />

          <PasswordValidationChecklist validations={passwordData} />
          
          <PasswordInput 
              value={passwordData.confirmPassword}
              urlIcon="/images/icon-padlock-form.svg"
              altImage="Ícone de um cadeado para o formulário de senha"
              placeholder="Confirme sua senha"
              handleChange={(e) => handlePasswordChange(e, "confirmPassword")}
          />
        </div>

        <div className={styles.divButton}>
          <Button
            type="primary"
            onClick={(e: React.MouseEvent<HTMLFormElement>) =>
              handleSubmit(e)
            }
          >
            Enviar
          </Button>
        </div>
   
    </ExternalPages>
  );
};

export default NewPassword;
