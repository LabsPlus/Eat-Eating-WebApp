"use client";

import React, { useState } from "react";
import { ArrowLeftOutlined } from "@ant-design/icons";
import styles from "./page.module.css";
import Image from "next/image";
import { IPasswordData } from "../Interfaces/admin.interfaces";
import { isValidPassword } from "../helpers/isValidPassword";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import {
  errorToast,
  successToast,
} from "../services/toast-messages/toast-messages";

const NewPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [passwordData, setPasswordData] = useState<IPasswordData>({
    password: "",
    confirmPassword: "",
  });
  const [passawordValidations, setPassawordValidations] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialCharacter: false,
  });

  const handleConfirmPasswordVisibilityToggle = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;
    setPasswordData({ ...passwordData, [field]: value });

    const validations = {
      length: value.length >= 8 && value.length <= 15,
      lowercase: /[a-z]/.test(value),
      uppercase: /[A-Z]/.test(value),
      number: /\d/.test(value),
      specialCharacter: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(value),
    };
    setPassawordValidations(validations);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = isValidPassword(passwordData);

    try {
      if (response) {
        return errorToast(response);
      } else {
        const response = await axios.patch(
          `${process.env.NEXT_PUBLIC_API_URL}/login/update-password-login`,
          {
            newPassword: passwordData.password,
            token: token,
          }
        );
        successToast("Senha alterada com sucesso.");
        setPasswordData({ password: "", confirmPassword: "" });
        router.push("/login");
      }
    } catch (error) {
      console.error("Erro ao enviar o email:", error);
    }
  };

  return (
    <div className={styles.container}>
      <Image
        className={styles.imgIFBa}
        src="/images/Simbolo Ifba.jpg"
        alt="IFBa"
        width={70}
        height={95}
      />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.title}>
          <ArrowLeftOutlined className={styles.btnTtoGoBack} />
          <h2>Recuperar senha</h2>
        </div>

        <div className={styles.inputContainer}>
          <div>
            <input
              type={passwordVisible ? "text" : "password"}
              placeholder="Digite sua nova senha"
              value={passwordData.password}
              onChange={(e) => handlePasswordChange(e, "password")}
              className={styles.input}
              max={30}
            />
            <img
              className={styles.padlockIcon}
              src="/images/padlock-icon.svg"
              alt="Icone do cadeado"
            />
            {passwordVisible ? (
              <img
                src="/images/eye.svg"
                alt=""
                onClick={() => setPasswordVisible(!passwordVisible)}
                className={styles.eyeIcon}
              />
            ) : (
              <img
                src="/images/eye-visible.svg"
                alt=""
                onClick={() => setPasswordVisible(!passwordVisible)}
                className={styles.eyeVisible}
              />
            )}
          </div>

          <div className={styles.checkboxContainer}>
            <p>Sua senha deve conter</p>
            <div className={styles.checkbox}>
              <img
                src={
                  passawordValidations.length
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
                  passawordValidations.lowercase
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
                  passawordValidations.uppercase
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
                  passawordValidations.number
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
                  passawordValidations.specialCharacter
                    ? "/images/checked-circle.svg"
                    : "/images/check-circle.svg"
                }
                alt="Icone de check"
              />
              <span>Símbolo especial (Ex. !#$%)</span>
            </div>
          </div>

          <div>
            <input
              type={confirmPasswordVisible ? "text" : "password"}
              placeholder="Confirme sua senha"
              value={passwordData.confirmPassword}
              onChange={(e) => handlePasswordChange(e, "confirmPassword")}
              className={styles.input}
            />
            <img
              className={styles.padlockIcon}
              src="/images/padlock-icon.svg"
              alt="Icone do cadeado"
            />
            {confirmPasswordVisible ? (
              <img
                src="/images/eye.svg"
                alt=""
                onClick={handleConfirmPasswordVisibilityToggle}
                className={styles.eyeIcon}
              />
            ) : (
              <img
                src="/images/eye-visible.svg"
                alt=""
                onClick={handleConfirmPasswordVisibilityToggle}
                className={styles.eyeVisible}
              />
            )}
          </div>

          <button type="submit">Confirmar</button>
        </div>
      </form>

      <div className={styles.info}>
        <h1>Importante!</h1>
        <p>
          Sua senha deve incluir pelo menos 8 caracteres, com letras maiúsculas
          e minúsculas, números e caracteres especiais
        </p>
      </div>
      <Image
        className={styles.Ellipse}
        src="/images/Ellipse 6.jpg"
        alt="IFBa"
        width={170}
        height={130}
      />
    </div>
  );
};

export default NewPassword;
