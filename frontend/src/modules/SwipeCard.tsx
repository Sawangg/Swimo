import React, { useState, DetailedHTMLProps, HTMLAttributes, useEffect } from "react";
import { to as interpolate, animated, useSpring } from "@react-spring/web";
import { useNavigate } from "react-router-dom";
import { useDrag } from "@use-gesture/react";
import { useHouse } from "hooks/useHouse";
import { useLike } from "hooks/useLike";
import infoSvg from "../assets/info.svg";
import axios from "axios";

export type SwipeCardProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    openProfile: () => void;
}

export const SwipeCard: React.FC<SwipeCardProps> = ({
    openProfile,
}) => {
    const navigate = useNavigate();
    const { house, houseError, setNewHouse, setHouseError } = useHouse();
    const { sendLike } = useLike();
    const [gone] = useState(() => new Set());
    const [imgIdx, setImgIdx] = useState(0);

    const to = (i: number) => ({ x: 0, scale: 1, rot: -10 + Math.random() * 20, delay: i * 100 });
    const from = () => ({ x: 0, rot: 0, scale: 1.05 });
    const trans = (_r: number, s: number) => `scale(${s})`;

    const [springValues, api] = useSpring((i: number) => ({ ...to(i), from: from() }));
    const bind = useDrag(({ event, args: [index], active, movement: [mx], direction: [xDir], velocity: [vx] }) => {
        event.preventDefault();
        if (!active && vx > 0.2) {
            if (xDir > 0) fetchAfterLike();
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
        if (!active && gone.has(index)) {
            setTimeout(() => {
                api.set({ x: 0 });
                gone.clear();
            }, 500);
        }
    }, { axis: "x", rubberband: false });

    const ejectCard = (dir: number) => {
        if (dir > 0) fetchAfterLike();
        else newHouse();
        api.start(() => ({
            x: (200 + window.innerWidth) * dir,
            rot: Math.floor(Math.random() * (200 - 1) + 1) / 100 + (dir * 10 * 0.2),
            scale: 1.1,
            config: { friction: 50, tension: 120 },
        }));
    };

    const fetchAfterLike = () => {
        sendLike(house.id).then(() => {
            axios.get("http://localhost:3001/api/housing/random", { withCredentials: true }).then(rep => {
                setNewHouse(rep.data);
                setHouseError(false);
            }).catch(() => {
                setHouseError(true);
            });
        });
    };

    const handleArrows = (e: KeyboardEvent) => {
        if (e.key === "ArrowRight") ejectCard(1);
        else if (e.key === "ArrowLeft") ejectCard(-1);
    };

    const handleClickPhoto = () => {
        if (springValues.x.toJSON() === 0) {
            const temp = (imgIdx + 1) % house.photos.length;
            setImgIdx(temp);
        }
    };

    const newHouse = async () => {
        const rep = await axios.get("http://localhost:3001/api/housing/random", { withCredentials: true });
        if (rep.status === 200 || rep.status === 304) {
            setNewHouse(rep.data);
            setHouseError(false);
        } else {
            setHouseError(true);
        }
    };

    useEffect(() => {
        if (house.id === 0) newHouse();
    }, [house, newHouse]);

    useEffect(() => {
        window.addEventListener("keydown", handleArrows);
        return () => {
            window.removeEventListener("keydown", handleArrows);
        };
    });

    return !houseError ? (
        <animated.div className="flex items-center justify-center will-change-transform select-none min-w-1/5 min-h-4/6 max-w-1/5 max-h-4/6 h-4/6 w-1/5 -z-50" style={{ x: springValues.x }}>
            <animated.div className="touch-none bg-no-repeat w-full h-full border-10 will-change-transform cursor-grab rounded-lg shadow-lg"
                style={{ transform: interpolate([springValues.rot, springValues.scale], trans) }}
                {...bind()}
            >
                <div className="absolute filter-black w-full h-full rounded-lg" onClick={handleClickPhoto} />
                <img className="select-none touch-none rounded-lg min-h-full min-w-full h-full w-full max-h-full max-w-full" src={house.photos[imgIdx]} draggable="false" onMouseDown={e => e.preventDefault()} />
                {house.photos.length > 1 &&
                    <div className="absolute top-4 flex flex-row gap-4 pl-2">
                        {house.photos.map((_photo, key) => (
                            <button key={key} type="button" className="rounded-lg bg-dark w-14 h-1 focus:bg-white" onClick={() => setImgIdx(key)} />
                        ))}
                    </div>}

                <div className="absolute bottom-0 left-0 w-full flex flex-col p-3">
                    <div className="flex flex-row items-center">
                        <div className="pl-4">
                            <h1 className="text-white text-3xl font-bold pb-2">{house.title}</h1>
                            <h2 className="text-white text-xl">{house.city}</h2>
                        </div>
                        <img className="cursor-pointer w-8 h-8 ml-auto mr-2" onClick={openProfile} src={infoSvg} />
                    </div>

                    {house.tags.length > 0 &&
                        <div className="flex flex-row gap-3 items-center justify-center mt-3">
                            {house.tags.map((tag, key) => {
                                if (key === 0) {
                                    return (
                                        <div className="text-white text-xs rounded-full bg-gradient-to-r from-primary-600 to-primary-400 py-1 px-3" key={key}>{tag}</div>
                                    );
                                } else {
                                    return (
                                        <div className="text-white text-xs rounded-full bg-dark py-1 px-3" key={key}>{tag}</div>
                                    );
                                }
                            })}
                        </div>
                    }

                    <div className="w-full p-2 mt-3 flex flex-row gap-3 justify-around items-center">
                        <button type="button" className="flex justify-center items-center select-none border-dislike-400 shadow-lg border-2 p-2 mb-1 rounded-full
                            w-12 h-12 focus:outline-none focus:shadow-outline"
                            onClick={() => ejectCard(-1)}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9F2A2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                        </button>
                        <button type="button" className="flex justify-center items-center select-none border-like shadow-lg border-2 p-2 rounded-full
                            w-12 h-12 focus:outline-none focus:shadow-outline"
                            onClick={() => ejectCard(1)}
                        >
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="35" height="35" fill="#2B9E4A" viewBox="0 0 490.4 490.4">
                                <path d="M222.5,453.7c6.1,6.1,14.3,9.5,22.9,9.5c8.5,0,16.9-3.5,22.9-9.5L448,274c27.3-27.3,42.3-63.6,42.4-102.1
			                    c0-38.6-15-74.9-42.3-102.2S384.6,27.4,346,27.4c-37.9,0-73.6,14.5-100.7,40.9c-27.2-26.5-63-41.1-101-41.1
			                    c-38.5,0-74.7,15-102,42.2C15,96.7,0,133,0,171.6c0,38.5,15.1,74.8,42.4,102.1L222.5,453.7z M59.7,86.8
			                    c22.6-22.6,52.7-35.1,84.7-35.1s62.2,12.5,84.9,35.2l7.4,7.4c2.3,2.3,5.4,3.6,8.7,3.6l0,0c3.2,0,6.4-1.3,8.7-3.6l7.2-7.2
			                    c22.7-22.7,52.8-35.2,84.9-35.2c32,0,62.1,12.5,84.7,35.1c22.7,22.7,35.1,52.8,35.1,84.8s-12.5,62.1-35.2,84.8L251,436.4
			                    c-2.9,2.9-8.2,2.9-11.2,0l-180-180c-22.7-22.7-35.2-52.8-35.2-84.8C24.6,139.6,37.1,109.5,59.7,86.8z"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </animated.div>
        </animated.div>
    ) : (
        <div className="flex flex-col gap-3 text-center">
            <h1 className="text-primary-800">There is no more estate to discover</h1>
            <h2 className="text-primary-800">You might want to change your <span className="underline text-primary-300 cursor-pointer" onClick={() => navigate("/profile")}>discovery settings</span> !</h2>
        </div>
    );
};
