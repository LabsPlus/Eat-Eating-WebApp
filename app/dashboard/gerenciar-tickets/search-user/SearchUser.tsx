import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

import styles from "./page.module.css";

const SearchUser = () => {
  return (
    <div className={styles.container}>
      <Input
        className={styles.inputSearch}
        placeholder="Pesquisar..." 
        prefix={<SearchOutlined className={styles.searchOutlined} />}
      />
      <button className={styles.buttonSearch}>Pesquisar</button>
    </div>
  )
}

export default SearchUser;