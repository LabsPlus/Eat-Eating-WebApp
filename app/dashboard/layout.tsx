"use client";
import React from "react";
import PrivateRoute from "@/app/components/PrivateRoute/PrivateRoute";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { IoPeopleOutline } from "react-icons/io5";
import { GrTicket } from "react-icons/gr";
import { BsColumnsGap } from "react-icons/bs";
import { CgLogOut } from "react-icons/cg";

function NavbarLayout({ children }: { children: React.ReactNode }) {
  return (
    <PrivateRoute>
      <div className={styles.container}>
        <nav className={styles.nav}>
          <Image
            src="/images/Logo-preto.png"
            alt="logo"
            width={180}
            height={55}
          ></Image>
          <ul>
            <li>
              {" "}
              <IoPeopleOutline />
              <Link href={"/dashboard/gerenciar-usuarios"}>
                Gerenciar Usuários
              </Link>
            </li>
            <li>
              <GrTicket />
              <Link href={"/dashboard/gerenciar-tickets"}>
                Gerenciar Tickets
              </Link>
            </li>
            <li>
              <BsColumnsGap />
              <Link href={"/dashboard/gerenciar-dashboards"}>
                Gerenciar Dashboards
              </Link>
            </li>
          </ul>
          <div>
            <CgLogOut /> <span>Sair</span>
          </div>
        </nav>
        <div className={styles.content}>{children}</div>
      </div>
    </PrivateRoute>
  );
}

export default NavbarLayout;
