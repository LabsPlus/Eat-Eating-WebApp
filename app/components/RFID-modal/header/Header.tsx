import React from "react";
import styles from "./page.module.css";

interface HeaderProps {
  title: string;
}
const Header = ({ title }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <p className={styles.title}>{title}</p>
    </div>
  );
};

export default Header;
