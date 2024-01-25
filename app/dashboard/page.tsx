"use client";
import React, { useEffect, useState } from "react";
import PrivateRoute from "@/app/components/PrivateRoute/PrivateRoute";
import { useAuthContext } from "@/app/contexts/AuthContext";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

function Dashboard() {
  const { user } = useAuthContext();

  return (
    <PrivateRoute>
      <nav className={styles.nav}>
        <Image
          src="/images/Logo-preto.png"
          alt="logo"
          width={180}
          height={55}
        ></Image>
        <Link href={"/dashboard/gerenciar-usuarios"}>Gerenciar Usuários</Link>
        <Link href={"/dashboard/gerenciar-tickets"}>Gerenciar Tickets</Link>
        <Link href={"/dashboard/gerenciar-dashboards"}>
          Gerenciar Dashboards
        </Link>
      </nav>
    </PrivateRoute>
  );
}

export default Dashboard;
