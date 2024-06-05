import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
import { LogOut, User, Mail } from "lucide-react";

import Image from "next/image";

import styles from "./page.module.css";

interface PopUpProfileProps {
  openModalUser: boolean;
  handleToggleModalUser: () => void;
}

const PopUpProfile = ({ openModalUser, handleToggleModalUser }: PopUpProfileProps) => {

  return (
    <Modal
      open={openModalUser}
      maskClosable={true}
      onCancel={handleToggleModalUser}
      closable={false}
      className={styles.popUpUser}
      style={{ top: '278px', left: '410px', borderRadius: '8px' }}
      title={
        <div className={styles.containerPopUp}>
          <Image
            src="/images/Avatar.png"
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
      }
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
    ></Modal>
  );
};

export default PopUpProfile;