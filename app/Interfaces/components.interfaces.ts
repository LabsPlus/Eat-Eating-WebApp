import { ReactNode } from "react";

export interface HeaderHomeProps {
  hasButtons?: boolean;
}

export interface ExternalPagesProps {
  children: ReactNode;
  titleMessage: string;
  message: string;
  className?: string;
}

export interface PasswordInputProps {
  value: string;
  urlIcon?: string;
  altImage?: string;
  placeholder?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TextInputProps {
  value: string;
  urlIcon?: string;
  altImage?: string;
  placeholder?: string;
  inputClassName?: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PasswordValidationChecklistProps {
  validations: {
    length: boolean;
    lowercase: boolean;
    uppercase: boolean;
    number: boolean;
    specialCharacter: boolean;
  };
}