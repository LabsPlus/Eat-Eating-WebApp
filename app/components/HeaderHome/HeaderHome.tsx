import React from "react";
import { Button } from "antd";

import Image from "next/image";
import Link from "next/link";

import { HeaderHomeProps } from "@/app/Interfaces/components.interfaces";

import styles from "./page.module.css";

const HeaderHome = ({ hasButtons = false }: HeaderHomeProps) => {
  return (
    <nav className={styles.container}>
      <Link href="/">
        <Image
          src="/images/Logo-preto.png"
          alt="Logo EatEating"
          width={190}
          height={56}
        />
      </Link>
      
      {hasButtons && (
        <div className={styles.divButtons}>
          <Button className={styles.buttonRestaurante}><Link href={"/login"}>Portal Restaurante Universitário</Link></Button>
          <Button className={styles.buttonAdmin}><Link href={"/login"}>Portal Administrador</Link></Button>
        </div>
      )}
    </nav>
  )
}

export default HeaderHome;