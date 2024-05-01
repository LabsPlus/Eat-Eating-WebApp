'use client'

import React, { useEffect } from "react";

import ListTickets from "./list-tickets/ListTickets";
import SearchUser from "./search-user/SearchUser";

import styles from "./page.module.css";
import { useStore } from "@/store";

const page = () => {
  const { getInfoTickets, infoTickets } = useStore();

  const currentDate = new Date();
  const dateFormatter = new Intl.DateTimeFormat("pt-BR");
  const formattedDate = dateFormatter.format(currentDate);

  useEffect(() => {
    getInfoTickets();
  }, []);

  const { ticketsAvailable, ticketsConsumed, ticketsOpened, ticketsSold} = infoTickets;

  return (
    <div className={styles.container}>
      <div className={styles.time}>{formattedDate}</div>

      <h1 className={styles.title}>Gerenciar Tickets</h1>
      
      <div className={styles.ticketContainer}>
        <div className={`${styles.ticketVerde} ${styles.ticketBg}`}>
          <div className={styles.ticketInfo}>
            <span>{ticketsOpened}</span>
            <p>Tickects abertos</p>
          </div>
        </div>
        <div className={`${styles.ticketRosa} ${styles.ticketBg}`}>
          <div className={styles.ticketInfo}>
            <span>{ticketsConsumed}</span>
            <p>Tickects usados</p>
          </div>
        </div>
        <div className={`${styles.ticketAzul} ${styles.ticketBg}`}>
          <div className={styles.ticketInfo}>
            <span>{ticketsAvailable}</span>
            <p>Tickects à venda</p>
          </div>
        </div>
        <div className={`${styles.ticketLaranja} ${styles.ticketBg}`}>
          <div className={styles.ticketInfo}>
            <span>{ticketsSold}</span>
            <p>Total de tickets vendidos</p>
          </div>
        </div>
      </div>

      <div className={styles.inputsContainer}>
        <SearchUser />

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
