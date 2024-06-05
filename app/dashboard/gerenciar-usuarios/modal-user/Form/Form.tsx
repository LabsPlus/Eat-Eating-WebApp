import React from "react";
import styles from "./Form.module.css";
import PasswordValidationChecklist from "@/app/components/PasswordValidationChecklist/PasswordValidationChecklist";

interface FormProps {
  currentStep: number;
  formDataUser: any;
  fileUploadMessage: string;
  fileContainerColor: string;
  passwordValidations: any;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  handlePicture: (e: React.ChangeEvent<HTMLInputElement>) => void;
  pictureUser: string;
}

const Form = ({
  currentStep,
  formDataUser,
  fileUploadMessage,
  fileContainerColor,
  passwordValidations,
  handleInputChange,
  pictureUser,
  handlePicture,
}: FormProps) => {
  switch (currentStep) {
    case 1:
      return (
        <div className={styles.modalContainer}>
          <div className={styles.pictureContainer}>
            {formDataUser && formDataUser.picture ? (
              <img src={formDataUser.picture} alt="Foto do usuário" />
            ) : (
              <div className={styles.placeholder}></div>
            )}
            <div
              className={styles.fileContainer}
              style={{
                backgroundColor: fileContainerColor,
              }}
            >
              <div className={styles.labelContainer}>
                <label htmlFor={pictureUser}>Escolher foto</label>
              </div>

              <input
                name={pictureUser}
                id={pictureUser}
                type="file"
                onChange={handlePicture}
              />
              <span
                style={{
                  color: fileContainerColor ? "#FFFFFF" : "#193160",
                }}
              >
                {fileUploadMessage}
              </span>
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.itens}>
              <label htmlFor="name">Nome completo</label>
              <input
                id="name"
                type="text"
                placeholder="Digite o nome completo"
                value={formDataUser.name}
                onChange={handleInputChange}
                className={styles.inputBig}
                minLength={2}
                maxLength={100}
              />
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.itens}>
              <label htmlFor="enrollment">Matrícula</label>
              <input
                id="enrollment"
                type="text"
                placeholder="Digite a matrícula"
                value={
                  formDataUser.category === "VISITANTE"
                    ? "XXXXXXX"
                    : formDataUser.enrollment
                }
                onChange={handleInputChange}
                disabled={formDataUser.category === "VISITANTE"}
                maxLength={50}
                className={styles.inputMedium}
              />
            </div>

            <div className={styles.itens}>
              <label htmlFor="dailyMeals">Refeições diárias </label>
              <input
                id="dailyMeals"
                type="number"
                value={formDataUser.dailyMeals}
                onChange={handleInputChange}
                max={3}
                className={styles.inputMedium}
              />
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.itens}>
              <label>Usuário</label>
              <select
                name="category"
                id="category"
                value={formDataUser.category}
                onChange={handleInputChange}
                className={styles.inputMedium}
              >
                <option>Selecione o tipo de usuário</option>
                <option value="ALUNO">Aluno</option>
                <option value="FUNCIONARIO">Funcionário</option>
                <option value="VISITANTE">Visitante</option>
              </select>
            </div>

            <div className={styles.itens}>
              <label>Bolsa</label>
              <select
                name="typeGrant"
                id="typeGrant"
                value={
                  formDataUser.category === "VISITANTE"
                    ? (formDataUser.typeGrant = "NAO_APLICAVEL")
                    : formDataUser.typeGrant
                }
                onChange={handleInputChange}
                className={styles.inputMedium}
                disabled={formDataUser.category === "VISITANTE"}
              >
                <option>
                  {formDataUser.category === "VISITANTE"
                    ? "Não aplicável"
                    : "Selecione o tipo de bolsa"}
                </option>
                <option value="INTEGRAL">Integral</option>
                <option value="PARCIAL">Parcial</option>
                <option value="NAO_APLICAVEL">Não aplicável</option>
              </select>
            </div>
          </div>
        </div>
      );
    case 2:
      return (
        <div className={styles.modalContainer}>
          <div className={styles.item}>
            <div className={styles.itens}>
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                value={formDataUser.email}
                onChange={handleInputChange}
                placeholder="Digite o e-mail"
                className={styles.inputBig}
              />
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.itens}>
              <label htmlFor="emailRecovery">Confirmação de e-mail</label>
              <input
                id="emailRecovery"
                type="email"
                value={formDataUser.emailRecovery}
                onChange={handleInputChange}
                placeholder="Digite o e-mail novamente"
                className={styles.inputBig}
              />
            </div>
          </div>

          <div className={styles.item}>
            <div className={styles.itens}>
              <label htmlFor="password">Senha</label>
              <input
                id="password"
                type="password"
                value={formDataUser.password || ""}
                onChange={handleInputChange}
                placeholder="Digite a senha"
                className={styles.inputBig}
              />
              <PasswordValidationChecklist validations={passwordValidations} />
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export default Form;
