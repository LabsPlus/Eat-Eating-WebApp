"use client";
import React from "react";
import styles from "./page.module.css"
import Image from "next/image";
import { Button } from "antd";
import Link from "next/link";

const HeaderHome = () => {
  return (
    <nav className={styles.container}>
      <div className={styles.divLogo}>
        <Image
          src="/images/logo-header.svg"
          alt="Logo EatEating"
          width={71}
          height={48}
        />
        <p>Home</p>
      </div>
      <div className={styles.divButtons}>
        <Button className={styles.buttonRestaurante}><Link href={"/login"}>Portal Restaurante Universitário</Link></Button>
        <Button className={styles.buttonAdmin}><Link href={"/login"}>Portal Administrador</Link></Button>
      </div>
    </nav>
  )
}

export default HeaderHome