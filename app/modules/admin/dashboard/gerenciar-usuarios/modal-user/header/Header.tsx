import React from "react";
import styles from "./header.module.css";
import Image from "next/image";

interface HeaderProps {
  title: string;
  handleClose: () => void;
}
const Header = ({ title, handleClose }: HeaderProps) => {
  return (
    <div className={styles.header}>
      <p className={styles.title}>{title}</p>
      <Image
        src="/images/close.svg"
        alt="Botão de fechar"
        onClick={handleClose}
      />
    </div>
  );
};

export default Header;
