import React, { useState, DetailedHTMLProps, HTMLAttributes } from "react";
import { to as interpolate, animated, useSpring } from "@react-spring/web";
import { useDrag } from "@use-gesture/react";

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

export type SwipeCardProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    house: House;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
    house,
}) => {
    const to = (i: number) => ({ x: 0, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 });
    const from = () => ({ x: 0, rot: 0, scale: 1.1 });
    const trans = (r: number, s: number) => `rotateX(10deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

    const [gone] = useState(() => new Set());
    const [isLiked, setIsLiked] = useState(false);

    const [props, api] = useSpring((i: number) => ({ ...to(i), from: from() }));
    const bind = useDrag(({ args: [index], active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
        const trigger = vx > 0.1;
        if (!active && trigger) {
            if (xDir > 0) setIsLiked(true);
            else if (xDir < 0) setIsLiked(false);
            gone.add(index);
        }
        api.start(() => {
            const isGone = gone.has(index);
            return {
                x: isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0,
                rot: mx / 100 + (isGone ? xDir * vx : 0),
                scale: active ? 1.1 : 1,
                config: { friction: 50, tension: active ? 800 : isGone ? 120 : 500 },
            };
        });
    }, { axis: "x", rubberband: false });

    return (
        <>
            <animated.div className="absolute flex items-center justify-center will-change-transform select-none" style={{ x: props.x }}>
                <animated.div className="touch-none bg-no-repeat w-96 h-96 border-10 will-change-transform cursor-pointer p-10 bg-primary-100"
                    style={{ transform: interpolate([props.rot, props.scale], trans) }}
                    {...bind()}
                >
                    {house.address}
                    <h1>{isLiked ? "Liked" : "Disliked"}</h1>
                </animated.div>
            </animated.div>
        </>
    );
};
