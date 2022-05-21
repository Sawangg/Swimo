import axios from "axios";
import create from "zustand";
import { House } from "./useHouse";

type OwnsStore = {
    owns: House[];
    getOwns: () => Promise<void>;
}

export const useOwns = create<OwnsStore>(set => ({
    owns: [],
    getOwns: async () => {
        const rep = await axios.get("http://localhost:3001/api/customer/owns", { withCredentials: true });
        if (rep.status === 200) set({ owns: rep.data });
    },
}));
