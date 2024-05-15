"use client";

import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import { useStore } from "../../../../store";

import styles from "./page.module.css";
import { errorToast } from "@/app/services/toast-messages/toast-messages";

const SearchUser = () => {
  const [dataSearch, setDataSearch] = useState("");

  const { searchUsersByNameAndEnrrolment, noUsersFound, getAllUsers } =
    useStore();

  if (
    noUsersFound &&
    window.location.pathname === "/dashboard/gerenciar-tickets"
  ) {
    var message =
      "Nenhum usuário encontrado. Verifique o nome ou a matrícula e tente novamente.";
  }
  useEffect(() => {
    if (message) {
      errorToast(message);
      setDataSearch("");
      getAllUsers();
    }
  }, [noUsersFound, getAllUsers]);

  const handleSearch = async () => {
    await searchUsersByNameAndEnrrolment(dataSearch);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className={styles.container}>
      <Input
        className={styles.inputSearch}
        placeholder="Pesquisar..."
        prefix={<SearchOutlined className={styles.searchOutlined} />}
        value={dataSearch}
        onChange={(e) => setDataSearch(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.buttonSearch} onClick={handleSearch}>
        Pesquisar
      </button>
    </div>
  );
};

export default SearchUser;
