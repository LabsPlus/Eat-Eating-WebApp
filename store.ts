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
    console.log(userData);
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/user/create-user`,
        userData
      );
    } catch (error) {
      throw console.log(error);
    }
  },

  getAllUsers: async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/user/list-all-users`
      );
      console.log(response);
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
    } catch (error) {
      throw error;
    }
  },
}));
