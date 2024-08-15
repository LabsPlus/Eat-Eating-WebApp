import { IUser, IDataUser } from "../Interfaces/user.interfaces";
import { TicketData } from "./tickets.interfaces";

export interface IStoreState {
  users: IUser[];
  infoTickets: TicketData;
  searchTerm: string;
  selectedUser: IDataUser | null;
  noUsersFound: boolean;
}

