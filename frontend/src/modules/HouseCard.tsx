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
    image: string;
    desc: string;
}

type HouseProps = {
    house: House
}

export default function HouseCard({ house }: HouseProps) {
    return (
        <>
            <div className="flex flex-col items-center justify-center px-10 overflow-hidden bg-white rounded-lg shadow h-28">
                <div>
                    {house.address}
                </div>
                <div>
                    City: {house.city}<br />
                    Type: {house.type}<br />
                    Price: {house.price}<br />
                    Description: {house.desc}
                </div>
            </div>
        </>
    );
}
