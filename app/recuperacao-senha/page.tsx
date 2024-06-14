"use client";
import React, { useState } from "react";
import { UserOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Input, message } from "antd";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { IEmailRecovery } from "../Interfaces/admin.interfaces";
import { isValidEmail } from "../helpers/isValidEmail";
import { errorToast, successToast } from "../services/toast-messages/toast-messages";
import ExternalPages from "../components/Layout/ExternalPages";
import TextInput from "../components/Inputs/TextInput/TextInput";

const RecoverPassword = () => {
  const [emailData, setEmailData] = useState<IEmailRecovery>({
    email: "",
  });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailValue = e.target.value;

    setEmailData({
      ...emailData,
      email: emailValue,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = isValidEmail(emailData);

    try {
      if (response) {
        return errorToast(response);
      } else {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/login/forgot-password-login`,
          {
            email: emailData.email,
          }
        );

        setEmailData({ email: "" });
        successToast("E-mail enviado com sucesso.");
        console.log("Resposta:", response.data);
      }
    } catch (error: any) {
      console.log(error);
      console.log(
        "Error de e-mail não encontrado" + error.response.data.message
      );
      if (error.response.data.message === "User not found")
        errorToast(
          "O endereço de e-mail fornecido não é válido. Verifique e tente novamente."
        );
      if (
        error.response.data.message ===
        "Too many requests. This IP has been blocked for 15 minutes"
      )
        errorToast(
          "Sua conta foi bloqueada devido a múltiplas tentativas de login mal sucedidas. Aguarde 15 minutos para tentar novamente."
        );
      console.error("Erro ao enviar o email:", error);
    }
  };

  return (
    
      <ExternalPages 
        titleMessage="Bem-vindo!"
        message={`Entre e inicie essa\njornada conosco!`}
        >
        <div className={styles.container}>
          <div className={styles.title}>
            <Link href="/login" className={styles.btnTtoGoBack}>
              <ArrowLeftOutlined style={{ fontSize: '24px' }} />
            </Link>
            <h2>Recuperar senha</h2>
          </div>
          <TextInput 
            value={emailData.email}
            urlIcon="/images/icon-user-form.svg"
            altImage="Ícone de usuário no formulário de email"
            placeholder="E-mail"
            handleChange={handleEmailChange}
          />
          {/* <Input
            type="email"
            className={styles.input}
            placeholder="Email"
            size="middle"
            prefix={<UserOutlined />}
            value={emailData.email}
            onChange={handleEmailChange}
          /> */}
          {/* <button type="submit">Enviar</button> */}
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
      </div>
    </ExternalPages>
  );
};

export default RecoverPassword;
