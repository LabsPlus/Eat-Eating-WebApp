"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Modal, Button, Input, message } from "antd";
import { useStore, User } from "../../../store";

const UpdateUserPopover: React.FC = () => {
  const [formData, setFormData] = useState<User | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const { updateUser, getAllUsers, selectedUser } = useStore();
  const [messageApi, contextHolder] = message.useMessage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
      setCurrentStep(1);
      setIsModalOpen(true);
    }
  }, [selectedUser]);

  const showError = (errorMsg: any) => {
    messageApi.open({
      type: "error",
      content: errorMsg,
    });
  };

  const success = (successMsg: any) => {
    message.success(successMsg);
  };

  const error = (errorMsg: any) => {
    message.error(errorMsg);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    let newValue: string | number;

    if (
      id === "dailyMeals" ||
      id === "categoryId" ||
      id === "typeStudentGrantId"
    ) {
      newValue = isNaN(parseInt(value)) ? "" : parseInt(value);
    } else {
      newValue = value;
    }

    if (formData) {
      setFormData((prevFormData) => ({ ...prevFormData!, [id]: newValue }));
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
        return (
          formData &&
          formData.name &&
          formData.enrollment &&
          formData.dailyMeals
        );
      case 2:
        return (
          formData &&
          formData.email &&
          formData.password &&
          formData.recoveryEmail
        );
      default:
        return false;
    }
  };

  const handleUpdateUser = async () => {
    if (!formData || !formData.id) {
      showError("ID do usuário não encontrado. Por favor, tente novamente.");
      return;
    }

    if (validateForm()) {
      try {
        await updateUser(formData.id, formData);
        success("Usuário atualizado com sucesso!");
        setIsModalOpen(false);
        getAllUsers();
      } catch (error: any) {
        showError(
          "Houve um erro ao atualizar o usuário. Por favor, tente novamente."
        );
      }
    } else {
      error("Por favor, preencha todos os campos obrigatórios.");
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
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
            <div className={styles.item}>
              <div className={styles.itens}>
                <label htmlFor="name">Nome:</label>
                <Input
                  id="name"
                  value={formData?.name || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.itens}>
                <label htmlFor="categoryId">Categoria:</label>
                <select
                  id="categoryId"
                  value={formData?.categoryId || ""}
                  onChange={handleInputChange}
                >
                  <option value="student">Aluno</option>
                  <option value="employee">Funcionário</option>
                  <option value="visitor">Visitante</option>
                </select>
              </div>

              <div className={styles.itens}>
                <label htmlFor="typeStudentGrantId">Bolsa:</label>
                <select
                  id="typeStudentGrantId"
                  value={formData?.typeStudentGrantId || ""}
                  onChange={handleInputChange}
                >
                  <option value="full">Integral</option>
                  <option value="partial">Parcial</option>
                  <option value="not_applicable">Não aplicável</option>
                </select>
              </div>
            </div>

            <div className={styles.item}>
              <div className={styles.itens}>
                <label htmlFor="enrollment">Matrícula:</label>
                <Input
                  id="enrollment"
                  value={formData?.enrollment || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.itens}>
                <label htmlFor="dailyMeals">Refeições Realizadas:</label>
                <Input
                  id="dailyMeals"
                  value={formData?.dailyMeals || ""}
                  onChange={handleInputChange}
                  type="number"
                />
              </div>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className={styles.modalContainer}>
            <div className={styles.item}>
              <div className={styles.itens}>
                <label htmlFor="email">E-mail:</label>
                <Input
                  id="email"
                  value={formData?.email || ""}
                  onChange={handleInputChange}
                  type="email"
                />
              </div>

              <div className={styles.itens}>
                <label htmlFor="password">Senha:</label>
                <Input
                  id="password"
                  value={formData?.password || ""}
                  onChange={handleInputChange}
                  type="password"
                />
              </div>
            </div>
            <div className={styles.item}>
              <div className={styles.itens}>
                <label htmlFor="recoveryEmail">E-mail de Recuperação:</label>
                <Input
                  id="recoveryEmail"
                  value={formData?.recoveryEmail || ""}
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
export default UpdateUserPopover;
