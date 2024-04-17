"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Button, Input, Modal, message } from "antd";
import { useStore } from "../../../../store";
import { IDataUser, IUserTickets } from "../../../Interfaces/user.interfaces";
import moment from "moment";
import { DownOutlined, UpOutlined } from "@ant-design/icons";

const PurchaseTickets = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ticketQuantity, setTicketQuantity] = useState(0);

  const [formData, setFormData] = useState<IDataUser | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formTicket, setFormTicket] = useState<IUserTickets>({
    name: formData?.user.person.name,
    picture: formData?.picture,
    userTicketsData: formData?.userTicket
      ? {
          totalTicketsOfUserActive:
            formData.userTicket.userTicketsData?.totalTicketsOfUserActive || 0,
          ticket: formData.userTicket.userTicketsData?.ticket || [],
        }
      : undefined,
  });

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

  const success = (successMsg: any) => {
    message.success(successMsg);
  };

  const error = (errorMsg: any) => {
    message.error(errorMsg);
  };

  const { getAllUsers, selectedUser, purchaseTicket, setSelectedUser } =
    useStore();

  useEffect(() => {
    if (selectedUser) {
      setFormData(selectedUser);
      setCurrentStep(1);
      setIsModalOpen(true);
    }
  }, [selectedUser]);

  useEffect(() => {
    if (formData) {
      setFormTicket({
        name: formData.user.person.name,
        picture: formData.picture,
        userTicketsData: formData?.userTicket
          ? {
              totalTicketsOfUserActive:
                formData.userTicket.userTicketsData?.totalTicketsOfUserActive ||
                0,
              ticket: formData.userTicket.userTicketsData?.ticket || [],
            }
          : undefined,
      });
    }
  }, [formData]);

  const handlePurchaseTicket = async () => {
    if (!formData || ticketQuantity <= 0) {
      error("A quantidade de tickets deve ser superior a 0.");
      return;
    }

    setConfirmLoading(true);

    try {
      const purchaseTicketData = {
        ticketCount: ticketQuantity,
      };
      await purchaseTicket(formData.user.id, purchaseTicketData.ticketCount);

      setSelectedUser(null);
      setTicketQuantity(0);
      setConfirmLoading(false);
      getAllUsers();

      success("Ticket adicionado com sucesso.");
    } catch (erro) {
      console.error("Erro ao adicionar ticket:", error);
      setConfirmLoading(false);
      error(
        "Não foi possível adicionar o ticket. Verifique e tente novamente."
      );
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <Modal
        title={
          <span
            style={{ color: "#011742", fontSize: "24px", fontWeight: "800" }}
          >
            Adquirir ticket
          </span>
        }
        open={isModalOpen}
        onOk={handlePurchaseTicket}
        onCancel={handleCancel}
        className={styles.modal}
        footer={[
          <div className={styles.containerBtns}>
            <Button
              className={styles.btnCancel}
              key="cancel"
              onClick={handleCancel}
            >
              Cancelar
            </Button>

            <Button
              className={styles.btnConfirm}
              key="confirm"
              type="primary"
              onClick={handlePurchaseTicket}
            >
              Confirmar
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
                className={styles.img}
              />
              <div>
                <span>Usuário:</span> <span>{formData.user.person.name}</span>{" "}
                <br />
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

            <div className={styles.inputContainer}>
              <span>Quantidade de tickets a ser comprado</span>
              <div className={styles.test}>
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

export default PurchaseTickets;
