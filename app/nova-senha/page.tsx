"use client";

import React, { useState } from "react";
import {
  ArrowLeftOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
} from "@ant-design/icons";
import { Input, message } from "antd";
import styles from "./page.module.css";
import Image from "next/image";
import { UserData } from "./types";
import { validation } from "./validation";
import toast from "react-hot-toast";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";

const NewPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [passwordData, setPasswordData] = useState<UserData>({
    password: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    setPasswordData({ ...passwordData, [field]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = validation(passwordData);

    try {
      if (response) {
        return toast.error(response);
      } else {
        const response = await axios.post(
          "https://eat-eating-api-dev-drba.3.us-1.fl0.io/updatePassword",
          {
            newPassword: passwordData.password,
            token: token,
          }
        );
        message.success("Senhas trocadas com sucesso");
        setPasswordData({ password: "", confirmPassword: "" });
        router.push("/login");

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
          <ArrowLeftOutlined className={styles.btnTtoGoBack} />
          <h2>Recuperar senha</h2>
        </div>

        <div className={styles.inputContainer}>
          <Input.Password
            className={styles.input}
            placeholder="Digite sua nova senha"
            value={passwordData.password}
            onChange={(e) => handlePasswordChange(e, "password")}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <Input.Password
            className={styles.input}
            placeholder="Confirme sua senha"
            value={passwordData.confirmPassword}
            onChange={(e) => handlePasswordChange(e, "confirmPassword")}
            visibilityToggle={{
              visible: passwordVisible,
              onVisibleChange: setPasswordVisible,
            }}
          />
          <button type="submit">Registrar</button>
        </div>
      </form>

      <div className={styles.info}>
        <h1>Importante!</h1>
        <span>Não use números de telefone e datas em sua nova senha!</span>
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

export default NewPassword;
