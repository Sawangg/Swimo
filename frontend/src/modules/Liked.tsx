import React, { DetailedHTMLProps, HTMLAttributes } from "react";
import axios from "axios";
import useSWR from "swr";

// eslint-disable-next-line @typescript-eslint/ban-types
export type LikedProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {}

export const Liked: React.FC<LikedProps> = () => {
    const fetcher = (url: string) => axios.get(url, { withCredentials: true }).then(res => res.data);
    const { data, error } = useSWR("http://localhost:3001/api/customer/likes", { revalidateOnFocus: false, fetcher });

    return (
        <div className="mt-4 h-96 flex items-center justify-center">
            {data &&
                <div className="w-1/5 h-screen shadow-lg bg-white z-50">

                </div>
            }
            {error && <p className="text-primary-900 font-bold">You haven&apos;t liked anything yet</p>}
        </div>
    );
};
