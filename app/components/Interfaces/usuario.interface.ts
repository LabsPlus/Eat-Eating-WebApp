export interface IUserUpdate {
  name: string | undefined;
  enrollment: string | undefined;
  category: string | undefined;
  typeGrant: string | undefined;
  dailyMeals: number | undefined;
  password: string | undefined;
  emailRecovery: string | undefined;
}


export interface IUserSelect {
  id: number;
  dailyMeals: number;
  person: {
    name: string;
    cpf: string;
    born: string;
    Administrator: any; // Pode ser nulo, então use "any" ou defina um tipo mais específico
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
}

export interface IDataUser {
  user: IUserSelect;
  enrrolment: string;
}

export interface IUsuario extends Array<IDataUser> {}
