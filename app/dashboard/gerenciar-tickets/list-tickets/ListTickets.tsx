"use client";
import React from "react";
import styles from "./page.module.css";
import { Select, Table } from "antd";
import {
  LeftOutlined,
  RightOutlined,
  VerticalLeftOutlined,
} from "@ant-design/icons";

const ListTickets = () => {
  const dataSource = [
    {
      key: "1",
      name: "Mafê",
      enrrolment: "0000001",
      date: "10/04/2024",
      qtdTickets: 5,
    },
    {
      key: "2",
      name: "Sarah",
      enrrolment: "0000002",
      date: "10/04/2024",
      qtdTickets: 6,
    },
    {
      key: "3",
      name: "Angêlica",
      enrrolment: "0000003",
      date: "10/04/2024",
      qtdTickets: 4,
    },
  ];

  const columns = [
    {
      title: "#",
      dataIndex: "key",
      key: "key",
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Matrícula",
      dataIndex: "enrrolment",
      key: "enrrolment",
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
          <img src="/images/add.svg" alt="add icon" />
        </div>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Table
        className={styles.table}
        dataSource={dataSource}
        columns={columns}
        pagination={{ className: styles.defaultPagination }}
      />

      <div className={styles.paginationContainer}>
        <div className={styles.selectContainer}>
          <span>Itens por páginas</span>
          <Select className={styles.pageSizeSelect}>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </Select>
        </div>

        <div className={styles.paginationInfo}>
          {/* {`${(currentPage - 1) * pageSize + 1}-${
                currentPage * pageSize
              } de ${users.length}`} */}
        </div>

        <div className={styles.paginationButtons}>
          <VerticalLeftOutlined
            className={styles.first}
            style={{ transform: "rotate(900deg)" }}
          />
          <LeftOutlined className={styles.prev} />
          <RightOutlined className={styles.next} />
          <VerticalLeftOutlined className={styles.last} />
        </div>
      </div>
    </div>
  );
};

export default ListTickets;
