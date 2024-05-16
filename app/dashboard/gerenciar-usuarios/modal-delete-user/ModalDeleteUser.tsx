"use client";

import React from "react";
import { Button, Modal } from "antd";

import { errorToast, successToast } from "@/app/services/toast-messages/toast-messages";
import { useStore } from "@/store";
import { IModalDeleteUserProps } from "@/app/Interfaces/user.interfaces";

import styles from "./page.module.css";

const ModalDeleteUser = ({ deleteUserId, setDeleteUserId, setDeleteModalVisible }: IModalDeleteUserProps) => {
  const { deleteUser } = useStore();

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      
      successToast("Usuário deletado com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);

      errorToast("Não foi possível deletar usuário. Verifique e tente novamente.");
    }
  };
  
  const handleConfirmDelete = async () => {
    if (deleteUserId) {
      await handleDeleteUser(deleteUserId);
      setDeleteUserId(null);
      setDeleteModalVisible(false);
    }
  };

  const handleCancelDelete = () => {
    setDeleteModalVisible(false);
    setDeleteUserId(null);
  };

  return (
    <Modal
      title={
        <h2 className={styles.modalDeleteTitle}>
          Deletar usuário
        </h2>
      }
      open={!!deleteUserId}
      closable={false}
      footer={[
        <div className={styles.modalDeleteButtonContainer}>
          <Button
            className={`${styles.modalDeleteButton} ${styles.modalDeleteCancelButton}`}
            onClick={handleCancelDelete}
          >
            Cancelar
          </Button>
          <Button
            className={`${styles.modalDeleteButton} ${styles.modalDeleteOkButton} ant-btn-primary`}
            onClick={handleConfirmDelete}
          >
            Deletar
          </Button>
        </div>,
      ]}
    >
      <p className={styles.modalDeleteSubtitle}>
        Tem certeza que deseja deletar este usuário?
      </p>
    </Modal>
  )
}

export default ModalDeleteUser;