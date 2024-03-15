"use client";
import React from "react";
import styles from "./page.module.css";
import NavDashboard from "./NavDashboard/NavDashboard";

function NavbarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.container}>
      <NavDashboard />
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default NavbarLayout;
