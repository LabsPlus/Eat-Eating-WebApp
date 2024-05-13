"use client";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useStore } from "../../../../store";
import styles from "./page.module.css";

const SearchUser = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchUsersByNameAndEnrrolment } = useStore();

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    await searchUsersByNameAndEnrrolment(value);
  };

  return (
    <div>
      <Input
        className={styles.search}
        size="large"
        placeholder="Pesquisar por"
        prefix={<SearchOutlined className={styles.searchOutlined} />}
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchUser;
