"use client";
import React, { useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useStore } from "../../../../store";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { searchUsersByName } = useStore();

  const handleSearch = async (value: string) => {
    setSearchTerm(value);
    await searchUsersByName(value);
  };

  return (
    <div>
      <Input
        size="large"
        placeholder="Pesquisar por"
        prefix={<SearchOutlined />}
        value={searchTerm}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
};

export default Search;
