export interface IAuthContextProps {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
  login: (
    userData: { email: string; password: string },
    remember: boolean
  ) => void;
  logout: () => void;
}

export interface IUserData {
  email: string;
  password: string;
}

export interface IPasswordData {
  password: string;
  confirmPassword: string;
  length: boolean;
  lowercase: boolean;
  uppercase: boolean;
  number: boolean;
  specialCharacter: boolean;
}

export interface IEmailRecovery {
  email: string;
}
