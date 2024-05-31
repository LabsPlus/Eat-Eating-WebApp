import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { LogOut, User, Mail } from 'lucide-react';
import axios from "axios";

import Image from "next/image";

import { useAuthContext } from "@/app/contexts/AuthContext";

import styles from "./page.module.css";

const PopUpProfile = () => {
  const { user } = useAuthContext();

  const [userLogged, setUserLogged] = useState();

  const getUsers = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/user/list-all-users`,
    );

    return response.data
  }

  const getUserByEmail = async () => {
    const users = await getUsers()

    // const getUserLogged = users.filter((userSelect: any) => user === userSelect.user.loginUser.email)

    const getUserLogged = users.forEach((userSelect: any) => console.log(userSelect.user))

    console.log(getUserLogged)
    console.log(user)
  }

  useEffect(() => {
    getUserByEmail()
  }, [])

  return (
    <Modal
      open={true}
      closable={false}
      className={styles.popUpUser}
      footer={
        <div className={styles.containerButtonsPopUp}>
          <Button
            className={styles.buttonsPopUp}
            icon={<User className={styles.iconsPopUp} />}
          >
            Meu perfil
          </Button>
          <Button
            icon={<LogOut className={styles.iconsPopUp} />} 
            className={styles.buttonsPopUp}
          >
            Sair
          </Button>
        </div>
      }
    >
      <div className={styles.containerPopUp}>
        <Image 
          src="https://avatars.githubusercontent.com/u/64218964?v=4" 
          alt="image" 
          width={72} 
          height={72}
          className={styles.imgPopUp} 
        />
        <div className={styles.infoUser}>
          <h2>Amanda Oliveira</h2>
          <p>SEO Expert</p>
          <p>
            <span>
              <Mail className={styles.iconsPopUp} />
            </span>
            info@modernize.com
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default PopUpProfile;
