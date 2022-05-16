import { useEffect, useState } from "react";
import { SwipeCard } from "modules/SwipeCard";
import { useHouse } from "hooks/useHouse";
import { LeftPannel } from "modules/LeftPannel";
import axios from "axios";
import useSWR from "swr";
import { RightPannel } from "modules/RightPannel";

export default function Home() {
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { house, setNewHouse } = useHouse();

    const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);
    const { data } = useSWR("http://localhost:3001/api/housing/random", { suspense: true, revalidateOnFocus: false, fetcher });

    useEffect(() => {
        if (data) setNewHouse(data);
    }, [data, setNewHouse]);

    const openProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    };

    return (
        <div className="flex flex-row w-screen h-screen bg-white-100">
            <LeftPannel />
            <div className="fixed flex flex-row w-screen h-screen justify-center items-center">
                {house.id !== 0 && <SwipeCard key={house.id} house={house} openProfile={openProfile} />}
            </div>
            {isProfileOpen && <RightPannel house={house} /> }
        </div>
    );
}
