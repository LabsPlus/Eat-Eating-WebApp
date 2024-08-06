"use client";

import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Image from "next/image";
import { Button, Divider } from "antd";
import Icon from "@ant-design/icons/lib/components/Icon";


const getUserData = async () => {
  return {
    name: "Amanda Oliveira",
    phone: "(xx) xxxx-xxxx",
    email: "info@modernize.com",
    recoveryEmail: "info@modernize.com",
    password: "senhaDoUsuario123",
    profilePicture: "/images/Avatar.png",
  };
};

const Page = (p0?: string) => {
  const [userData, setUserData] = useState<any>(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const currentDate = new Date();
  const dateFormatter = new Intl.DateTimeFormat("pt-BR");
  const formattedDate = dateFormatter.format(currentDate);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserData();
      setUserData(data);
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return <div>Carregando...</div>;
  }

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div className={styles.container}>
      <div className={styles.time}>{formattedDate}</div>

      <h1 className={styles.title}>Meu Perfil</h1>

      <div className={styles.dataSection}>
        <h2 className={styles.dataTitle}>Dados Pessoais</h2>

        <div className={styles.dataProfile}>
          <div className={styles.dataProfilePicture}>
            <Image
              src={userData.profilePicture}
              alt="image"
              width={72}
              height={72}
              className={styles.imgPopUp}
            />

            <Button className={styles.buttonEditPicture}>Escolher foto</Button>
            <span className={styles.dataInfoProfile}>Foto adicionada com sucesso</span>
          </div>
          <button className={styles.buttonRemovePicture}>Remover foto</button>
        </div>

        <div className={styles.dataInfoContainer}>
          <div className={styles.dataInfo}>
            <p className={styles.dataInfoName}>Nome completo</p>
            <span className={styles.dataName}>{userData.name}</span>
          </div>

          <div className={styles.dataInfo}>
            <p className={styles.dataInfoName}>Telefone</p>
            <span className={styles.dataPhone}>{userData.phone}</span>
          </div>

          <Button className={styles.buttonEdit}>Editar dados</Button>
        </div>

        <Divider className={styles.divider} />

        <h2 className={styles.dataTitle}>Detalhes do Login</h2>

        <div className={styles.dataInfoContainer}>
          <div className={styles.dataInfo}>
            <p className={styles.dataInfoName}>E-mail</p>
            <span className={styles.dataInfoEmail}>{userData.email}</span>
          </div>

          <div className={styles.dataInfo}>
            <p className={styles.dataInfoNameRec}>E-mail de recuperação</p>
            <span className={styles.dataInfoEmailRec}>
              {userData.recoveryEmail}
            </span>
          </div>

          <Button className={styles.buttonEdit}>Editar email</Button>
        </div>

        <div className={styles.dataInfoContainer}>
          <div className={styles.dataInfo}>
            <p className={styles.dataInfoName}>Senha</p>
            <div className={styles.passwordContainer}>
              <span className={styles.dataInfoPassword}>
                {isPasswordVisible ? userData.password : "*************"}
              </span>
              <button
                className={styles.toggleButton}
                onClick={togglePasswordVisibility}
              >
                {isPasswordVisible ? (
                  <img src="/images/remove_red_eye.svg" />
                ) : (
                  <img src="/images/remove_red_eye.svg" />
                )}
              </button>
              <Button
                className={styles.buttonEditPassword}
              >
                Alterar senha
              </Button>
            </div>
          </div>
        </div>
      </div>

      <h2 className={styles.dataTitleDanger}>Zona de perigo</h2>
      <div className={styles.dataSectionDanger}>
        <div>
          <p className={styles.titleDelete}>Excluir perfil</p>
          <span className={styles.textDelete}>
            Depois de clicar no botão "Excluir perfil", sua conta será agendada
            para a exclusão em 30 dias. Após esse período, todos os dados
            associados a este perfil serão eliminados definitivamente.
          </span>
        </div>
        <Button className={styles.buttonEditDelete}>Excluir perfil</Button>
      </div>
    </div>
  );
};

export default Page;
