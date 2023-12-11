import styles from "./page.module.css";
import { ConfigProvider } from "antd";
import React from "react";
import theme from "../theme/themeConfig";

export default function Home() {
  return (
    <ConfigProvider theme={theme}>
      <main className={styles.main}></main>
    </ConfigProvider>
  );
}
