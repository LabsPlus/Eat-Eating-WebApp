export interface IDataUser extends IUserSelect {
  user: IUserSelect;
  enrrolment: string;
  picture: string;
}

export interface IUser {
  id: number;
  name: string;
  enrollment: string;
  category: string;
  typeGrant: string;
  dailyMeals: number;
  email: string;
  password: string;
  emailRecovery: string;
  picture: string;
}

export interface IUserSelect {
  id: number;
  dailyMeals: number;
  person: {
    name: string;
    cpf: string;
    born: string;
    Administrator: any;
  };
  category: {
    name: string;
  };
  typeGrant: {
    name: string;
  };
  loginUser: {
    email: string;
    emailRecovery: string;
    password: string;
  };
  userTicket?: IUserTickets;
  userTicketsCount?: IUserTicketsData;
}

export interface IUserUpdate {
  name: string | undefined;
  enrollment: string | undefined;
  category: string | undefined;
  typeGrant: string | undefined;
  dailyMeals: number | undefined;
  password: string | undefined;
  emailRecovery: string | undefined;
  picture: string | undefined;
}

export interface IUserTickets {
  name?: string;
  picture?: string;
  userTicketsCount?: IUserTicketsData;
  userTicketsData?: IUserTicketsData;
}

export interface ITicket {
  purchaseDate: string;
}

export interface IUserTicketsData {
  totalTicketsOfUserActive: number;
  ticket: ITicket[];
}

export interface IModalDeleteUserProps {
  deleteUserId: number | null;
  setDeleteUserId: (userId: number | null) => void;
  setDeleteModalVisible: (boolean: boolean) => void;
}
