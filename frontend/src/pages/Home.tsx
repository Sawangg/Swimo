import { useEffect, useState } from "react";
import { SwipeCard } from "modules/SwipeCard";
import { useHouse } from "hooks/useHouse";
import { RightPannel } from "modules/RightPannel";
import { LeftPannel } from "modules/LeftPannel";
import axios from "axios";
import useSWR from "swr";

export default function Home() {
    const { house, setNewHouse } = useHouse();
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

    const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);
    const { data } = useSWR("http://localhost:3001/api/housing/random", { suspense: true, revalidateOnFocus: false, fetcher });

    useEffect(() => {
        if (data) setNewHouse(data);
    }, [data, setNewHouse]);

    const openProfile = () => setIsDescriptionOpen(!isDescriptionOpen);

    return (
        <>
            <LeftPannel />
            <div className="fixed flex flex-row w-screen h-screen justify-center items-center">
                <SwipeCard openProfile={openProfile} />
            </div>
            {isDescriptionOpen && <RightPannel house={house} />}
        </>
    );
}
