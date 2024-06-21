"use client";

import React, { useEffect, useState } from "react";
import moment from "moment";
import "moment-timezone";
import { Button, Select, Table } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  VerticalLeftOutlined,
} from "@ant-design/icons";

import { useStore } from "../../../../store";

import styles from "./page.module.css";
import ModalTicket from "../modal-ticket/ModalTicket";

const ListTickets = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [purchaseTicketVisible, setPurchaseTicketVisible] = useState(false);
  const [openPurchaseModal, setOpenPurchaseModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const { users, getAllUsers, selectedUser, setSelectedUser, noUsersFound } =
    useStore();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const EditIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M4 20.1549C3.45 20.1549 2.97917 19.959 2.5875 19.5674C2.19583 19.1757 2 18.7049 2 18.1549V4.15488C2 3.60488 2.19583 3.13405 2.5875 2.74238C2.97917 2.35072 3.45 2.15488 4 2.15488H12.925L10.925 4.15488H4V18.1549H18V11.2049L20 9.20488V18.1549C20 18.7049 19.8042 19.1757 19.4125 19.5674C19.0208 19.959 18.55 20.1549 18 20.1549H4ZM8 14.1549V9.90488L17.175 0.729883C17.375 0.529883 17.6 0.379883 17.85 0.279883C18.1 0.179883 18.35 0.129883 18.6 0.129883C18.8667 0.129883 19.1208 0.179883 19.3625 0.279883C19.6042 0.379883 19.825 0.529883 20.025 0.729883L21.425 2.15488C21.6083 2.35488 21.75 2.57572 21.85 2.81738C21.95 3.05905 22 3.30488 22 3.55488C22 3.80488 21.9542 4.05072 21.8625 4.29238C21.7708 4.53405 21.625 4.75488 21.425 4.95488L12.25 14.1549H8ZM10 12.1549H11.4L17.2 6.35488L16.5 5.65488L15.775 4.95488L10 10.7299V12.1549Z"
        fill="#0443BD"
      />
    </svg>
  );

  const AddIcon = () => (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="#0443BD" />
    </svg>
  );
  const handlePurchaseTicket = (user: any) => {
    setSelectedUser(user);
    setPurchaseTicketVisible(true);
    setOpenPurchaseModal(true);
  };

  const handleEditTicket = (user: any) => {
    setSelectedUser(user);
    setPurchaseTicketVisible(true);
    setOpenEditModal(true);
  };

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(users.length / pageSize);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageSizeChange = (value: any) => {
    setPageSize(value);
    setCurrentPage(1);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    const lastPage = Math.ceil(users.length / pageSize);
    setCurrentPage(lastPage);
  };

  let serialNumber = 0;

  const columns = [
    {
      title: "#",
      dataIndex: "serialNumber",
      key: "serialNumber",
    },
    {
      title: "Nome",
      dataIndex: ["user", "person", "name"],
      key: "nameAndPicture",
      render: (text: any, record: any) => (
        <div className={styles.nameAndPicture}>
          {record.picture ? (
            <img src={record.picture} alt="Foto do usuário" />
          ) : (
            <img
              src="https://www.pngall.com/wp-content/uploads/5/Profile-PNG-Free-Image.png"
              alt="Foto do usuário"
            />
          )}
          <span>{text}</span>
        </div>
      ),
    },
    {
      title: "Matrícula",
      dataIndex: "enrrolment",
      key: "enrrolment",
      className: styles.textCenter,
      render: (text: any, record: any) => {
        if (record.user.category.name === "VISITANTE") {
          return "Não aplicável";
        } else {
          return text;
        }
      },
    },
    {
      title: "Data da última compra",
      dataIndex: ["user", "userTicketsCount", "ticket"],
      key: "date",
      className: styles.textCenter,
      render: (text: any, record: any) => {
        if (
          record.user.userTicketsCount &&
          record.user.userTicketsCount.ticket &&
          record.user.userTicketsCount.ticket.length > 0
        ) {
          const lastTicket = record.user.userTicketsCount.ticket[0];
          return moment(lastTicket.purchaseDate).format("DD/MM/YYYY");
        }
        return "Nenhuma compra";
      },
    },
    {
      title: "Quantidade de tickets",
      dataIndex: ["user", "userTicketsCount"],
      key: "qtdTickets",
      className: styles.textCenter,
      render: (text: any, record: any) => {
        if (
          record.user.userTicketsCount &&
          record.user.userTicketsCount.totalTicketsOfUserActive != null
        ) {
          return record.user.userTicketsCount.totalTicketsOfUserActive;
        } else {
          return 0;
        }
      },
    },
    {
      title: "Ações",
      dataIndex: "action",
      key: "action",
      render: (text: any, record: any) => (
        <div className={styles.btnsContainer}>
          <Button
            className={styles.btnEditPurchase}
            icon={<EditIcon />}
            onClick={() => handleEditTicket(record.user.id)}
          />
          <Button
            className={styles.btnEditPurchase}
            icon={<AddIcon />}
            onClick={() => handlePurchaseTicket(record.user.id)}
          />

          {openPurchaseModal && (
            <ModalTicket
              typeModal="purchase"
              closePurchaseModal={setOpenPurchaseModal}
              closeEditModal={setOpenEditModal}
            />
          )}

          {openEditModal && (
            <ModalTicket
              typeModal="edit"
              closePurchaseModal={setOpenPurchaseModal}
              closeEditModal={setOpenEditModal}
            />
          )}
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Table
        className={styles.table}
        dataSource={users.map((user: any) => ({
          ...user,
          serialNumber: ++serialNumber,
        }))}
        columns={columns}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: users.length,
          onChange: handlePageChange,
          className: styles.defaultPagination,
        }}
      />

      <div className={styles.paginationContainer}>
        <div className={styles.selectContainer}>
          <span>Itens por páginas</span>
          <Select
            className={styles.pageSizeSelect}
            defaultValue={pageSize}
            onChange={handlePageSizeChange}
            suffixIcon={
              <img
                src="/images/down-arrow.svg"
                alt="Seta para baixo"
                style={{ paddingRight: "4px" }}
              />
            }
          >
            <option className={styles.optionSizeSelectOption} value={5}>
              5
            </option>
            <option className={styles.optionSizeSelectOption} value={10}>
              10
            </option>
            <option className={styles.optionSizeSelectOption} value={15}>
              15
            </option>
          </Select>
        </div>

        <div className={styles.paginationInfo}>
          {`${(currentPage - 1) * pageSize + 1} - ${
            currentPage * pageSize
          } de ${users.length}`}
        </div>

        <div className={styles.paginationButtons}>
          <img
            src="/images/first-page.svg"
            alt="Seta que navega para a primeira página"
            className={`${styles.first} ${
              currentPage === 1 ? styles.disabledButton : ""
            }`}
            onClick={goToFirstPage}
          />
          <img
            src="/images/left-arrow.svg"
            alt="Seta para esquerda"
            className={`${styles.prev} ${
              currentPage === 1 ? styles.disabledButton : ""
            }`}
            onClick={handlePrevPage}
          />
          <img
            src="/images/right-arrow.svg"
            alt="Seta para direita"
            className={`${styles.next} ${
              currentPage === Math.ceil(users.length / pageSize)
                ? styles.disabledButton
                : ""
            }`}
            onClick={handleNextPage}
          />
          <img
            src="/images/last-page.svg"
            alt="Seta que navega para a última página"
            className={`${styles.last} ${
              currentPage === Math.ceil(users.length / pageSize)
                ? styles.disabledButton
                : ""
            }`}
            onClick={goToLastPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ListTickets;
