import create from "zustand";

export interface House {
    id: number;
    address: string;
    ownerName: string;
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
}

interface HouseStore {
    house: House;
    setNewHouse: (house: House) => void;
}

export const useHouse = create<HouseStore>(set => ({
    house: {
        id: 0,
        address: "",
        ownerName: "",
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
    },

    setNewHouse: (house: House) => {
        set({
            house: {
                id: house.id,
                address: house.address,
                ownerName: house.ownerName,
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
            },
        });
    },
}));
