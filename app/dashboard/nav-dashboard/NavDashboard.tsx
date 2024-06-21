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
              style={{
                paddingLeft: "5px",
              }}

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
                src={"/images/people_alt.svg"}
                alt="User Logo"
                width={24}
                height={24}
                className={styles.icon}
                style={{
                  paddingLeft: "10px",
                }}

              />
            
              { menuOpen && <span>Gerenciar Usuários</span> }
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
                src={"/images/confirmation_number.svg"}
                alt="Ticket Logo"
                width={24}
                height={24}
                className={styles.icon}
                style={{
                  paddingLeft: "10px",
                }}

              />
            
              { menuOpen && <span>Gerenciar Tickets</span> }
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
                src={"/images/dashboard.svg"}
                alt="Dashboard Logo"
                width={24}
                height={24}
                className={styles.icon}
                style={{
                  paddingLeft: "10px",
                }}

              />
            
              { menuOpen && <span>Gerenciar Dashboard</span> }
            </Link>
          </li>
        </ul>
        <div className={styles.logoutContainer} onClick={handleLogout}>
          <LogOut 
           style={{
            paddingLeft: "10px",
            }}
          />

          { menuOpen && <span>Sair</span> }
        </div>
      </nav>
    </div>
  );
};

export default NavDashboard;
