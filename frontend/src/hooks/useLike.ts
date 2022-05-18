import axios from "axios";
import create from "zustand";
import { House } from "./useHouse";

type LikeStore = {
    likes: House[];
    getLikes: () => Promise<void>;
    sendLike: (houseId: number) => Promise<void>;
    removeLike: (houseId: number) => Promise<void>;
}

export const useLike = create<LikeStore>((set, get) => ({
    likes: [],
    sendLike: async (houseId: number) => {
        const rep = await axios.post("http://localhost:3001/api/customer/like", { houseId }, { withCredentials: true });
        if (rep.status === 201) {
            const currentLikes = get().likes;
            currentLikes.push(rep.data[0]);
            set({ likes: currentLikes });
        }
    },
    getLikes: async () => {
        const rep = await axios.get("http://localhost:3001/api/customer/likes", { withCredentials: true });
        if (rep.status === 200) set({ likes: rep.data });
    },
    removeLike: async (houseId: number) => {
        const rep = await axios.delete(`http://localhost:3001/api/customer/like/${houseId}`, { withCredentials: true });
        if (rep.status === 200) {
            const currentLikes = get().likes;
            const result: Array<House> = [];
            currentLikes.forEach(house => {
                if (house.id !== houseId) result.push(house);
            });
            set({ likes: result });
        }
    },
}));
