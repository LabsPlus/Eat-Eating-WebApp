"use client";
import React from "react";
import styles from './page.module.css'

function SearchLayout({ children }: { children: React.ReactNode }) {
  return <div className={styles.gerenciarUsuariosContainer}>{children}</div>;
}

export default SearchLayout;
