import { useAuthStore } from "@/store/authStore";

export const getToken = () => useAuthStore.getState().token;
export const isAuthenticated = () => !!getToken();
export const getUser = () => useAuthStore.getState().user;