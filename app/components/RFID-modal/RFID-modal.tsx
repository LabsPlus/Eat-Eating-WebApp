import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";

import Header  from "../RFID-modal/header/Header";
import Image from "next/image";

import { ModalRfidProps } from "../../Interfaces/modalrfid.interface";

import useRfid from "../../hooks/useRfid";

import styles from "./page.module.css";

const RFIDModal = ({ open, onClose, handleRFID } : ModalRfidProps) => {
  const [showStatusRfid, setShowStatusRfid] = useState({
    urlImage: "RFID-one-hundred.png",
    message: "Nenhum RFID foi cadastrado."
  })
  const [statusRfid, setStatusRfid] = useState({
    percent: 0,
    url: 'RFID.svg'
  })

  const [deviceStatus, setDeviceStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await useRfid.getDeviceStatus();
        setDeviceStatus(result);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const colorPercent = deviceStatus && statusRfid.percent === 100 ? 'rfidPercentColorGreen' : 'rfidPercentColorBlack';
  const showPercent = !deviceStatus && statusRfid.percent === 100;
  
  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (open) {
      interval = setInterval(() => {
        setStatusRfid(prevData => {
          let newData = { ...prevData, percent: prevData.percent + 1 };

          if (prevData.percent === 36) {
            newData.url = 'RFID-thirty-six.png';
          } 
          
          if (prevData.percent === 50) {
            newData.url = 'RFID-fifty.png';
          }

          if (prevData.percent === 87) {
            newData.url = 'RFID-eighty-seven.png';
          }
         
          if (prevData.percent === 99) {
            clearInterval(interval);

            if (deviceStatus) {
              newData.url = 'RFID-success.png';
              setShowStatusRfid(prev => ({
                ...prev, 
                message: 'RFID cadastrado com sucesso.'
              }));
            } else {
              newData.url = 'RFID-error.png';
              setShowStatusRfid({
                urlImage: 'RFID-error-small.png',
                message: 'Erro na leitura do RFID. Verifique e tente novamente.'
              });
            }
          }

          return newData;
        });
      }, 5000 / 100);
    } else {
      setStatusRfid({ percent: 0, url: 'RFID-zero.png' });
    }

    return () => clearInterval(interval);
  }, [open]);

  const handleCancel = () => {
    onClose();

    setShowStatusRfid(prev => ({
      ...prev, 
      message: 'Nenhum RFID foi cadastrado.'
    }));
  }

  return (
    <Modal
      className={styles.modalRFID}
      title={<Header title="Cadastro do RFID" />}
      open={open}
      onCancel={handleCancel}
      footer={
        <div className={styles.btns}>
          <Button
            onClick={handleCancel}
            className={styles.btnCancel}
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="Vector"
                  d="M9.99984 1.66602C5.3915 1.66602 1.6665 5.39102 1.6665 9.99935C1.6665 14.6077 5.3915 18.3327 9.99984 18.3327C14.6082 18.3327 18.3332 14.6077 18.3332 9.99935C18.3332 5.39102 14.6082 1.66602 9.99984 1.66602ZM9.99984 16.666C6.32484 16.666 3.33317 13.6743 3.33317 9.99935C3.33317 6.32435 6.32484 3.33268 9.99984 3.33268C13.6748 3.33268 16.6665 6.32435 16.6665 9.99935C16.6665 13.6743 13.6748 16.666 9.99984 16.666ZM12.9915 5.83268L9.99984 8.82435L7.00817 5.83268L5.83317 7.00768L8.82484 9.99935L5.83317 12.991L7.00817 14.166L9.99984 11.1743L12.9915 14.166L14.1665 12.991L11.1748 9.99935L14.1665 7.00768L12.9915 5.83268Z"
                  fill="#0444BD"
                />
              </svg>
            }
          >
            Cancelar
          </Button>
          <Button
            className={styles.btnConfirm}
            icon={
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  id="Vector"
                  d="M18.3332 9.99935C18.3332 5.39935 14.5998 1.66602 9.99984 1.66602C5.39984 1.66602 1.6665 5.39935 1.6665 9.99935C1.6665 14.5993 5.39984 18.3327 9.99984 18.3327C14.5998 18.3327 18.3332 14.5993 18.3332 9.99935ZM3.33317 9.99935C3.33317 6.31602 6.3165 3.33268 9.99984 3.33268C13.6832 3.33268 16.6665 6.31602 16.6665 9.99935C16.6665 13.6827 13.6832 16.666 9.99984 16.666C6.3165 16.666 3.33317 13.6827 3.33317 9.99935ZM13.3332 9.99935L9.99984 13.3327L8.82484 12.1577L10.1415 10.8327H6.6665V9.16602H10.1415L8.8165 7.84102L9.99984 6.66602L13.3332 9.99935Z"
                  fill="white"
                />
              </svg>
            }
          >
            Continuar
          </Button>
        </div>
      }
    >

      <div className={styles.rfidReader}>
        <p className={styles.rfidReaderText}>
          <img src="/images/check_circle_outline.svg" alt="Leitor RFID" />
          Leitor RFID conectado
        </p>
      </div>

      <div className={styles.rfidAnimation}>
        <Image
          src={`/images/${statusRfid.url}`}
          alt="Animação do RFID"
          width={200}
          height={200} 
        />
        
        {showPercent ? (
          <div></div>
        ) : (
          <p className={`${styles.rfidPercent} ${styles[colorPercent]}`}>%{statusRfid.percent}</p>
        )}
      </div>

      <div className={styles.rfidInfo}>
        <p className={styles.rfidInfoText}>
          <Image 
            src={`/images/${showStatusRfid.urlImage}`}
            alt="Animação do RFID"
            width={130}
            height={130}
          />
          {showStatusRfid.message}
        </p>
      </div>
    </Modal>
  );
};

export default RFIDModal;
