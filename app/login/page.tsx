"use client";

import Link from "next/link";
import styles from "./page.module.css";
import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { Input, Button } from "antd";
import Image from "next/image";

const LoginForm = () => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

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
          />
          <Input.Password
            style={{ borderColor: "#022971" }}
            size="large"
            placeholder="Senha"
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
          <div className={styles.divLinks}>
            <label>
              <input className={styles.checkbox} type="checkbox"></input>
              <span> Manter Conectado</span>
            </label>
            <Link href="/recuperacao-senha">Esqueceu sua senha?</Link>
          </div>
          <div className={styles.divButton}>
            <Button type="primary">Login</Button>
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
