'use client'
import React, { useEffect, useState } from "react";
import { Button, Input, Popconfirm, Table } from "antd";
import styles from "./page.module.css";
import axios from "axios";
import { useStore } from "../../../store";
import UpdateUserPopover from "../update-user-popover/page";

const PaginationUsers = ({ searchTerm }: { searchTerm: string }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [selectedUser, setSelectedUser] = useState(null);
  const [updatePopoverVisible, setUpdatePopoverVisible] = useState(false);

  const UpdateIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="31"
      height="42"
      viewBox="0 0 31 42"
      fill="none"
    >
      <path
        d="M9.74959 11C7.67875 11 6 12.6787 6 14.7496V24.7485C6 26.8193 7.67875 28.4981 9.74959 28.4981H13.7747L14.0387 27.4424C14.055 27.3771 14.0729 27.3124 14.0924 27.2482H9.74959C8.36903 27.2482 7.24986 26.129 7.24986 24.7485V15.9994H22.2482V18.7887C22.6474 18.6176 23.0713 18.5224 23.4981 18.5029V14.7496C23.4981 12.6787 21.8193 11 19.7485 11H9.74959ZM7.24986 14.7496C7.24986 13.369 8.36903 12.2499 9.74959 12.2499H19.7485C21.129 12.2499 22.2482 13.369 22.2482 14.7496L7.24986 14.7496ZM15.9736 26.4698L22.0097 20.4337C22.9225 19.5208 24.4025 19.5208 25.3154 20.4337C26.2282 21.3465 26.2282 22.8265 25.3154 23.7393L19.2793 29.7754C18.9273 30.1274 18.4864 30.377 18.0035 30.4977L16.1313 30.9658C15.3172 31.1693 14.5797 30.4319 14.7832 29.6177L15.2513 27.7455C15.372 27.2627 15.6217 26.8217 15.9736 26.4698Z"
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
        d="M10 5H14C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5ZM8.5 5C8.5 3.067 10.067 1.5 12 1.5C13.933 1.5 15.5 3.067 15.5 5H21.25C21.6642 5 22 5.33579 22 5.75C22 6.16421 21.6642 6.5 21.25 6.5H19.9309L18.7589 18.6112C18.5729 20.5334 16.9575 22 15.0263 22H8.97369C7.04254 22 5.42715 20.5334 5.24113 18.6112L4.06908 6.5H2.75C2.33579 6.5 2 6.16421 2 5.75C2 5.33579 2.33579 5 2.75 5H8.5ZM10.5 9.75C10.5 9.33579 10.1642 9 9.75 9C9.33579 9 9 9.33579 9 9.75V17.25C9 17.6642 9.33579 18 9.75 18C10.1642 18 10.5 17.6642 10.5 17.25V9.75ZM14.25 9C14.6642 9 15 9.33579 15 9.75V17.25C15 17.6642 14.6642 18 14.25 18C13.8358 18 13.5 17.6642 13.5 17.25V9.75C13.5 9.33579 13.8358 9 14.25 9ZM6.73416 18.4667C6.84577 19.62 7.815 20.5 8.97369 20.5H15.0263C16.185 20.5 17.1542 19.62 17.2658 18.4667L18.4239 6.5H5.57608L6.73416 18.4667Z"
        fill="#0443BD"
      />
    </svg>
  );

  const { users, getAllUsers, deleteUser } = useStore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://eating-eat-api-dev.onrender.com/user/listAllUsers"
        );
        getAllUsers();
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [getAllUsers]);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => a.id - b.id);

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handleEditUser = (user: any) => {
    setSelectedUser(user);
    setUpdatePopoverVisible(true);
    console.log("Editando usuário:", user);
  };

  const handleDeleteUser = async (userId: number) => {
    try {
      await deleteUser(userId);
      console.log("Usuário excluído com sucesso!");
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  const columns = [
    {
      title: "#",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Matrícula ",
      dataIndex: "enrollment",
      key: "enrollment",
    },
    {
      title: "Categoria de usuário",
      dataIndex: ["Category", "name"],
      key: "category",
    },
    {
      title: "Tipo de bolsa",
      dataIndex: ["TypeStudentGrant", "name"],
      key: "typeStudentGrantId",
    },
    {
      title: "Refeições Realizadas",
      dataIndex: "dailyMeals",
      key: "dailyMeals",
    },
    {
      title: "Ação",
      dataIndex: "action",
      key: "action",
      render: (text: any, record: any) => (
        <div className={styles.btnsContainer}>
          <Button
            type="link"
            icon={<UpdateIcon />}
            onClick={() => handleEditUser(record)}
          />
          <Popconfirm
            title="Deseja realmente excluir este usuário?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button type="link" danger icon={<DeleteIcon />} />
          </Popconfirm>
        </div>
      ),
    },
  ];
 
  return (
    <div className={styles.container}>
      <Table
        className={styles.table}
        dataSource={sortedUsers}
        columns={columns}
        pagination={{
          current: currentPage,
          pageSize: pageSize,
          total: users.length,
          showSizeChanger: false,
          onChange: handlePageChange,
        }}
      />
      {selectedUser && (
        <UpdateUserPopover
          userData={selectedUser}
          visible={updatePopoverVisible}
          onClose={() => setUpdatePopoverVisible(false)}
        />
      )}
    </div>
  );
};

export default PaginationUsers;
