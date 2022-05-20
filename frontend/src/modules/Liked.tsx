import React, { DetailedHTMLProps, HTMLAttributes, useEffect, useState } from "react";
import { House } from "hooks/useHouse";
import { RightPannel } from "./RightPannel";
import { useLike } from "hooks/useLike";

// eslint-disable-next-line @typescript-eslint/ban-types
export type LikedProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {}

export const Liked: React.FC<LikedProps> = () => {
    const { likes, getLikes } = useLike();
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
    const [indexClicked, setIndexClicked] = useState(0);

    useEffect(() => {
        getLikes();
    }, [getLikes]);

    const handleClick = (houseId: number) => {
        setIsDescriptionOpen(!isDescriptionOpen);
        setIndexClicked(houseId);
    };

    return (
        <div className="mt-8">
            {likes.length === 0 &&
                <div className="flex justify-center items-center h-96">
                    <p className="text-primary-900 font-bold">You haven&apos;t liked anything yet</p>
                </div>
            }
            {likes.length > 0 && likes[0] !== undefined &&
                <div className="grid grid-cols-3 h-full w-full gap-4">
                    {likes.map((house: House, key: number) => (
                        <div className="relative flex items-center justify-center mx-2 w-full h-full" key={house.id}>
                            <img className="shadow-lg rounded-lg cursor-pointer w-full h-full" src={house.photos[0]} onClick={() => handleClick(key)} />
                            <p className="text-white font-bold absolute left-2 bottom-3">{house.title}</p>
                        </div>
                    ))}
                </div>
            }
            {isDescriptionOpen && <RightPannel house={likes[indexClicked]} like={true} />}
        </div>
    );
};
