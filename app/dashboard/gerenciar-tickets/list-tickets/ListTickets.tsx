"use client";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { Button, Select, Table } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  VerticalLeftOutlined,
} from "@ant-design/icons";
import PurchaseTickets from "../purchase-tickets/PurchaseTickets";
import { useStore } from "../../../../store";

const ListTickets = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [purchaseTicketVisible, setPurchaseTicketVisible] = useState(false);

  const { users, getAllUsers, selectedUser, setSelectedUser, purchaseTickets } =
    useStore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await getAllUsers();
      } catch (error) {
        console.log("Erro: " + error);
      }
    };

    fetchUsers();
  }, [getAllUsers]);

  useEffect(() => {
    if (selectedUser) {
      setPurchaseTicketVisible(true);
    }
  }, [selectedUser]);

  const handlePurchaseTicket = (user: any) => {
    setSelectedUser(user);
    console.log("Usuário: " + user);
    console.log("Usuário: " + selectedUser);

    // setPurchaseTicketVisible(true);
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
      render: (text: any, record: any) => {
        if (record.user.category.name === "VISITANTE") {
          return "XXXXXXX";
        } else {
          return text;
        }
      },
    },
    {
      title: "Data da última compra",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Quantidade de tickets",
      dataIndex: "qtdTickets",
      key: "qtdTickets",
    },
    {
      title: "Ações",
      dataIndex: "action",
      key: "action",
      render: (text: any, record: any) => (
        <div className={styles.btnsContainer}>
          <img src="/images/edit_square.svg" alt="edit icon" />
          <Button
            icon={<img src="/images/add.svg" alt="add icon" />}
            onClick={() => handlePurchaseTicket(record.user.id)}
          />
          {selectedUser && <PurchaseTickets />}
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Table
        className={styles.table}
        dataSource={users.map((user) => ({
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
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
          </Select>
        </div>

        <div className={styles.paginationInfo}>
          {`${(currentPage - 1) * pageSize + 1}-${currentPage * pageSize} de ${
            users.length
          }`}
        </div>

        <div className={styles.paginationButtons}>
          <VerticalLeftOutlined
            className={`${styles.first} ${
              currentPage === 1 ? styles.disabledButton : ""
            }`}
            style={{ transform: "rotate(900deg)" }}
            onClick={goToFirstPage}
          />
          <LeftOutlined
            className={`${styles.prev} ${
              currentPage === 1 ? styles.disabledButton : ""
            }`}
            onClick={handlePrevPage}
          />
          <RightOutlined
            className={`${styles.next} ${
              currentPage === Math.ceil(users.length / pageSize)
                ? styles.disabledButton
                : ""
            }`}
            onClick={handleNextPage}
          />
          <VerticalLeftOutlined
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
