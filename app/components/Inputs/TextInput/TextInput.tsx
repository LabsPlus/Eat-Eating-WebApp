import React from "react";
import { Input } from "antd";

import Image from "next/image";

import styles from "./page.module.css";

interface TextInputProps {
  value: string;
  urlIcon?: string;
  altImage?: string;
  placeholder?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput = ({ value, urlIcon = '', altImage = '', placeholder, handleChange }: TextInputProps) => {
  const hasIcon = urlIcon.length > 0;
  
  return (
    <Input
      style={{ borderColor: "#0444BD", padding: "13px", borderRadius: "12px", fontSize: "1rem", fontWeight: "700", fontFamily: "Inter" }}
      placeholder={placeholder}
      name="email"
      value={value}
      onChange={handleChange}
      prefix={
        hasIcon && (
          <Image
            className={styles.iconUser}
            src={urlIcon}
            alt={altImage}
            width={24}
            height={24}
          />
        )
      }
    />
  )
}

export default TextInput;