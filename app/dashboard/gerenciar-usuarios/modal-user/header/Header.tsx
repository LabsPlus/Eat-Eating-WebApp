import React from "react";
import styles from "./header.module.css";

interface HeaderProps {
  title: string;
  handleClose: () => void;
}
const Header = ({ title, handleClose }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <p className={styles.title}>{title}</p>
      <img
        src="/images/close.svg"
        alt="Botão de fechar"
        onClick={handleClose}
      />
    </div>
  );
};

export default Header;
