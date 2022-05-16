import axios from "axios";
import create from "zustand";
import { House } from "./useHouse";

interface LoginUser {
    id: number;
    nom: string;
    prenom: string;
    avatar: string | undefined;
}

interface LoginStore {
    user: LoginUser;
    liked: Array<House>;
    isAdmin: boolean;
    isLogged: boolean;
    getUserStatus: () => Promise<void>;
    setLoggedUser: (username: string, password: string) => Promise<boolean>;
    resetLoggerUser: () => Promise<void>;
    sendAvatar: (formData: FormData) => Promise<void>;
    sendLike: (userId: number, houseId: number) => Promise<void>;
}

export const useLogin = create<LoginStore>(set => ({
    user: {
        id: 0,
        nom: "",
        prenom: "",
        avatar: undefined,
    },
    isAdmin: false,
    isLogged: false,
    liked: [],
    getUserStatus: async () => {
        const rep = await axios.get("http://localhost:3001/api/auth", { withCredentials: true });
        if (rep.status === 200) {
            set({
                user: {
                    id: rep.data.id,
                    nom: rep.data.nom,
                    prenom: rep.data.prenom,
                    avatar: rep.data.avatar,
                },
                isAdmin: rep.data.isAdmin,
                isLogged: true,
            });
        }
    },
    setLoggedUser: async (username: string, password: string) => {
        const rep = await axios.post("http://localhost:3001/api/auth/login", { username, password }, { withCredentials: true });
        if (rep.status === 201) {
            set({
                user: {
                    id: rep.data.id,
                    nom: rep.data.nom,
                    prenom: rep.data.prenom,
                    avatar: rep.data.avatar,
                },
                isAdmin: rep.data.isAdmin,
                isLogged: true,
            });
            return true;
        } else {
            return false;
        }
    },
    resetLoggerUser: async () => {
        const rep = await axios.delete("http://localhost:3001/api/auth/logout", { withCredentials: true });
        if (rep.status === 200) set({ isLogged: false });
    },
    sendAvatar: async formData => {
        const rep = await axios.post("http://localhost:3001/api/customer/avatar/upload", formData, { withCredentials: true });
        if (rep.status === 201) {
            set({
                user: {
                    id: rep.data.id,
                    nom: rep.data.nom,
                    prenom: rep.data.prenom,
                    avatar: rep.data.avatar,
                },
            });
        }
    },
    sendLike: async (userId: number, houseId: number) => {
        const rep = await axios.post("http://localhost:3001/api/customer/like", { customerId: userId, houseId }, { withCredentials: true });
        if (rep.status === 201) console.log("created");
    },
}));
