"use client";

import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Button } from "antd";

import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { isLoginValid } from "../helpers/isLoginValid";
import { useAuthContext } from "@/app/contexts/AuthContext";
import { IUserData } from "../Interfaces/admin.interfaces";
import { errorToast } from "../services/toast-messages/toast-messages";

import styles from "./page.module.css";
import Loading from "../components/Loading/Loading";

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
    <div className={styles.main}>
      <Image
        className={styles.imgIFBa}
        src="/images/Simbolo Ifba.jpg"
        alt="IFBa"
        width={70}
        height={95}
      ></Image>
      <form className={styles.form}>
        <h2>Insira seu e-mail e senha para iniciar!</h2>

        <div className={styles.inputsContents}>
          <Input
            style={{ borderColor: "#022971" }}
            size="large"
            placeholder="Email"
            prefix={<UserOutlined />}
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
          <Input.Password
            style={{ borderColor: "#022971" }}
            size="large"
            placeholder="Senha"
            name="password"
            value={userData.password}
            onChange={handleChange}
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <div className={styles.divLinks}>
            <label>
              <input
                onClick={() => setRemember(!remember)}
                className={styles.checkbox}
                type="checkbox"
              ></input>
              <span> Manter Conectado</span>
            </label>
            <Link href="/recuperacao-senha">Esqueceu sua senha?</Link>
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
        </div>
      </form>
      <div className={styles.welcome}>
        <h1>Bem-vindo!</h1>
        <h2>
          Entre e inicie essa <br />
          jornada conosco!
        </h2>
      </div>
      <Image
        className={styles.Ellipse}
        src="/images/Ellipse 6.jpg"
        alt="IFBa"
        width={170}
        height={130}
      ></Image>
    </div>
  );
};

export default LoginForm;
