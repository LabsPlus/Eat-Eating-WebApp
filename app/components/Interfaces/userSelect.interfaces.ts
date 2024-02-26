export interface UserSelect {
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
  }