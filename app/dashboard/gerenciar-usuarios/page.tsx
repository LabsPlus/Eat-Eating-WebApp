"use client";

import React, { useState } from "react";
import { Popover } from "antd";

import AddUser from "@/app/dashboard/gerenciar-usuarios/add-user/AddUser";
import PaginationUsers from "@/app/dashboard/gerenciar-usuarios/list-users/ListUsers";
import PrivateRoute from "@/app/components/PrivateRoute/PrivateRoute";
import Search from "./search-user/SearchUser";
import PopUpProfile from "./pop-up-profile/PopUpProfile";

import styles from "./page.module.css";

const UserManager = () => {
  const [openModalUser, setOpenModalUser] = useState(false);

  const currentDate = new Date();
  const dateFormatter = new Intl.DateTimeFormat("pt-BR");
  const formattedDate = dateFormatter.format(currentDate);

  const handleToggleModalUser = () => {
    setOpenModalUser(!openModalUser);
  };

  return (
    <PrivateRoute>
      <div className={styles.container}>
        <div className={styles.time}>{formattedDate}</div>

        <h1 className={styles.title}>Gerenciamento de Usuários</h1>

        <div className={styles.inputsContainer}>
          <div className={styles.searchAndAdd}>
            <Search data-testid="search-component" />
            <AddUser data-testid="popover-component" />
          </div>

          <div className={styles.btnsContainer}>
            {openModalUser && <div className={styles.overlay} />}
            <div>
              <Popover
                content={<PopUpProfile />}
                trigger="click"
                open={openModalUser}
                onOpenChange={handleToggleModalUser}
                placement="bottomRight"
                arrow={false}
              >
                <div className={styles.personIcon}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                    fill="none"
                  >
                    <path
                      d="M23 8.99998C23 12.866 19.866 16 16 16C12.134 16 9 12.866 9 8.99998C9 5.134 12.134 2 16 2C19.866 2 23 5.134 23 8.99998ZM21 8.99998C21 6.23857 18.7614 4 16 4C13.2386 4 11 6.23857 11 8.99998C11 11.7614 13.2386 14 16 14C18.7614 14 21 11.7614 21 8.99998ZM7.5 18C5.56696 18 3.99994 19.567 4 21.5001L4.00001 22C4.00003 24.3935 5.52264 26.4174 7.68492 27.7934C9.85906 29.177 12.8015 30 15.9999 30C19.1983 30 22.1408 29.177 24.315 27.7934C26.4773 26.4174 28 24.3935 28 22V21.5C28 19.567 26.433 18 24.5 18H7.5ZM6 21.5C5.99998 20.6716 6.67156 20 7.5 20H24.5C25.3284 20 26 20.6715 26 21.5V22C26 23.4725 25.0602 24.9486 23.2413 26.1061C21.4342 27.256 18.8767 28 15.9999 28C13.1232 28 10.5657 27.256 8.75867 26.1061C6.93978 24.9486 6.00001 23.4725 6.00001 22L6 21.5Z"
                      fill="#03338E"
                    />
                  </svg>
                </div>
              </Popover>
              <div className={styles.btnGroup}>
                <button>Copiar</button>
                <button>CSV</button>
                <button>Excel</button>
                <button>PDF</button>
                <button className={styles.btnPrint}>Imprimir</button>
              </div>
            </div>
          </div>
        </div>
        <PaginationUsers data-testid="pagination-component" />
      </div>
    </PrivateRoute>
  );
};

export default UserManager;
