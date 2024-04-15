"use client";
import React, { useState } from "react";
import styles from "./page.module.css";
import { Button, Modal } from "antd";
import { useStore } from "../../../../store";

const PurchaseTickets = () => {
  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [ticketCount, setTicketCount] = useState(0);
  const showModal = () => {
    setOpen(true);
  };

  const { getAllUsers, selectedUser } = useStore();

  const handleOk = () => {
    if(ticketCount > 0){
      setConfirmLoading(true);
    }

    setTimeout(() => {
      setOpen(false);
      setConfirmLoading(false);
    }, 2000);
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal with async logic
      </Button>
      <Modal
        title="Adquirir ticket"
        open={open}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <img src="" alt="Foto" />
        <p>Nome do usuário: Teste</p>
        <p>Data da última compra: 12/04/2024</p>
        <input type="number" />
      </Modal>
    </>
  );
};

export default PurchaseTickets;
