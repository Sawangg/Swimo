import { House } from "hooks/useHouse";
import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import locationSvg from "../assets/location.svg";
import areaSvg from "../assets/area.svg";
import bedSvg from "../assets/bed.svg";
import parkingSvg from "../assets/parking.svg";
import { Button } from "ui/Button";
import { useLike } from "hooks/useLike";

export type RightPannelProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    house: House;
    like?: boolean;
}

export const RightPannel: React.FC<RightPannelProps> = ({ house, like }) => {
    const { removeLike } = useLike();

    return house ? (
        <div className="absolute flex flex-col top-0 right-0 w-1/5 h-screen shadow-lg bg-white z-50">
            <img className="h-3/5 w-full" src={house.photos[0]} />
            <div className="m-4">
                <div className="flex flex-row items-center gap-5 mb-1">
                    <h1 className="text-2xl font-bold">{house.title}</h1>
                    <h2 className="text-xl">{house.price}€</h2>
                </div>
                <div className="ml-4">
                    <div className="flex flex-row items-center">
                        <img className="w-4 h-4 mr-2" src={locationSvg} />
                        <p>{house.city}</p>
                    </div>
                    <div className="flex flex-row items-center mt-1">
                        <img className="w-4 h-4 mr-2" src={areaSvg} />
                        <p>{house.area} m²</p>
                    </div>
                    <div className="flex flex-row items-center mt-1">
                        <img className="w-4 h-4 mr-2" src={bedSvg} />
                        <p>{house.nbRoom}</p>
                        <img className="w-4 h-4 ml-6 mr-2" src={parkingSvg} />
                        <p>{house.nbParking}</p>
                    </div>
                </div>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                </div>
                <div className="mt-6 ">
                    <p>{house.desc}</p>
                </div>
                {like &&
                    <div className="absolute bottom-3 flex flex-row items-center justify-around w-full">
                        <Button onClick={() => removeLike(house.id)}>Unlike</Button>
                        <Button color="primary-outline">Report</Button>
                    </div>
                }
            </div>
        </div>
    ) : (
        <></>
    );
};
