import React from "react";
import Image from "next/image"

import styles from "./page.module.css";

const NoData = () => {
  return (
    <div className={styles.container}>
      <Image
        src="/images/no-data.png"
        alt="Logo EatEating"
        width={126}
        height={131}
        className={styles.noDataImage}
      />
      <p className={styles.infoNoData}>Nenhum usuário encontrado. Verifique o nome ou a matrícula e tente novamente.</p>
    </div>
  )
}

export default NoData;