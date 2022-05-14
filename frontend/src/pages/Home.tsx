import { SwipeCard, House } from "modules/SwipeCard";
import axios from "axios";
import useSWR from "swr";

export default function Home() {
    const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);
    const { data } = useSWR("http://192.168.1.22:3001/api/housing", { suspense: true, fetcher });

    return (
        <div className="flex w-screen h-screen justify-center items-center">
            {data.map((house: House) => (
                <SwipeCard key={house.id} house={house} />
            ))}
        </div>
    );
}
