import React, { useState } from "react";
import styles from "./page.module.css";
import { Modal, Button, message } from "antd";
import { useStore } from "../../../store";

const Popover = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    enrollment: "",
    categoryId: 0,
    typeStudentGrantId: 0,
    dailyMeals: 0,
    email: "",
    password: "",
    recoveryEmail: "",
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

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    let newValue: string | number = value;
    if (
      id === "categoryId" ||
      id === "typeStudentGrantId" ||
      id === "dailyMeals"
    ) {
      newValue = parseInt(value);
    }
    setFormData({ ...formData, [id]: newValue });
  };

  const validateForm = () => {
    switch (currentStep) {
      case 1:
        return formData.name && formData.enrollment && formData.dailyMeals;
      case 2:
        return formData.email && formData.password && formData.recoveryEmail;
      default:
        return false;
    }
  };

  const handleCreateUser = async () => {
    if (validateForm()) {
      setIsModalOpen(false);
      setCurrentStep(1);
      try {
        await createUser(formData);
        getAllUsers();
        success("Usuário criado com sucesso!");
      } catch (error: any) {
        showError(
          "Houve um erro ao criar o usuário. Por favor, tente novamente."
        );
      }
      setFormData({
        name: "",
        enrollment: "",
        categoryId: 0,
        typeStudentGrantId: 0,
        dailyMeals: 0,
        email: "",
        password: "",
        recoveryEmail: "",
      });
    } else {
      error("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentStep(1);
    setFormData({
      name: "",
      enrollment: "",
      categoryId: 0,
      typeStudentGrantId: 0,
      dailyMeals: 0,
      email: "",
      password: "",
      recoveryEmail: "",
    });
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
          <Button key="next" type="primary" onClick={nextStep} className={styles.antBtnPrimary}>
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
            <div className={styles.item}>
              <div className={styles.itens}>
                <input
                  id="name"
                  type="text"
                  placeholder="Taylor Swift"
                  value={formData.name}
                  onChange={handleInputChange}
                />
                <label htmlFor="name">Nome completo</label>
              </div>

              <div className={styles.itens}>
                <select
                  name="categoryId"
                  id="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                >
                  <option>Usuário</option>
                  <option value="7">Aluno</option>
                  <option value="8">Funcionário</option>
                  <option value="9">Visitante</option>
                </select>
              </div>

              <div className={styles.itens}>
                <select
                  name="typeStudentGrantId"
                  id="typeStudentGrantId"
                  value={formData.typeStudentGrantId}
                  onChange={handleInputChange}
                >
                  <option>Bolsa</option>
                  <option value="8">Integral</option>
                  <option value="9">Parcial</option>
                  <option value="10">Não aplicável</option>
                </select>
              </div>
            </div>

            <div className={styles.item}>
              <div className={styles.itens}>
                <input
                  id="enrollment"
                  type="text"
                  placeholder="9877720"
                  value={formData.enrollment}
                  onChange={handleInputChange}
                />
                <label htmlFor="enrollment">Matrícula</label>
              </div>

              <div className={styles.itens}>
                <input
                  id="dailyMeals"
                  type="number"
                  value={formData.dailyMeals}
                  onChange={handleInputChange}
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
                  id="recoveryEmail"
                  type="email"
                  value={formData.recoveryEmail}
                  onChange={handleInputChange}
                />
                <label htmlFor="recoveryEmail">E-mail de Recuperação</label>
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
        visible={isModalOpen}
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

export default Popover;