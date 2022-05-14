import axios from "axios";
import create from "zustand";

interface LoginUser {
    id: number;
    nom: string;
    prenom: string;
}

interface LoginStore {
    user: LoginUser;
    isAdmin: boolean;
    isLogged: boolean;
    getUserStatus: () => Promise<void>;
    setLoggedUser: (username: string, password: string) => Promise<boolean>;
    resetLoggerUser: () => Promise<void>;
}

export const useLogin = create<LoginStore>(set => ({
    user: {
        id: 0,
        nom: "",
        prenom: "",
    },
    isAdmin: false,
    isLogged: false,
    getUserStatus: async () => {
        const rep = await axios.get("http://localhost:3001/api/auth", { withCredentials: true });
        if (rep.status === 200) {
            set({
                user: {
                    id: rep.data.id,
                    nom: rep.data.nom,
                    prenom: rep.data.prenom,
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
}));
