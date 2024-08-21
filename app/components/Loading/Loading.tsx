import React from "react";

import styles from "./page.module.css";

const Loading = () => {
  return (
    <div className={styles.spinner}>
      <div className={styles.circle} />
    </div>
  )
}

export default Loading;