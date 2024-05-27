import React from "react";
import styles from "./Buttons.module.css";
import { Button } from "antd";

interface ButtonsProps {
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  handleUser: () => void;
}

const Buttons = ({
  currentStep,
  nextStep,
  prevStep,
  handleUser,
}: ButtonsProps) => {
  switch (currentStep) {
    case 1:
      return [
        <Button
          key="next"
          type="primary"
          onClick={nextStep}
          className={`${styles.btn} ${styles.btnNext}`}
        >
          Próximo
        </Button>,
      ];
    case 2:
      return [
        <div className={styles.btnsContainer}>
          <Button
            key="prev"
            onClick={prevStep}
            className={`${styles.btn} ${styles.btnPrev}`}
          >
            Voltar
          </Button>

          <Button
            key="save"
            type="primary"
            onClick={handleUser}
            className={`${styles.btn} ${styles.btnSave}`}
          >
            Salvar
          </Button>
        </div>,
      ];
    default:
      return null;
  }
};

export default Buttons;
