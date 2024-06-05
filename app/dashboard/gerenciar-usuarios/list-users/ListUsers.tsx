"use client";

import React, { useEffect, useState } from "react";
import { Button, Modal, Select, Table, message } from "antd";
import styles from "./page.module.css";
import { useStore } from "../../../../store";
import UpdateUserPopover from "../update-user-popover/UpdateUser";
import ModalDeleteUser from "../modal-delete-user/ModalDeleteUser";

import {
  LeftOutlined,
  RightOutlined,
  VerticalLeftOutlined,
} from "@ant-design/icons";

const ListUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const capitalizeFirstLetter = (string: any) => {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  };

  const [updatePopoverVisible, setUpdatePopoverVisible] = useState(false);
  const [deleteUserId, setDeleteUserId] = useState(null);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const UpdateIcon = () => (
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

  const DeleteIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM8 9H16V19H8V9ZM15.5 4L14.5 3H9.5L8.5 4H5V6H19V4H15.5Z"
        fill="#0443BD"
      />
    </svg>
  );

  let serialNumber = 0;

  const {
    users,
    getAllUsers,
    searchTerm,
    deleteUser,
    selectedUser,
    setSelectedUser,
    noUsersFound,
  } = useStore();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

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

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setUpdatePopoverVisible(true);
    console.log("editando e pega id", user);
  };

  const rowClassName = (record: any, index: number) => {
    return index % 2 === 0 ? styles.evenRow : styles.oddRow;
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    const lastPage = Math.ceil(users.length / pageSize);
    setCurrentPage(lastPage);
  };

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
      title: "Matrícula ",
      dataIndex: "enrrolment",
      key: "enrollment",
      className:styles.tableColumn,
      render: (text: any, record: any) => {
        if (record.user.category.name === "VISITANTE") {
          return "XXXXXXX";
        } else {
          return text;
        }
      },
    },
    {
      title: "Categoria de usuário",
      dataIndex: ["user", "category", "name"],
      key: "category",
      render: (text: any) => capitalizeFirstLetter(text),
      className:styles.tableColumn,
    },
    {
      title: "Tipo de bolsa",
      dataIndex: ["user", "typeGrant", "name"],
      key: "typeGrant",
      render: (text: any) => capitalizeFirstLetter(text),
      className:styles.tableColumn
    },
    {
      title: "Refeições realizadas",
      dataIndex: ["user", "dailyMeals"],
      key: "dailyMeals",
      className:styles.tableColumn
    },
    {
      title: "Ações",
      dataIndex: "action",
      key: "action",
      render: (text: any, record: any) => (
        <div className={styles.btnsContainer}>
          <Button
            type="link"
            icon={<UpdateIcon />}
            onClick={() => handleEditUser(record.user.id)}
          />
          <Button
            type="link"
            danger
            icon={<DeleteIcon />}
            onClick={() => setDeleteUserId(record.user.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.tableContainer}>
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
            showSizeChanger: false,
            onChange: handlePageChange,
            className: styles.defaultPagination,
          }}
          rowKey="id"
          rowClassName={rowClassName}
        />
        {noUsersFound && (
          <div className={styles.errorMessage}>
            Nenhum usuário encontrado. Verifique o nome ou a matrícula e tente
            novamente.
          </div>
        )}
        <div className={styles.paginationContainer}>
          <div className={styles.selectContainer}>
            <span>Itens por páginas</span>
            <Select
              defaultValue={pageSize}
              onChange={handlePageSizeChange}
              className={styles.pageSizeSelect}
            >
              <option className={styles.optionSizeSelectOption} value={5}>5</option>
              <option className={styles.optionSizeSelectOption} value={10}>10</option>
              <option className={styles.optionSizeSelectOption} value={15}>15</option>
            </Select>
          </div>

          <div className={styles.paginationInfo}>
            {`${(currentPage - 1) * pageSize + 1}-${
              currentPage * pageSize
            } de ${users.length}`}
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
      {selectedUser && <UpdateUserPopover />}

      <ModalDeleteUser
        deleteUserId={deleteUserId}
        setDeleteModalVisible={setDeleteModalVisible}
        setDeleteUserId={
          setDeleteUserId as React.Dispatch<React.SetStateAction<number | null>>
        }
      />
    </div>
  );
};

export default ListUsers;
