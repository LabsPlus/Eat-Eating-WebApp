'use client';

import React from 'react';
import Image from 'next/image';

import { Result} from 'antd';

import iconMessageError from '../../../public/images/icon-message-error.svg';
import iconMessageSuccess from '../../../public/images/icon-message-success.svg';

import styles from "./page.module.css";

interface PopUpMessageProps {
  icon: 'error' | 'success';
  message: string;
  closeError: () => void;
}

const PopUpMessage = ({ icon, message, closeError }: PopUpMessageProps) => {
  const isError = icon === 'error';

  return (
    <div className={styles.container}>
      <Result
        icon={<Image src={isError ? iconMessageError : iconMessageSuccess} className={styles.image} alt="Error Icon" />}
        status="warning"
        title={<p className={styles.title}>{message}</p>}
        extra={
          <button className={styles.button} onClick={() => closeError()}>
            {isError ? 'Ok' : 'Fechar'}
          </button>
        }
      />
    </div>
  );
}

export default PopUpMessage;
