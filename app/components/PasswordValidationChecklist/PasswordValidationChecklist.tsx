import React from "react";
import styles from "./passwordValidationChecklist.module.css";
interface PasswordValidationChecklistProps {
  validations: {
    length: boolean;
    lowercase: boolean;
    uppercase: boolean;
    number: boolean;
    specialCharacter: boolean;
  };
}

const PasswordValidationChecklist = ({
  validations,
}: PasswordValidationChecklistProps) => {
  return (
    <div className={styles.checkboxContainer}>
      <p>Sua senha deve conter</p>
      <div className={styles.checkbox}>
        <img
          src={
            validations.length
              ? "/images/checked-circle.svg"
              : "/images/check-circle.svg"
          }
          alt="Icone de check"
        />
        <span>De 8 a 15 caracteres</span>
      </div>

      <div className={styles.checkbox}>
        <img
          src={
            validations.lowercase
              ? "/images/checked-circle.svg"
              : "/images/check-circle.svg"
          }
          alt="Icone de check"
        />
        <span>Letra minúscula</span>
      </div>

      <div className={styles.checkbox}>
        <img
          src={
            validations.uppercase
              ? "/images/checked-circle.svg"
              : "/images/check-circle.svg"
          }
          alt="Icone de check"
        />
        <span>Letra maiúscula</span>
      </div>

      <div className={styles.checkbox}>
        <img
          src={
            validations.number
              ? "/images/checked-circle.svg"
              : "/images/check-circle.svg"
          }
          alt="Icone de check"
        />
        <span>Número</span>
      </div>

      <div className={styles.checkbox}>
        <img
          src={
            validations.specialCharacter
              ? "/images/checked-circle.svg"
              : "/images/check-circle.svg"
          }
          alt="Icone de check"
        />
        <span>Símbolo especial (Ex. !#$%)</span>
      </div>
    </div>
  );
};

export default PasswordValidationChecklist;
