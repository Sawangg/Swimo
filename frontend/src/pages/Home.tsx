import { useEffect } from "react";
import { SwipeCard } from "modules/SwipeCard";
import { useHouse } from "hooks/useHouse";
import { LeftPannel } from "modules/LeftPannel";
import axios from "axios";
import useSWR from "swr";

export default function Home() {
    const { house, setNewHouse } = useHouse();

    const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);
    // Remove auto refresh
    const { data } = useSWR("http://192.168.1.22:3001/api/housing/random", { suspense: true, revalidateOnFocus: false, fetcher });

    useEffect(() => {
        if (data) setNewHouse(data);
    }, [data, setNewHouse]);

    return (
        <div className="flex flex-row w-screen h-screen bg-white-100">
            <LeftPannel />

            <div className="fixed flex flex-row w-screen h-screen justify-center items-center">
                {house.id !== 0 && <SwipeCard key={house.id} house={house} />}
            </div>
        </div>
    );
}
