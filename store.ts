import axios from "axios";
import { create } from "zustand";
import { User } from "./app/components/Interfaces/user.interfaces";
import { DataUser } from "./app/components/Interfaces/dataUser.interfaces";

export type storeState = {
  users: User[];
  searchTerm: string;
  selectedUser: DataUser | null;
  noUsersFound: boolean;
};

const initialState: storeState = {
  users: [],
  searchTerm: "",
  selectedUser: null,
  noUsersFound: false,
};

export const useStore = create((set: any) => ({
  ...initialState,

  setSelectedUser: (user: DataUser | null) => {
    set((state: storeState) => ({
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
          "Matrícula já está em uso, informe outra."
        );
      } else if (
        error.response.data.message ==
        "email already exists, only one email is allowed."
      ) {
        throw new Error("E-mail já está em uso, informe outro.");
      }
    }
  },

  getAllUsers: async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/list-all-users`
      );
      const sortedUsers = response.data.sort((a: any, b: any) => a.id - b.id);
      set({ users: sortedUsers });
    } catch (error) {
      console.log(error);
    }
  },

  searchUsersByName: async (searchTerm: string) => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/list-all-users`
      );

      const filteredUsers = response.data.filter((user: any) =>
        user.user.person.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      if (filteredUsers.length > 0) {
        set({ users: filteredUsers, noUsersFound: false });
      } else {
        set({ users: [], noUsersFound: true });
        console.log("Nenhum usuário encontrado");
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

      set((state: storeState) => ({
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
      console.log("Error updating user:", error.response.data.message);

      if (error.response.data.statusCode === 422) {
        throw new Error(
          "É necessário mudar a matrícula ao alterar a categoria do usuário ou vice-versa."
        );
      }
    }
  },
}));
