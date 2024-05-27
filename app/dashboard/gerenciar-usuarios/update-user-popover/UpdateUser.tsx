"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";
import { Modal, Button, Input, message } from "antd";
import { useStore } from "../../../../store";
import { validateEmail } from "@/app/helpers/isValidEmailUser";
import { validatePassword } from "@/app/helpers/idValidPasswordUser";
import { IDataUser } from "../../../Interfaces/user.interfaces";
import { IUserUpdate } from "../../../Interfaces/user.interfaces";
import axios from "axios";
import {
  errorToast,
  successToast,
} from "@/app/services/toast-messages/toast-messages";
import PasswordValidationChecklist from "@/app/components/PasswordValidationChecklist/PasswordValidationChecklist";
import Header from "../modal-user/header/Header";
import Form from "../modal-user/Form/Form";
import Buttons from "../modal-user/Buttons/Buttons";

const UpdateUser: React.FC = () => {
  const [formData, setFormData] = useState<IDataUser | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const { updateUser, getAllUsers, selectedUser, setSelectedUser } = useStore();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formUpdate, setFormUpdate] = useState<IUserUpdate>({
    name: formData?.user.person.name,
    enrollment: formData?.enrrolment,
    category: formData?.user.category.name,
    typeGrant: formData?.user.typeGrant.name,
    dailyMeals: formData?.user.dailyMeals,
    password: formData?.user.loginUser.password,
    email: formData?.user.loginUser.email,
    emailRecovery: formData?.user.loginUser.emailRecovery,
    picture: formData?.picture,
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
      setCurrentStep(1);
      setIsModalOpen(true);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (formData) {
      setFormUpdate({
        name: formData.user.person.name,
        enrollment: formData.enrrolment,
        category: formData.user.category.name,
        typeGrant: formData.user.typeGrant.name,
        dailyMeals: formData.user.dailyMeals,
        password: formData.user.loginUser.password,
        email: formData.user.loginUser.email,
        emailRecovery: formData.user.loginUser.emailRecovery,
        picture: formData?.picture,
      });
    }
  }, [formData]);

  const [fileUploadUpdate, setFileUploadUpdate] = useState(false);
  const [fileUploadMessageUpdate, setFileUploadMessageUpdate] = useState(
    "Nenhuma Foto Selecionada"
  );

  const [fileContainerColorUpdate, setFileContainerColorUpdate] = useState("");

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

  const handlePictureUploadUpdate = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) {
      return;
    }

    if (!["image/svg+xml", "image/png", "image/jpeg"].includes(file.type)) {
      showError(
        "Por favor, selecione uma imagem nos formatos SVG, PNG ou JPEG.",
        errorToast
      );
      setFileUploadMessageUpdate("Não foi possível atualizar foto");
      setFileUploadUpdate(true);
      setFileContainerColorUpdate("#C50F1F");
      return;
    }

    if (file.size > 1048576) {
      showError("O tamanho do arquivo deve ser de até 1MB.", errorToast);
      setFileUploadMessageUpdate("Não foi possível atualizar foto");
      setFileUploadUpdate(true);
      setFileContainerColorUpdate("#C50F1F");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post("/api/upload", formData);

      const picture = response.data;
      setFormUpdate((prevFormData) => ({
        ...prevFormData,
        picture: picture,
      }));

      setFileUploadMessageUpdate("Foto atualizada com sucesso");
      setFileUploadUpdate(true);
      setFileContainerColorUpdate("#107C10");
    } catch (error) {
      showError(
        "Erro ao enviar a imagem. Por favor, tente novamente.",
        errorToast
      );
      setFileUploadMessageUpdate("Não foi possível atualizar foto");
      setFileUploadUpdate(true);
      setFileContainerColorUpdate("#C50F1F");
    }
  };

  const handleInputChangeUpdate = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    let newValue: string | number;
    if (id === "name") {
      newValue = value.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ\s]/g, "").toUpperCase();
    } else if (
      id === "dailyMeals"
      //||
      // id === "category" ||
      // id === "typeGrant"
    ) {
      newValue = isNaN(parseInt(value)) ? "" : parseInt(value);
    } else if (id === "enrollment") {
      newValue = value.replace(/\D/g, "");
    } else {
      newValue = value;
    }

    if (formData) {
      setFormUpdate((prevFormData) => ({ ...prevFormData!, [id]: newValue }));
    }

    if (id === "password") {
      validatePasswordChecklist(value);
    }
  };

  const nextStep = () => {
    if (validateForm()) {
      setCurrentStep(currentStep + 1);
    } else {
      error(
        "Os campos não podem estar vazios. Por favor, preencha-os antes de prosseguir."
      );
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const validateForm = () => {
    switch (currentStep) {
      case 1:
        if (formUpdate) {
          if (formUpdate.category === "VISITANTE") {
            return (
              formUpdate &&
              formUpdate.name &&
              formUpdate.category &&
              formUpdate.typeGrant &&
              formUpdate.dailyMeals
            );
          } else {
            return (
              formUpdate &&
              formUpdate.name &&
              formUpdate.enrollment &&
              formUpdate.category &&
              formUpdate.typeGrant &&
              formUpdate.dailyMeals
            );
          }
        }
        return false;
      case 2:
        return formUpdate && formUpdate.email && formUpdate.emailRecovery;
      default:
        return false;
    }
  };

  const handleUpdateUser = async () => {
    if (!formData || !formData.user.id) {
      showError(
        "ID do usuário não encontrado. Por favor, tente novamente.",
        errorToast
      );
      return;
    }

    if (validateForm()) {
      if (
        (formUpdate.name && formUpdate.name.length < 2) ||
        (formUpdate.name && formUpdate.name.length > 100)
      ) {
        showError("O nome deve ter entre 2 e 100 caracteres.", errorToast);
        return;
      }
      if (formUpdate && formUpdate.email && !validateEmail(formUpdate.email)) {
        showError(
          "O e-mail é inválido. Verifique e tente novamente.",
          errorToast
        );
        return;
      }
      if (
        formUpdate &&
        formUpdate.emailRecovery &&
        !validateEmail(formUpdate.emailRecovery)
      ) {
        showError(
          "O e-mail de recuperação é inválido. Verifique e tente novamente.",
          errorToast
        );
        return;
      }
      if (
        formUpdate &&
        formUpdate.password &&
        !validatePassword(formUpdate.password)
      ) {
        return;
      }
      try {
        await updateUser(formData.user.id, formUpdate)
          .then(() => {
            success("Cadastro atualizado com sucesso.");
          })
          .catch((error) => {
            //showError("error.message"); //it's not working
            errorToast(error.message);
          });
        setIsModalOpen(false);
        getAllUsers();
        setFileUploadMessageUpdate("Nenhuma Foto Selecionada");
        setSelectedUser(null);
        setFileContainerColorUpdate("");
      } catch (error: any) {
        showError(
          "Não foi possível atualizar o cadastro do usuário. Verifique e tente novamente.",
          errorToast
        );
      }
      resetPasswordValidations();
    } else {
      errorToast(
        "Os campos não podem estar vazios. Por favor, preencha-os antes de prosseguir."
      );
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
    resetPasswordValidations();
  };

  return (
    <>
      {contextHolder}
      <Modal
        data-testid="modal"
        title={<Header title="Atualizar usuário" handleClose={closeModal} />}
        open={isModalOpen}
        onCancel={closeModal}
        closable={false}
        className={styles.modalUpdateUser}
        footer={null}
      >
        <Form
          currentStep={currentStep}
          formDataUser={formUpdate}
          fileUploadMessage={fileUploadMessageUpdate}
          fileContainerColor={fileContainerColorUpdate}
          passwordValidations={passwordValidations}
          handleInputChange={handleInputChangeUpdate}
          handlePicture={handlePictureUploadUpdate}
          pictureUser={"pictureUpdate"}
        />

        <Buttons
          currentStep={currentStep}
          nextStep={nextStep}
          prevStep={prevStep}
          handleUser={handleUpdateUser}
        />
      </Modal>
    </>
  );
};
export default UpdateUser;
