"use client";

import React, { useEffect, useState } from "react";
import { Button } from "antd";

import { useRouter } from "next/navigation";
import Link from "next/link";

import Loading from "../components/Loading/Loading";
import ExternalPages from "../components/Layout/ExternalPages";
import TextInput from "../components/Inputs/TextInput/TextInput";
import PasswordInput from "../components/Inputs/PasswordInput/PasswordInput";

import { isLoginValid } from "../helpers/isLoginValid";
import { useAuthContext } from "@/app/contexts/AuthContext";
import { IUserData } from "../Interfaces/admin.interfaces";
import { errorToast } from "../services/toast-messages/toast-messages";

import styles from "./page.module.css";

const LoginForm = () => {
  const { login, user } = useAuthContext();

  const router = useRouter();

  useEffect(() => {
    user ? router.push("/dashboard/gerenciar-usuarios") : null;
  }, [user]);

  const [remember, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [userData, setUserdata] = useState<IUserData>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setUserdata({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);
    const response = isLoginValid(userData);

    try {
      if (response) {
        setIsLoading(false);

        return errorToast(response);
      } else {
        const response = login(userData, remember)
        response.then((data) => {
          console.log(data)
          if (data === undefined) {
            setIsLoading(false);
          }
        })
      }

    } catch (error) {
      console.error("Ocorreu um erro durante o login.", error);
      setIsLoading(false);

      return errorToast(
        "Ocorreu um erro durante o login. Tente novamente mais tarde."
      );
    }
  };

  return (
    <ExternalPages 
      titleMessage="Bem-vindo!"
      message={`Entre e inicie essa\njornada conosco!`}
    >
      <h2 className={styles.title}>Insira seu e-mail e senha para iniciar!</h2>
      <div className={styles.inputsContents}>
        <TextInput 
          value={userData.email}
          urlIcon="/images/icon-user-form.svg"
          altImage="Ícone de usuário no formulário de email"
          placeholder="E-mail"
          inputClassName="inputLogin"
          handleChange={handleChange}
        />
        <PasswordInput 
          value={userData.password}
          urlIcon="/images/icon-padlock-form.svg"
          altImage="Ícone de um cadeado para o formulário de senha"
          placeholder="Senha"
          handleChange={handleChange}
        />

        <div className={styles.divLinks}>
          <label className={styles.switch}>
            <div className={styles.switchWrapper}>
              <span className={`${styles.switchButton} ${remember && styles.switchButtonActive}`}></span>
              <input
                onClick={() => setRemember(!remember)}
                type="checkbox"
              ></input>
            </div>
            <span className={styles.swicthText}> Manter Conectado</span>
          </label>

          <Link href="/recuperacao-senha">Esqueceu sua senha?</Link>
        </div>
      </div>
      
      <div className={styles.divButton}>
        <Button
          type="primary"
          icon={isLoading && <Loading />             }
          disabled={isLoading}
          onClick={(e: React.MouseEvent<HTMLFormElement>) =>
            handleSubmit(e)
          }
        >
          Entrar
        </Button>
      </div>
    </ExternalPages>
          
  );
};

export default LoginForm;
