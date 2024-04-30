import { IUser, IDataUser } from "../Interfaces/user.interfaces";

export interface IStoreState {
  users: IUser[];
  searchTerm: string;
  selectedUser: IDataUser | null;
  noUsersFound: boolean;
}

