// useAuthStore.js
import { create } from "zustand";

const useAuthStore = create((set) => ({
  token: null,
  setToken: (token) => {
    set({ token });
    localStorage.setItem("token", token); // Persist token in local storage
  },
  clearToken: () => {
    set({ token: null });
    localStorage.removeItem("token"); // Remove token from local storage
  },
}));

export default useAuthStore;
