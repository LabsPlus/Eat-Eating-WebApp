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
import { errorToast, successToast } from "@/app/services/toast-messages/toast-messages";

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
        emailRecovery: formData.user.loginUser.emailRecovery,
        picture: formData?.picture,
      });
    }
  }, [formData]);

  const [fileUploadUpdate, setFileUploadUpdate] = useState(false);
  const [fileUploadMessage, setFileUploadMessage] = useState(
    "Nenhum Ficheiro Selecionado"
  );

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

  const handlePictureUpload = async (e: any) => {
    const { name } = e.target;

    if (name === "pictureUpdate") {
      const file = e.target.files[0];
      if (!["image/svg+xml", "image/png", "image/jpeg"].includes(file.type)) {
        showError(
          "Por favor, selecione uma imagem nos formatos SVG, PNG ou JPEG.",
          errorToast
        );
        setFileUploadMessage("Não foi possível atualizar ficheiro");
        setFileUploadUpdate(true);
        return;
      }

      if (file.size > 1048576) {
        showError("O tamanho do arquivo deve ser de até 1MB.", errorToast);
        setFileUploadMessage("Não foi possível atualizar ficheiro");
        setFileUploadUpdate(true);
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
        setFileUploadMessage("Ficheiro atualizado com sucesso");
        setFileUploadUpdate(true);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleInputChange = (
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
  };

  const nextStep = () => {
    if (validateForm()) {
      setCurrentStep(currentStep + 1);
    } else {
      error("Por favor, preencha todos os campos obrigatórios.");
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
        return (
          formUpdate &&
          // formData.user.loginUser.email  &&
          // formUpdate.password &&
          formUpdate.emailRecovery
        );
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
        formUpdate &&
        formUpdate.emailRecovery &&
        !validateEmail(formUpdate.emailRecovery)
      ) {
        showError(
          "O endereço de e-mail de recuperação fornecido não é válido. Por favor, verifique e tente novamente.",
          errorToast
        );
        return;
      }
      if (
        formUpdate &&
        formUpdate.password &&
        !validatePassword(formUpdate.password)
      ) {
        showError(
          "Sua senha deve incluir pelo menos 8 caracteres, com letras maiúsculas e minúsculas, números e caracteres especiais.",
          errorToast
        );
        return;
      }
      try {
        await updateUser(formData.user.id, formUpdate)
          .then(() => {
            success("Cadastro atualizado com sucesso!");
          })
          .catch((error) => {
            //showError("error.message"); //it's not working
            errorToast(error.message);
          });
        setIsModalOpen(false);
        getAllUsers();
        setFileUploadMessage("Nenhum Ficheiro Selecionado");
        setSelectedUser(null);
      } catch (error: any) {
        showError(
          "Não foi possível atualizar o cadastro do usuário. Verifique e tente novamente",
          errorToast
        );
      }
    } else {
      errorToast("Os campos não podem estar vazios. Por favor, preencha-os antes de prosseguir.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      {contextHolder}
      <Modal
        title="Atualizar usuário"
        open={isModalOpen}
        onCancel={closeModal}
        footer={[
          currentStep === 1 ? (
            <Button key="cancel" onClick={closeModal}>
              Cancelar
            </Button>
          ) : (
            <Button key="prev" onClick={prevStep}>
              Voltar
            </Button>
          ),
          currentStep === 2 ? (
            <Button key="update" type="primary" onClick={handleUpdateUser}>
              Atualizar
            </Button>
          ) : (
            <Button key="next" type="primary" onClick={nextStep}>
              Próximo
            </Button>
          ),
        ]}
      >
        {currentStep === 1 && (
          <div className={styles.modalContainer}>
            <div className={styles.pictureContainer}>
              {formUpdate && formUpdate.picture ? (
                <img src={formUpdate.picture} alt="Foto do usuário" />
              ) : (
                <img
                  src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Free-Image.png"
                  alt="Foto do usuário"
                />
              )}
              <div
                className={styles.fileContainer}
                style={{ width: fileUploadUpdate ? "400px" : "370px" }}
              >
                <label htmlFor="pictureUpdate">Escolher ficheiro</label>
                <input
                  name="pictureUpdate"
                  id="pictureUpdate"
                  type="file"
                  onChange={handlePictureUpload}
                />
                <span>{fileUploadMessage}</span>
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itens}>
                <label htmlFor="name">Nome:</label>
                <Input
                  id="name"
                  value={formUpdate.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.itens}>
                <label htmlFor="category">Categoria:</label>
                <select
                  id="category"
                  value={formUpdate.category}
                  onChange={handleInputChange}
                >
                  <option value="ALUNO">Aluno</option>
                  <option value="FUNCIONARIO">Funcionário</option>
                  <option value="VISITANTE">Visitante</option>
                </select>
              </div>

              <div className={styles.itens}>
                <label htmlFor="typeGrant">Bolsa:</label>
                <select
                  id="typeGrant"
                  value={formUpdate.typeGrant || ""}
                  onChange={handleInputChange}
                >
                  <option value="INTEGRAL">Integral</option>
                  <option value="PARCIAL">Parcial</option>
                  <option value="NAO_APLICAVEL ">Não aplicável</option>
                </select>
              </div>
            </div>

            <div className={styles.item}>
              <div className={styles.itens}>
                <label htmlFor="enrollment">Matrícula:</label>
                <Input
                  id="enrollment"
                  value={
                    formUpdate.category === "VISITANTE"
                      ? "XXXXXXX"
                      : formUpdate.enrollment || ""
                  }
                  onChange={handleInputChange}
                  disabled={formUpdate.category === "VISITANTE"}
                  maxLength={7}
                />
              </div>

              <div className={styles.itens}>
                <label htmlFor="dailyMeals">Refeições Realizadas:</label>
                <Input
                  id="dailyMeals"
                  value={formUpdate.dailyMeals || ""}
                  onChange={handleInputChange}
                  type="number"
                  max={3}
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className={styles.modalContainer}>
            <div className={styles.item}>
              {/* <div className={styles.itens}>
                <label htmlFor="email">E-mail:</label>
                <Input
                  id="email"
                  value={formData?.user.loginUser.email || ""}
                  onChange={handleInputChange}
                  type="email"
                />
              </div> */}

              <div className={styles.itens}>
                <label htmlFor="password">Senha:</label>
                <Input
                  id="password"
                  value={formUpdate.password || ""}
                  onChange={handleInputChange}
                  type="password"
                />
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itens}>
                <label htmlFor="emailRecovery">E-mail de Recuperação:</label>
                <Input
                  id="emailRecovery"
                  value={formUpdate.emailRecovery || ""}
                  onChange={handleInputChange}
                  type="email"
                />
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};
export default UpdateUser;
