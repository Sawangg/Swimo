import React, { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { to as interpolate, useSprings, animated } from "@react-spring/web";
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
    const to = (i: number) => ({ x: 0, y: i * -4, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 });
    const from = () => ({ x: 0, rot: 0, scale: 1.5, y: -1000 });
    const trans = (r: number, s: number) => `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`;

    const [gone] = useState(() => new Set<number>());
    const [props, api] = useSprings(2, i => ({
        ...to(i),
        from: from(),
    }));
    const bind = useDrag(({ args: [index], active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
        const trigger = vx > 0.2;
        if (!active && trigger) gone.add(index);
        api.start(i => {
            if (index !== i) return;
            const isGone = gone.has(index);
            const x = isGone ? (200 + window.innerWidth) * xDir : active ? mx : 0;
            const rot = mx / 100 + (isGone ? xDir * 10 * vx : 0);
            const scale = active ? 1.1 : 1;
            return {
                x,
                rot,
                scale,
                delay: undefined,
                config: { friction: 50, tension: active ? 800 : isGone ? 200 : 500 },
            };
        });

        if (!active && gone.size === 2) {
            setTimeout(() => {
                gone.clear();
                api.start(i => to(i));
            }, 600);
        }
    });

    return (
        <div className="flex flex-col items-center justify-center px-10 overflow-hidden bg-white rounded-lg shadow h-28">
            {props.map(({ x, y, rot, scale }, i) => (
                <animated.div className="absolute flex items-center justify-center w-80 h-80 will-change-transform" key={i} style={{ x, y }}>
                    <animated.div className="touch-none bg-primary bg-no-repeat w-36 h-36 border-10 will-change-transform"
                        {...bind(i)}
                        style={{
                            transform: interpolate([rot, scale], trans),
                            backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/f/f5/RWS_Tarot_08_Strength.jpg')`,
                        }}
                    >
                        {house.address}
                    </animated.div>
                </animated.div>
            ))}
        </div>
    );
};
