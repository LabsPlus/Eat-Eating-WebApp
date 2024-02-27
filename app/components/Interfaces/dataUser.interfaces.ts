import { UserSelect } from "./userSelect.interfaces";

export interface DataUser extends UserSelect {
    user: UserSelect;
    enrrolment: string;
  }