import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Modal, Button, Input, message } from "antd";
import { useStore } from "../../../store";

interface UpdateUserPopoverProps {
  userData: any;
  visible: boolean;
  onClose: () => void;
}

const UpdateUserPopover: React.FC<UpdateUserPopoverProps> = ({
  userData,
  visible,
  onClose,
}) => {
  const [formData, setFormData] = useState(userData);
  const [currentStep, setCurrentStep] = useState(1);
  const { updateUser, getAllUsers } = useStore();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (visible) {
      setFormData(userData);
      setCurrentStep(1);
    }
  }, [visible, userData]);

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

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    let newValue;

    if (
      id === "dailyMeals" ||
      id === "categoryId" ||
      id === "typeStudentGrantId"
    ) {
      newValue = isNaN(value) ? "" : parseInt(value);
    } else {
      newValue = value;
    }

    setFormData({ ...formData, [id]: newValue });
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
        return formData.name && formData.enrollment && formData.dailyMeals;
      case 2:
        return formData.email && formData.password && formData.recoveryEmail;
      default:
        return false;
    }
  };

  const handleUpdateUser = async () => {
    if (validateForm()) {
      try {
        await updateUser(userData.id, formData);
        success("Usuário atualizado com sucesso!");
        onClose();
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

  return (
    <>
      {contextHolder}
      <Modal
        title="Atualizar usuário"
        visible={visible}
        onCancel={() => {
          setFormData(userData);
          onClose();
        }}
        footer={[
          currentStep === 1 ? (
            <Button key="cancel" onClick={onClose}>
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
                  value={formData.name}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.itens}>
                <label htmlFor="categoryId">Categoria:</label>
                <select
                  id="categoryId"
                  value={formData.categoryId}
                  onChange={handleInputChange}
                >
                  <option value="7">Aluno</option>
                  <option value="8">Funcionário</option>
                  <option value="9">Visitante</option>
                </select>
              </div>

              <div className={styles.itens}>
                <label htmlFor="typeStudentGrantId">Bolsa:</label>
                <select
                  id="typeStudentGrantId"
                  value={formData.typeStudentGrantId}
                  onChange={handleInputChange}
                >
                  <option value="8">Integral</option>
                  <option value="9">Parcial</option>
                  <option value="10">Não aplicável</option>
                </select>
              </div>
            </div>

            <div className={styles.item}>
              <div className={styles.itens}>
                <label htmlFor="enrollment">Matrícula:</label>
                <Input
                  id="enrollment"
                  value={formData.enrollment}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.itens}>
                <label htmlFor="dailyMeals">Refeições Realizadas:</label>
                <Input
                  id="dailyMeals"
                  value={formData.dailyMeals}
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
                  value={formData.email}
                  onChange={handleInputChange}
                  type="email"
                />
              </div>

              <div className={styles.itens}>
                <label htmlFor="password">Senha:</label>
                <Input
                  id="password"
                  value={formData.password}
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
                  value={formData.recoveryEmail}
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

