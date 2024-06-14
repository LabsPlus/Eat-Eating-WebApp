import React from "react";
import { Input} from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import Image from "next/image";

import styles from "./page.module.css";

interface PasswordInputProps {
  value: string;
  urlIcon?: string;
  altImage?: string;
  placeholder?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const PasswordInput = ({ value, urlIcon = '', altImage = '', placeholder, handleChange }: PasswordInputProps) => {
  const hasIcon = urlIcon.length > 0;
  
  return (
    <Input.Password
        style={{ borderColor: "#0444BD", padding: "13px", borderRadius: "12px", fontSize: "1rem", fontWeight: "700" }}
        className={styles.input}
        placeholder={placeholder}
        name="password"
        prefix={
          hasIcon && (
            <Image
              className={styles.iconPadlock}
              src={urlIcon}
              alt={altImage}
              width={13}
              height={14}
            />
          )
        }
        value={value}
        onChange={handleChange}
        iconRender={(visible) =>
          visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
        }
    />
  )
}

export default PasswordInput;