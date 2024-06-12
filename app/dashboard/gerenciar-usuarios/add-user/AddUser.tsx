"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { Modal, message } from "antd";
import { useStore } from "../../../../store";
import axios from "axios";
import { validateEmail } from "@/app/helpers/isValidEmailUser";
import { validatePassword } from "@/app/helpers/idValidPasswordUser";
import {
  errorToast,
  successToast,
} from "@/app/services/toast-messages/toast-messages";
import Header from "../modal-user/header/Header";
import Form from "../modal-user/Form/Form";
import Buttons from "../modal-user/Buttons/Buttons";

const AddUser = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    enrollment: "",
    category: "",
    typeGrant: "",
    dailyMeals: 1,
    email: "",
    password: "",
    emailRecovery: "",
    picture: "",
  });

  const [messageApi, contextHolder] = message.useMessage();

  const [fileUploadAdd, setFileUploadAdd] = useState(false);
  const [fileUploadMessageAdd, setFileUploadMessageAdd] = useState(
    "Nenhuma foto foi selecionada"
  );
  const [fileContainerColorAdd, setFileContainerColorAdd] = useState("");

  const { createUser, getAllUsers } = useStore();

  const [passwordValidations, setPasswordValidations] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    number: false,
    specialCharacter: false,
  });

  const validatePasswordChecklist = (password: string) => {
    const validations = {
      length: password.length >= 8 && password.length <= 15,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      number: /\d/.test(password),
      specialCharacter: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    };
    setPasswordValidations(validations);
  };

  const resetPasswordValidations = () => {
    setPasswordValidations({
      length: false,
      lowercase: false,
      uppercase: false,
      number: false,
      specialCharacter: false,
    });
  };

  const resetAll = () => {
    setFormData({
      name: "",
      enrollment: "",
      category: "",
      typeGrant: "",
      dailyMeals: 1,
      email: "",
      password: "",
      emailRecovery: "",
      picture: "",
    });
    resetPasswordValidations();
    setCurrentStep(1);
    setIsModalOpen(false);
    setFileUploadMessageAdd("Nenhuma foto foi selecionada");
    setFileUploadAdd(false);
    setFileContainerColorAdd("");
  };

  const showError = (
    errorMsg: any,
    errorToastFunction: (msg: string) => void
  ) => {
    errorToastFunction(errorMsg);
  };

  const success = (successMsg: any) => {
    successToast(successMsg);
  };

  const error = (errorMsg: any) => {
    errorToast(errorMsg);
  };

  //cloudinary
  const handlePictureUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (!["image/svg+xml", "image/png", "image/jpeg"].includes(file.type)) {
      error("Por favor, selecione uma imagem nos formatos SVG, PNG ou JPEG.");
      setFormData((prevInputs) => ({
        ...prevInputs,
        picture: "",
      }));
      setFileUploadMessageAdd("Não foi possível adicionar uma foto");
      setFileUploadAdd(true);
      setFileContainerColorAdd("#C50F1F");
      return;
    }

    if (file.size > 1048576) {
      error("O tamanho do arquivo deve ser de até 1MB.");
      setFormData((prevInputs) => ({
        ...prevInputs,
        picture: "",
      }));
      setFileUploadMessageAdd("Não foi possível adicionar uma foto");
      setFileUploadAdd(true);
      setFileContainerColorAdd("#C50F1F");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post("/api/upload", formData);

      const picture = response.data;

      setFormData((prevInputs) => ({
        ...prevInputs,
        picture: picture,
      }));
      setFileUploadMessageAdd("Foto adicionada com sucesso");
      setFileUploadAdd(true);
      setFileContainerColorAdd("#107C10");
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChangeAdd = (e: any) => {
    const { id, value } = e.target;
    let newValue: string | number = value;
    if (id === "name") {
      newValue = value.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ\s]/g, "");
    }

    if (id === "enrollment") {
      newValue = value.replace(/\D/g, "");
    }

    if (id === "dailyMeals") {
      newValue = parseInt(value);
      if (newValue < 1) {
        newValue = 1;
      } else if (newValue > 3) {
        newValue = 3;
      }
    }
    setFormData({ ...formData, [id]: newValue });

    if (id === "password") {
      validatePasswordChecklist(value);
    }
  };

  const validateForm = () => {
    switch (currentStep) {
      case 1:
        if (formData.category === "VISITANTE") {
          return formData.name && formData.category && formData.dailyMeals;
        } else {
          return (
            formData.name &&
            formData.enrollment &&
            formData.category &&
            formData.typeGrant &&
            formData.dailyMeals
          );
        }
      case 2:
        return formData.email && formData.password && formData.emailRecovery;
      default:
        return false;
    }
  };

  const handleCreateUser = async () => {
    if (validateForm()) {
      if (
        (formData.name && formData.name.length < 2) ||
        (formData.name && formData.name.length > 100)
      ) {
        showError("O nome deve ter entre 2 e 100 caracteres.", errorToast);
        return;
      }
      if (!validateEmail(formData.email)) {
        error("O e-mail é inválido. Verifique e tente novamente.");
        return;
      }
      if (!validateEmail(formData.emailRecovery)) {
        error(
          "O e-mail de recuperação é inválido. Verifique e tente novamente."
        );
        return;
      }
      if (!validatePassword(formData.password)) {
        return;
      }
      setIsModalOpen(false);
      setCurrentStep(1);
      try {
        await createUser(formData)
          .then(() => {
            success("Cadastro realizado com sucesso.");
          })
          .catch((error) => {
            showError(error.message, errorToast);
          });
        getAllUsers();
      } catch (error: any) {
        console.log(error);
        showError(
          "Não foi possível cadastrar o usuário. Verifique e tente novamente.",
          errorToast
        );
      }
      resetAll();
    } else {
      error(
        "Os campos não podem estar vazios. Por favor, preencha-os antes de prosseguir."
      );
    }
  };

  const handleCancel = () => {
    resetAll();
  };

  const nextStep = () => {
    if (validateForm()) {
      setCurrentStep(currentStep + 1);
    } else {
      error(
        "Os campos não podem estar vazios. Por favor, preencha-os antes de prosseguir."
      );
      return;
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
    <>
      {contextHolder}
      <button className={styles.btnAdd} onClick={() => setIsModalOpen(true)}>
        Adicionar usuário
      </button>
      <Modal
        data-testid="modal"
        title={<Header title="Adicionar usuário" handleClose={handleCancel} />}
        open={isModalOpen}
        onCancel={handleCancel}
        closable={false}
        footer={
          <>
            <Buttons
              currentStep={currentStep}
              nextStep={nextStep}
              prevStep={prevStep}
              handleUser={handleCreateUser}
            />
          </>
        }
        className={styles.modalAddUser}
      >
        <Form
          currentStep={currentStep}
          formDataUser={formData}
          fileUploadMessage={fileUploadMessageAdd}
          fileContainerColor={fileContainerColorAdd}
          passwordValidations={passwordValidations}
          handleInputChange={handleInputChangeAdd}
          handlePicture={handlePictureUpload}
          pictureUser={"picture"}
        />
      </Modal>
    </>
  );
};

export default AddUser;
