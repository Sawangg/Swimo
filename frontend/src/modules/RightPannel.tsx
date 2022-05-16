import { House } from "hooks/useHouse";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
export type RightPannelProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    house: House;
}

export const RightPannel: React.FC<RightPannelProps> = ({ house }) => (
    <div className="absolute top-0 right-0 w-1/5 h-screen shadow-lg bg-white z-50 p-2">
        <img className="h-3/5 w-full" src={house.photos[0]} />
        <h1>{house.address}</h1>
    </div>
);
