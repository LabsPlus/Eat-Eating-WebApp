"use client";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useStore } from "../../../../store";
import styles from "./page.module.css";

const SearchUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchUsersByNameAndEnrrolment, getAllUsers } = useStore();

  const handleSearch = async (value: string) => {
    setSearchTerm(value);

    const searchFunction =
      value.trim() !== "" ? searchUsersByNameAndEnrrolment : getAllUsers;
    await searchFunction(value);
  };

  return (
    <div>
      <Input
        className={styles.search}
        size="large"
        placeholder="Pesquisar..."
        prefix={<SearchOutlined className={styles.searchOutlined} />}
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchUser;
