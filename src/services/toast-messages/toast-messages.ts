import toast from "react-hot-toast";
import styles from "./page.module.css";

export const errorToast = (message: any) => {
  toast.error(message, {
    className: `${styles.container}`,
    style: {
      display: "flex",
      alignItems: "center",
      backgroundColor: "#C50F1F",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#C50F1F",
    },
  });
};

export const successToast = (message: any) => {
  toast.success(message, {
    className: `${styles.container}`,
    style: {
      backgroundColor: "#019544",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#019544",
    },
  });
};

