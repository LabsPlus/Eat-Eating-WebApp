import React from "react";
import { Button } from "antd";
import { LogOut, User, Mail } from "lucide-react";

import Image from "next/image";

import { useAuthContext } from "@/app/contexts/AuthContext";
import { errorToast } from "@/app/services/toast-messages/toast-messages";

import styles from "./page.module.css";

const PopUpProfile = () => {
  const { logout } = useAuthContext();

  return (
    <div
      className={styles.popUpUser}
    >
      <div className={styles.containerPopUpInfo}>
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
      <div className={styles.containerButtonsPopUp}>
        <Button
          className={styles.buttonsPopUp}
          icon={<User className={styles.iconsPopUp} />}
          onClick={() => errorToast("Página em desenvolvimento.")}
        >
          Meu perfil
        </Button>
        <Button
          icon={<LogOut className={styles.iconsPopUp} />}
          className={styles.buttonsPopUp}
          onClick={logout}
        >
          Sair
        </Button>
      </div>
    </div>
  );
};

export default PopUpProfile;
