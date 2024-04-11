import React from "react";
import styles from "./page.module.css";
import ListTickets from "./list-tickets/ListTickets";

const page = () => {
  const currentDate = new Date();
  const dateFormatter = new Intl.DateTimeFormat("pt-BR");
  const formattedDate = dateFormatter.format(currentDate);

  return (
    <div className={styles.container}>
      <div className={styles.time}>{formattedDate}</div>

      <h1 className={styles.title}>Gerenciar Tickets</h1>
      
      <div className={styles.ticketContainer}>
        <div className={`${styles.ticketVerde} ${styles.ticketBg}`}></div>
        <div className={`${styles.ticketRosa} ${styles.ticketBg}`}></div>
        <div className={`${styles.ticketAzul} ${styles.ticketBg}`}></div>
        <div className={`${styles.ticketLaranja} ${styles.ticketBg}`}></div>
      </div>

      <div className={styles.inputsContainer}>
        <div className={styles.searchAndAdd}>
          <input type="text" />
        </div>
        <div className={styles.btnsContainer}>
          <button>Copiar</button>
          <button>CSV</button>
          <button>Excel</button>
          <button>PDF</button>
          <button>Imprimir</button>
        </div>
      </div>

      <ListTickets />
    </div>
  );
};

export default page;
