import axios from "axios";
import { create } from "zustand";
import { IDataUser } from "./app/Interfaces/user.interfaces";
import { IStoreState } from "./app/Interfaces/storeState.interfaces";

const initialState: IStoreState = {
  users: [],
  infoTickets: {
    id: null,
    ticketsAvailable: null,
    ticketsConsumed: null,
    ticketsOpened: null,
    ticketsSold: null,
  },
  searchTerm: "",
  selectedUser: null,
  noUsersFound: false,
};

export const useStore = create((set: any) => ({
  ...initialState,

  setSelectedUser: (user: IDataUser | null) => {
    set((state: IStoreState) => ({
      selectedUser: state.users.find((usuario: any) => usuario.user.id == user),
    }));
  },

  createUser: async (userData: any) => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/create-user`,
        userData
      );
    } catch (error: any) {
      if (
        error.response.data.message ==
        "Enrollment already exists, only one enrollment is allowed."
      ) {
        throw new Error(
          "Ops! Parece que essa matrícula já pertence a outra conta. Tente uma matrícula diferente. "
        );
      } else if (
        error.response.data.message ==
        "Email or Email Recovery already exists, only one email is allowed."
      ) {
        throw new Error(
          "Ops! Parece que o e-mail ou e-mail de recuperação já pertence a outra conta. Verifique e tente novamente."
        );
      }
    }
  },

  getAllUsers: async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/list-all-users`
      );
      const sortedUsers = response.data.sort((a: any, b: any) =>
        a.user.person.name.localeCompare(b.user.person.name)
      );
      set({ users: sortedUsers, noUsersFound: false });
    } catch (error) {
      console.log(error);
    }
  },

  searchUsersByNameAndEnrrolment: async (searchTerm: string) => {
    try {
      const { users } = useStore.getState();

      const filteredUsers = users.filter((user: any) =>
        user.user.person.name.toLowerCase().includes(searchTerm.toLowerCase()) || user.enrrolment
      .includes(searchTerm)
      );

      if (filteredUsers.length > 0) {
        set({ users: filteredUsers, noUsersFound: false });
      } else {
        set({ users: [], noUsersFound: true });
      }
    } catch (error) {
      console.log("Erro ao buscar usuários:", error);
    }
  },

  deleteUser: async (id: number) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/user/delete-user/${id}`
      );

      set((state: IStoreState) => ({
        users: state.users.filter((user: any) => user.user.id !== id),
      }));
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },

  updateUser: async (userId: number, updatedUserData: any) => {
    try {
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/user/update-user/${userId}`,
        updatedUserData
      );
    } catch (error: any) {
      console.log("Error updating user:", error.response.data);

      if (
        error.response.data.message ==
        "Email Recovery already exists, only one email is allowed."
      ) {
        throw new Error(
          "Ops! Parece que o e-mail de recuperação já pertence a outra conta. Verifique e tente novamente."
        );
      } else if (
        error.response.data.message ==
          "enrrolment cannot be update without category" ||
        error.response.data.message ==
          "category cannot be update without enrrolment"
      ) {
        throw new Error(
          "Ops! Parece que essa matrícula já pertence a outra conta. Tente uma matrícula diferente."
        );
      }
    }
  },

  purchaseTicket: async (userId: number, quantity: any) => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/tickets/purchase`,
        {
          userId,
          quantity,
        }
      );

      console.log(response);
    } catch (error) {
      console.error("Erro ao adicionar ticket:", error);
      throw error;
    }
  },

  getInfoTickets: async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/tickets/info`
      );

      set({ infoTickets: {
        id: response.data.id,
        ticketsAvailable: response.data.ticketsAvailable,
        ticketsConsumed: response.data.ticketsConsumed,
        ticketsOpened: response.data.ticketsOpened,
        ticketsSold: response.data.ticketsSold,
      }, })

    } catch (error) { 
      console.error("Erro ao buscar informações sobre tickets", error);
      throw error;
    }
  }
}));
