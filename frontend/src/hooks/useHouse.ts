import create from "zustand";
import { LoginUser } from "./useLogin";

export interface House {
    id: number;
    title: string;
    owner: LoginUser;
    type: string;
    nbRoom: number;
    area: number;
    state: string;
    price: number;
    date: Date;
    city: string;
    nbParking: number;
    desc: string;
    photos: Array<string>;
    tags: Array<string>;
}

type HouseStore = {
    house: House;
    houseError: boolean;
    setNewHouse: (house: House) => void;
    setHouseError: (houseError: boolean) => void;
};

export const useHouse = create<HouseStore>(set => ({
    house: {
        id: 0,
        title: "",
        owner: {
            id: 0,
            prenom: "",
            nom: "",
            avatar: "",
        },
        type: "",
        nbRoom: 0,
        area: 0,
        state: "",
        price: 0,
        date: new Date(Date.now()),
        city: "",
        nbParking: 0,
        desc: "",
        photos: [],
        tags: [],
    },
    houseError: true,

    setNewHouse: (house: House) => {
        set({
            house: {
                id: house.id,
                title: house.title,
                owner: house.owner,
                type: house.type,
                nbRoom: house.nbRoom,
                area: house.area,
                state: house.state,
                price: house.price,
                date: house.date,
                city: house.city,
                nbParking: house.nbParking,
                desc: house.desc,
                photos: house.photos,
                tags: house.tags,
            },
        });
    },

    setHouseError: (houseError: boolean) => {
        set({ houseError });
    },
}));
