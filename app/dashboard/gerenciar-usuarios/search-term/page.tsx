"use client";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useStore } from "../../../../store";
import styles from "./page.module.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchUsersByName,users } = useStore();
console.log(users, 'users');


  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    await searchUsersByName(value);
  };

  return (
    <div>
      <Input
        className={styles.search}
        size="large"
        placeholder="Pesquisar por"
        prefix={<SearchOutlined className={styles.searchOutlined}/>}
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
