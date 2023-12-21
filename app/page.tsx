"use client";
import styles from "./page.module.css";
import { ConfigProvider } from "antd";
import React from "react";
import theme from "../theme/themeConfig";
import { useAuthContext } from "@/app/contexts/AuthContext";
import Link from "next/link";

export default function Home() {
  const { user, logout } = useAuthContext();

  return (
    <ConfigProvider theme={theme}>
      <main className={styles.main}>
        {user ? (
          <>
            <h1>Oi, {user}!</h1>
            <button onClick={logout}>logout</button>
          </>
        ) : (
          <h1>
            Você não está autenticado. Por favor,{" "}
            <Link href={"/login"}>faça login</Link> .{" "}
          </h1>
        )}
      </main>
    </ConfigProvider>
  );
}
