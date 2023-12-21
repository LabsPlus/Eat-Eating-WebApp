"use client";
import React, { useState } from "react";
import { UserOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { Input, message } from "antd";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { UserData } from "./types";
import { validation } from "./validation";
import toast from "react-hot-toast";

const RecoverPassword = () => {
  const [emailData, setEmailData] = useState<UserData>({
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

    const response = validation(emailData);

    try {
      if (response) {
        return toast.error(response);
      } else {
        const response = await axios.post(
          "http://localhost:3003/forgotPassword",
          {
            email: emailData.email,
          }
        );

        setEmailData({ email: "" });
        message.success("Um link de recuperação de senha foi enviado para o seu email! ");

        console.log("Resposta:", response.data);
      }
    } catch (error) {
      console.error("Erro ao enviar o email:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Image
        className={styles.imgIFBa}
        src="/images/Simbolo Ifba.jpg"
        alt="IFBa"
        width={70}
        height={95}
      />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.title}>
          <Link href="/login" className={styles.btnTtoGoBack}>
            <ArrowLeftOutlined />
          </Link>
          <h2>Recuperar senha</h2>
        </div>
        <Input
          type="email"
          className={styles.input}
          placeholder="Email"
          size="middle"
          prefix={<UserOutlined />}
          value={emailData.email}
          onChange={handleEmailChange}
        />
        <button type="submit">Enviar</button>
      </form>
      <div className={styles.info}>
        <h1>Quase lá!</h1>
        <span>Entre com o email cadastrado na plataforma!</span>
      </div>
      <Image
        className={styles.Ellipse}
        src="/images/Ellipse 6.jpg"
        alt="IFBa"
        width={170}
        height={130}
      />
    </div>
  );
};

export default RecoverPassword;
