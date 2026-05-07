import { create } from "zustand";

interface LayoutState {
  pageTitle: string;

  setPageTitle: (title: string) => void;
}

export const useLayoutStore = create<LayoutState>((set) => ({
  pageTitle: "",

  setPageTitle: (title) =>
    set({
      pageTitle: title,
    }),
}));
