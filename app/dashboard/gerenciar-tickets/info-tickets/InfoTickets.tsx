'use client'

import React, { useEffect } from "react";
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { useStore } from "@/store";

import styles from "./page.module.css";

const InfoTickets = () => {
  const { getInfoTickets, infoTickets } = useStore();

  const { ticketsAvailable, ticketsConsumed, ticketsOpened, ticketsSold } = infoTickets;

  useEffect(() => {
    getInfoTickets();
  }, [infoTickets]);

  return (
    <div className={styles.ticketContainer}>
      <div className={`${styles.ticketVerde} ${styles.ticketBg}`}>
        <div className={styles.ticketInfo}>
          {ticketsOpened !== null ? (
            <span>{ticketsOpened}</span> 
          ) : ( 
            <Spin indicator={<LoadingOutlined className={styles.spin} spin />} />
          )}
          <p>Tickects abertos</p>
        </div>
      </div>

      <div className={`${styles.ticketRosa} ${styles.ticketBg}`}>
        <div className={styles.ticketInfo}>
          {ticketsConsumed !== null ? (
            <span>{ticketsConsumed}</span> 
          ) : ( 
            <Spin indicator={<LoadingOutlined className={styles.spin} spin />} />
          )}
          <p>Tickects usados</p>
        </div>
      </div>

      <div className={`${styles.ticketAzul} ${styles.ticketBg}`}>
        <div className={styles.ticketInfo}>
          {ticketsAvailable !== null ? (
            <span>{ticketsAvailable}</span> 
          ) : ( 
            <Spin indicator={<LoadingOutlined className={styles.spin} spin />} />
          )}
          <p>Tickects à venda</p>
        </div>
      </div>

      <div className={`${styles.ticketLaranja} ${styles.ticketBg}`}>
        <div className={styles.ticketInfo}>
          {ticketsSold !== null ? (
            <span>{ticketsSold}</span> 
          ) : ( 
            <Spin indicator={<LoadingOutlined className={styles.spin} spin />} />
          )}
          <p>Total de tickets vendidos</p>
        </div>
      </div>
    </div>
  )
}

export default InfoTickets;