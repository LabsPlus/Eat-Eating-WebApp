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
  let content;

  switch (currentStep) {
    case 1:
      content = (
        <Button
          key="next"
          type="primary"
          onClick={nextStep}
          className={`${styles.btn} ${styles.btnNext}`}
        >
          Próximo
        </Button>
      );
      break;
    case 2:
      content = (
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
        </div>
      );
      break;
    default:
      content = null;
  }
  return content;
};

export default Buttons;
