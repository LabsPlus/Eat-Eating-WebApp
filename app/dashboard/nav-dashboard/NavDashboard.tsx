"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { LogOut, Menu } from 'lucide-react';

import { useAuthContext } from "@/app/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";

import styles from "./page.module.css";

const NavDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const router = useRouter();
  
  const { logout } = useAuthContext();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const toggleMenu = () => {
    if (menuOpen) {
      setMenuOpen(false)

      return
    }

    setMenuOpen(true)
  }

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        { menuOpen ? (
          <div className={styles.header}>
            <Image
              src="/images/Logo-preto.png"
              alt="logo"
              width={217}
              height={70}
            />
            <Image
              src="/images/Close.png"
              alt="logo"
              width={40}
              height={40}
              onClick={toggleMenu}
            />
          </div>
        ) : (
          <div className={styles.layoutMenu}>
            <Menu 
              className={styles.menu}
              onClick={toggleMenu} 
            />
          </div>
        )}
        <ul className={styles.ul}>
          <li
            className={
              menuOpen ? (
                pathname === "/dashboard/gerenciar-usuarios" ? styles.activeOpen : ""
              ) : (
                pathname === "/dashboard/gerenciar-usuarios" ? styles.activeClose : ""
              )
            }
          >
            <Link href={"/dashboard/gerenciar-usuarios"}>
              <Image
                src={"/images/userLogo.png"}
                alt="User Logo"
                width={24}
                height={18.1}
                style={{
                  padding: "5px",
                  paddingRight: "3px",
                }}
                className={styles.icon}
              />
            
              { menuOpen && <span>Gerenciar usuários</span> }
            </Link>
          </li>
          <li
            className={
              menuOpen ? (
                pathname === "/dashboard/gerenciar-tickets" ? styles.activeOpen : ""
              ) : (
                pathname === "/dashboard/gerenciar-tickets" ? styles.activeClose : ""
              )
            }
          >
            <Link href={"/dashboard/gerenciar-tickets"}>
              <Image
                src={"/images/ticketLogo.png"}
                alt="Ticket Logo"
                width={30}
                height={33}
                className={styles.icon}
              />
            
              { menuOpen && <span>Gerenciar tickets</span> }
            </Link>
          </li>
          <li
            className={
              menuOpen ? (
                pathname === "/dashboard/gerenciar-dashboards" ? styles.activeOpen : ""
              ) : (
                pathname === "/dashboard/gerenciar-dashboards" ? styles.activeClose : ""
              )
            }
          >
            <Link href={"/dashboard/gerenciar-dashboards"}>
              <Image
                src={"/images/dashboardLogo.png"}
                alt="Dashboard Logo"
                width={18}
                height={20.3}
                style={{ padding: "6px" }}
                className={styles.icon}
              />
            
              { menuOpen && <span>Gerenciar dashboards</span> }
            </Link>
          </li>
        </ul>
        <div className={styles.logoutContainer} onClick={handleLogout}>
          <LogOut />

          { menuOpen && <span>Sair</span> }
        </div>
      </nav>
    </div>
  );
};

export default NavDashboard;
