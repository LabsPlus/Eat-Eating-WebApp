"use client";

import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Spin } from "antd";
import { DownOutlined, UpOutlined, LoadingOutlined  } from "@ant-design/icons";
import moment from "moment";

import { useStore } from "@/store";
import { IDataUser } from "../../../Interfaces/user.interfaces";
import { errorToast, successToast } from "@/app/services/toast-messages/toast-messages";

import styles from "./page.module.css";

interface IModalTicketProps {
  typeModal: 'purchase' | 'edit';
  closePurchaseModal: (boolean: boolean) => void;
  closeEditModal: (boolean: boolean) => void;
}

const ModalTicket = ({ typeModal, closePurchaseModal, closeEditModal }: IModalTicketProps ) => {
  const [ticketQuantity, setTicketQuantity] = useState(0);
  const [formData, setFormData] = useState<IDataUser | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const { getAllUsers, selectedUser, purchaseTicket, editTicket,setSelectedUser, getInfoTickets } =
  useStore();

  const typeModalIsPurchase = typeModal === "purchase";

  const handleDecrease = () => {
    if (ticketQuantity > 0) {
      setTicketQuantity(ticketQuantity - 1);
    }
  };

  const handleIncrease = () => {
    setTicketQuantity(ticketQuantity + 1);
  };

  const formatDate = (date: any) => {
    return moment(date).format("DD/MM/YYYY");
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);

    if (typeModalIsPurchase) {
      closePurchaseModal(false);
    } else {
      closeEditModal(false);
    }
  };

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
      setIsModalOpen(true);
    }
  }, [selectedUser]);

  const handlePurchaseTicket = async () => {
    try {
      setIsLoadingButton(true);

      if (!formData || ticketQuantity <= 0) {
        errorToast("A quantidade de tickets deve ser superior a 0.");
        setIsLoadingButton(false);
        
        return;
      }

      if (typeModalIsPurchase) {
        await purchaseTicket(formData.user.id, ticketQuantity);

        closePurchaseModal(false);
        successToast("Ticket adicionado com sucesso.");
      } else {
        await editTicket(formData.user.id, ticketQuantity);

        closeEditModal(false);
        successToast("Ticket alterado com sucesso.");
      }

      await getAllUsers();
      await getInfoTickets();

      setSelectedUser(null);
      setTicketQuantity(0);
      setIsLoadingButton(false);

    } catch (error) {
      console.error("Erro ao adicionar ticket:", error);

      if (typeModalIsPurchase) {
        errorToast(
          "Não foi possível adicionar o ticket. Verifique e tente novamente."
        );
      } else {
        errorToast(
        "Não foi possível alterar o ticket. Verifique e tente novamente."
       )
      }

      setIsLoadingButton(false);
    }
  };

  return (
    <>
      <Modal
        mask={true}
        styles={{ mask: { backgroundColor: "rgba(177, 197, 235, 0.15)" } }}
        title={
          <span
            style={{ color: "#011742", fontSize: "24px", fontWeight: "700", fontFamily: "Inter"}}
          >
            {typeModalIsPurchase ? "Adquirir ticket" : "Editar ticket"}
          </span>
        }
        closeIcon={
          <span
            role="img"
            aria-label="close"
            className="anticon anticon-close ant-modal-close-icon"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
                fill="#333333"
              />
            </svg>
          </span>
        }
        open={isModalOpen}
        onOk={handlePurchaseTicket}
        onCancel={handleCancel}
        className={styles.modal}
        footer={[
          <div className={styles.containerBtns}>
            <Button
              className={`${styles.modalButton} ${styles.btnCancel}`}
              key="cancel"
              onClick={handleCancel}
            >
              Cancelar
            </Button>

            <Button
              className={`${styles.modalButton} ${styles.btnConfirm}`}
              key="confirm"
              type="primary"
              onClick={handlePurchaseTicket}
              disabled={isLoadingButton}
            >
              {isLoadingButton ? (
                <Spin
                  indicator={<LoadingOutlined className={styles.spin} spin />}
                />
              ) : (
                "Confirmar"
              )}
            </Button>
          </div>,
        ]}
      >
        {formData && (
          <div className={styles.container}>
            <div className={styles.profile}>
              <img
                src={
                  formData.picture ||
                  "https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Free-Image.png"
                }
                alt="Foto do usuário"
              />
              <div className={styles.infoUser}>
                <div>
                  <span>Usuário:</span> <span>{formData.user.person.name}</span>
                </div>
                <div>
                  <span>Última Compra: </span>{" "}
                  <span>
                    {" "}
                    {formData.user.userTicketsCount &&
                    formData.user.userTicketsCount.ticket &&
                    formData.user.userTicketsCount.ticket.length > 0
                      ? formatDate(
                          formData.user.userTicketsCount.ticket[0].purchaseDate
                        )
                      : "Nenhuma compra"}
                  </span>
                </div>
              </div>
            </div>

            <div className={styles.tickerQuantity}>
              <span>
                Quantidade de tickets a ser{" "}
                {typeModalIsPurchase ? "comprado" : "removido"}
              </span>
              <div className={styles.inputContainer}>
                <Input
                  className={styles.input}
                  type="number"
                  value={ticketQuantity}
                  onChange={(e) => setTicketQuantity(parseInt(e.target.value))}
                  placeholder="Quantidade de tickets"
                  min={0}
                />
                <div className={styles.arrowsContainer}>
                  <UpOutlined
                    className={styles.arrow}
                    onClick={handleIncrease}
                  />
                  <DownOutlined
                    className={styles.arrow}
                    onClick={handleDecrease}
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
};

export default ModalTicket;