"use client";
import React, { useRef, useState } from "react";
import styles from "./page.module.css";
import { Modal, Button, message, Input, Image } from "antd";
import { useStore } from "../../../../store";
import axios from "axios";

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

  const { createUser, getAllUsers } = useStore();

  const showError = (errorMsg: any) => {
    messageApi.open({
      type: "error",
      content: errorMsg,
    });
  };

  const success = (successMsg: any) => {
    messageApi.open({
      type: "success",
      content: successMsg,
    });
  };

  const error = (errorMsg: any) => {
    messageApi.open({
      type: "error",
      content: errorMsg,
    });
  };

  //cloudinary
  const handlePictureUpload = async (e: any) => {
    const { name } = e.target;

    if (name === "picture") {
      const file = e.target.files[0];

      try {
        const formData = new FormData();
        formData.append("file", file);
        const response = await axios.post("/api/upload", formData);

        const picture = response.data;

        setFormData((prevInputs) => ({
          ...prevInputs,
          picture: picture,
        }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    let newValue: string | number = value;
    // if (id === "category" || id === "typeGrant" || id === "dailyMeals") {
    if (id === "name") {
      newValue = value.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ\s]/g, "").toUpperCase();
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
  };

  const validateEmail = (email: any) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePassword = (password: any) => {
    const regex = /^[\s\S]{8,10}$/;
    return regex.test(password);
  };

  const validateForm = () => {
    switch (currentStep) {
      case 1:
        if (formData.category === "VISITANTE") {
          return (
            formData.name &&
            formData.category &&
            formData.typeGrant &&
            formData.dailyMeals
          );
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
    console.log(formData);
    if (validateForm()) {
      if (!validateEmail(formData.email)) {
        showError(
          "O endereço de e-mail fornecido não é válido. Por favor, verifique e tente novamente."
        );
        return;
      }
      if (!validateEmail(formData.emailRecovery)) {
        showError(
          "O endereço de e-mail de recuperação fornecido não é válido. Por favor, verifique e tente novamente."
        );
        return;
      }
      if (!validatePassword(formData.password)) {
        showError(
          "Sua senha deve incluir pelo menos 8 caracteres, com letras maiúsculas e minúsculas, números e caracteres especiais."
        );
        return;
      }
      setIsModalOpen(false);
      setCurrentStep(1);
      try {
        await createUser(formData)
          .then(() => {
            success("Usuário adicionado com sucesso!");
          })
          .catch((error) => {
            showError(error.message);
          });
        getAllUsers();
      } catch (error: any) {
        console.log(error);
        showError(
          "Houve um erro ao criar o usuário. Por favor, tente novamente."
        );
      }
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
    } else {
      error("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
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
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const nextStep = () => {
    if (validateForm()) {
      setCurrentStep(currentStep + 1);
    } else {
      error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const renderFooterButtons = () => {
    switch (currentStep) {
      case 1:
        return [
          <Button
            key="next"
            type="primary"
            onClick={nextStep}
            className={styles.antBtnPrimary}
          >
            Próximo
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
        ];
      case 2:
        return [
          <Button key="prev" onClick={prevStep}>
            Voltar
          </Button>,
          <Button key="save" type="primary" onClick={handleCreateUser}>
            Salvar
          </Button>,
          <Button key="cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
        ];
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className={styles.modalContainer}>
            <div className={styles.pictureContainer}>
              {formData && formData.picture ? (
                <img src={formData.picture} alt="User Logo" />
              ) : (
                <div className={styles.placeholder}></div>
              )}
              <div className={styles.fileContainer}>
                <input
                  name="picture"
                  id="picture"
                  type="file"
                  onChange={handlePictureUpload}
                  ref={fileInputRef}
                />
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itens}>
                <input
                  id="name"
                  type="text"
                  placeholder=""
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <label htmlFor="name">Nome completo</label>
              </div>

              <div className={styles.itens}>
                <select
                  name="category"
                  id="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={styles.inputSmall}
                >
                  <option>Usuário</option>
                  <option value="ESTUDANTE">Aluno</option>
                  <option value="FUNCIONARIO">Funcionário</option>
                  <option value="VISITANTE">Visitante</option>
                </select>
              </div>

              <div className={styles.itens}>
                <select
                  name="typeGrant"
                  id="typeGrant"
                  value={formData.typeGrant}
                  onChange={handleInputChange}
                  className={styles.inputSmall}
                >
                  <option>Bolsa</option>
                  <option value="INTEGRAL">Integral</option>
                  <option value="PARCIAL">Parcial</option>
                  <option value="NAO_APLICAVEL">Não aplicável</option>
                </select>
              </div>
            </div>

            <div className={styles.item}>
              <div className={styles.itens}>
                <Input
                  id="enrollment"
                  type="text"
                  placeholder=""
                  value={
                    formData.category === "VISITANTE"
                      ? "XXXXXXX"
                      : formData.enrollment
                  }
                  onChange={handleInputChange}
                  disabled={formData.category === "VISITANTE"}
                  maxLength={7}
                  className={styles.inputSmall}
                />
                <label htmlFor="enrollment">Matrícula</label>
              </div>

              <div className={styles.itens}>
                <input
                  id="dailyMeals"
                  type="number"
                  value={formData.dailyMeals}
                  onChange={handleInputChange}
                  max={3}
                  className={styles.inputMedium}
                />
                <label htmlFor="dailyMeals">Refeições diárias </label>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className={styles.modalContainer}>
            <div className={styles.item}>
              <div className={styles.itens}>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <label htmlFor="email">E-mail</label>
              </div>

              <div className={styles.itens}>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <label htmlFor="password">Senha</label>
              </div>
            </div>

            <div className={styles.item}>
              <div className={styles.itens}>
                <input
                  id="emailRecovery"
                  type="email"
                  value={formData.emailRecovery}
                  onChange={handleInputChange}
                />
                <label htmlFor="emailRecovery">E-mail de Recuperação</label>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {contextHolder}
      <button className={styles.btnAdd} onClick={() => setIsModalOpen(true)}>
        Adicionar usuários
      </button>
      <Modal
        data-testid="modal"
        title={<span className={styles.title}>Adicionar usuário</span>}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={renderFooterButtons()}
        className={styles.modal}
        style={{ width: "564px", height: "426px" }}
      >
        {renderContent()}
      </Modal>
    </>
  );
};

export default AddUser;
