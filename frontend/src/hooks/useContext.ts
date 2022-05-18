import create from "zustand";

type ContextStore = {
    isRightMenuOpen: boolean;
}

export const useContext = create<ContextStore>(() => ({
    isRightMenuOpen: false,
}));
