"use client";
import React from "react";
import styles from "./page.module.css"
import Image from "next/image";
import { Button } from "antd";

const HeaderHome = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.divLogo}>
        <Image
          src="/images/logo-header.png"
          alt="Logo EatEating"
          width={71}
          height={48}
        />
        <p>Home</p>
      </div>
      <div className={styles.divButtons}>
        <Button className={styles.buttonRestaurante}>Portal Restaurante Universitário</Button>
        <Button className={styles.buttonAdmin}>Portal Administrador</Button>
      </div>
    </nav>
  )
}

export default HeaderHome