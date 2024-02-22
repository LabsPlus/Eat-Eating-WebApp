"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Modal, Button, Input, message } from "antd";
import { useStore, User } from "../../../store";
import { IDataUser,IUserUpdate } from "../Interfaces/usuario.interface";

const UpdateUserPopover: React.FC = () => {
  const [formData, setFormData] = useState<IDataUser | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const { updateUser, getAllUsers, selectedUser } = useStore();
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
  });

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
      setCurrentStep(1);
      setIsModalOpen(true);
    }
  }, [selectedUser, formUpdate]);

  console.log(formData, "formData");

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
      });
    }
  }, [formData]);
  

  console.log(formUpdate, 'form update')

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
      id === "dailyMeals"
      //||
      // id === "category" ||
      // id === "typeGrant"
    ) {
      newValue = isNaN(parseInt(value)) ? "" : parseInt(value);
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
        return (
          formUpdate &&
          formUpdate.name &&
          formUpdate.enrollment &&
          formUpdate.category &&
          formUpdate.typeGrant &&
          formUpdate.dailyMeals
        );
      case 2:
        return (
          formUpdate &&
          // formData.user.loginUser.email  &&
          formUpdate.password &&
          formUpdate.emailRecovery
        );
      default:
        return false;
    }
  };

  const handleUpdateUser = async () => {
    if (!formData || !formData.user.id) {
      showError("ID do usuário não encontrado. Por favor, tente novamente.");
      return;
    }

    if (validateForm()) {
      try {
        await updateUser(formData.user.id, formData);
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
                  <option value="ESTUDANTE">Aluno</option>
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
                  value={formUpdate.enrollment || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.itens}>
                <label htmlFor="dailyMeals">Refeições Realizadas:</label>
                <Input
                  id="dailyMeals"
                  value={formUpdate.dailyMeals || ""}
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
export default UpdateUserPopover;
