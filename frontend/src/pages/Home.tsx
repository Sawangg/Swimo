import { SwipeCard, House } from "modules/SwipeCard";
import useSWR from "swr";

export default function Home() {
    const { data } = useSWR("http://localhost:3001/api/housing", { suspense: true, fetcher: (...args) => fetch(...args).then(res => res.json()) });

    return (
        <div className="grid gap-3">
            {
                data.map((house: House) => (
                    <div key={house.id}>
                        <SwipeCard house={house} />
                    </div>
                ))
            }
        </div>
    );
}
