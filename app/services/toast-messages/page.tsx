"use-client";

import toast from "react-hot-toast";

export const errorToast = (message: any) => {
  toast.error(message, {
    style: {
      padding: "5px",
      color: "#FFFFFF",
      border: "none",
      borderRadius: "5px",
      backgroundColor: "#C50F1F",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#C50F1F",
    },
  });
};

export const sucessToast = (message: any) => {
  toast.error(message, {
    style: {
      padding: "5px",
      color: "#FFFFFF",
      borderRadius: "5px",
      backgroundColor: "#019544",
    },
  });
};

