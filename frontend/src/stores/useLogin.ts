import create from "zustand";

interface LoginUser {
    id: number;
    nom: string;
    prenom: string;
    isAdmin: boolean;
}

interface LoginState {
    user: LoginUser;
    isLogged: boolean;
    setLoggedUser: (id: number, nom: string, prenom: string, isAdmin: boolean) => void
}

export const useLoginStore = create<LoginState>(set => ({
    user: {
        id: 0,
        nom: "",
        prenom: "",
        isAdmin: false,
    },
    isLogged: false,
    setLoggedUser: (id: number, nom: string, prenom: string, isAdmin: boolean) => {
        set({
            user: {
                id,
                nom,
                prenom,
                isAdmin,
            },
            isLogged: true,
        });
    },
}));
