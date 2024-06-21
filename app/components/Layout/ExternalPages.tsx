import React from "react";

import Image from "next/image";

import HeaderHome from "../HeaderHome/HeaderHome";
import { ExternalPagesProps } from "@/app/Interfaces/components.interfaces";

import styles from "./page.module.css";

const ExternalPages = ({ children, titleMessage, message, className }: ExternalPagesProps) => {
  return (
    <>
      <HeaderHome />
      <div className={styles.main}>
        <div className={styles.container}>
          <form className={styles.form}>
            {children}
          </form>
          <div className={styles.welcome}>
            <h1>{titleMessage}</h1>
            <h2 className={styles[className ? className : '']}>
              {message.split('\n').map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
            </h2>
          </div>
        </div>
        <div className={styles.ellipseContainer}>
          <Image
            className={styles.ellipse}
            src="/images/Ellipse 6.jpg"
            alt="IFBa"
            width={170}
            height={130}
          />
        </div>
      </div>
    </>
  )
}

export default ExternalPages;