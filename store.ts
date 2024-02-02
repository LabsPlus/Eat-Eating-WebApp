import axios from "axios";
import { create } from "zustand";

interface User {
  id: number;
  name: string;
}

export type storeState = {
  users: User[];
};

const initialState: storeState = {
  users: [],
};

export const useStore = create((set: any) => ({
  ...initialState,
  createUser: async (userData: any) => {
    console.log(userData)
    try {
      await axios.post("https://eating-eat-api-dev.onrender.com/user/createUser", userData);
    } catch (error) {
      throw console.log(error);
    }
  },
  getAllUsers: async () => {
    try {
      const response = await axios.get(
        `https://eating-eat-api-dev.onrender.com/user/listAllUsers`
      );
      if (response.data) {
        set({ users: response.data });
      }
    } catch (error) {
      console.log(error);
    }
  },
  deleteUser: async (userId: number) => {
    try {
      await axios.delete(`https://eating-eat-api-dev.onrender.com/user/deleteUser/${userId}`);

      set((state: storeState) => ({
        users: state.users.filter((user: any) => user.id !== userId),
      }));
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  },
  updateUser: async (userId: number, updatedUserData: any) => {
    try {
      await axios.put(
        `https://eating-eat-api-dev.onrender.com/user/updateUser/${userId}`,
        updatedUserData
      );
    } catch (error) {
      throw error;
    }
  },
}));
