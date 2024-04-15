"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from 'lucide-react';

import { useAuthContext } from "@/app/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";

import styles from "./page.module.css";

const NavDashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const pathname = usePathname();
  const { logout } = useAuthContext();

  const router = useRouter();

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
              pathname === "/dashboard/gerenciar-usuarios" ? styles.active : ""
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
            
              { menuOpen && <span>Gerenciar Usuários</span> }
            </Link>
          </li>
          <li
            className={
              pathname === "/dashboard/gerenciar-tickets" ? styles.active : ""
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
            
              { menuOpen && <span>Gerenciar Tickets</span> }
            </Link>
          </li>
          <li
            className={
              pathname === "/dashboard/gerenciar-dashboards"
                ? styles.active
                : ""
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
            
              { menuOpen && <span>Gerenciar Dashboards</span> }
            </Link>
          </li>
        </ul>
        <div className={styles.logoutContainer} onClick={handleLogout}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19.3654 0.375059C19.9968 0.375059 20.5312 0.593809 20.9687 1.03131C21.4062 1.46881 21.625 2.00327 21.625 2.63469V19.3654C21.625 19.9968 21.4062 20.5312 20.9687 20.9687C20.5312 21.4062 19.9968 21.625 19.3654 21.625H10.988V19.75H19.3654C19.4615 19.75 19.5497 19.71 19.6298 19.6298C19.71 19.5497 19.75 19.4615 19.75 19.3654V2.63469C19.75 2.53852 19.71 2.45036 19.6298 2.37022C19.5497 2.29009 19.4615 2.25003 19.3654 2.25003H10.988V0.375059H19.3654ZM5.71156 5.66356L7.00959 7.01928L3.96634 10.0626L14.6298 10.0626V11.9375L3.96634 11.9375L7.00959 14.9808L5.71156 16.3365L0.375059 11L5.71156 5.66356Z"
              fill="#404040"
            />
          </svg>

          { menuOpen && <span>Gerenciar Dashboards</span> }
        </div>
      </nav>
    </div>
  );
};

export default NavDashboard;
