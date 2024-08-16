import { IUser, IDataUser } from "../interfaces/user.interfaces";
import { TicketData } from "./tickets.interfaces";

export interface IStoreState {
  users: IUser[];
  infoTickets: TicketData;
  searchTerm: string;
  selectedUser: IDataUser | null;
  noUsersFound: boolean;
}

