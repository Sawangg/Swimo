import React, { DetailedHTMLProps, HTMLAttributes, useState } from "react";
import { useLogin } from "hooks/useLogin";
import { useNavigate } from "react-router-dom";
import { Liked } from "./Liked";

// eslint-disable-next-line @typescript-eslint/ban-types
export type LeftPannelProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {}

export const LeftPannel: React.FC<LeftPannelProps> = () => {
    const [currentContent, setCurrentContent] = useState("like");
    const { user, resetLoggerUser } = useLogin();
    const navigate = useNavigate();

    const disconnect = async () => {
        await resetLoggerUser();
        navigate("/");
    };

    return (
        <div className="w-1/5 h-screen shadow-lg bg-white z-50">
            <div className="flex gap-3 px-5 items-center h-20 bg-gradient-to-r from-primary-600 to-primary-400">
                {user.avatar
                    ? <img className="cursor-pointer shadow rounded-full w-10 h-10 bg-primary-100" onClick={() => navigate("/profile")} src={user.avatar} />
                    : <button type="button" className="bg-primary-50 shadow rounded-full w-12 h-12" onClick={() => navigate("/profile")} />
                }
                <p className="text-primary-50 font-bold">{user.prenom} {user.nom}</p>
                <div className="flex flex-row gap-5 ml-auto">
                    {/* House */}
                    <button type="button" className="flex justify-center items-center select-none shadow-lg p-2 rounded-full w-10 h-10 bg-dark"
                        onClick={() => navigate("/home")}
                    >
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 486.196 486.196" fill="#FFFFFF" width="27" height="27">
                            <path d="M481.708,220.456l-228.8-204.6c-0.4-0.4-0.8-0.7-1.3-1c-5-4.8-13-5-18.3-0.3l-228.8,204.6c-5.6,5-6,13.5-1.1,19.1
                            c2.7,3,6.4,4.5,10.1,4.5c3.2,0,6.4-1.1,9-3.4l41.2-36.9v7.2v106.8v124.6c0,18.7,15.2,34,34,34c0.3,0,0.5,0,0.8,0s0.5,0,0.8,0h70.6
                            c17.6,0,31.9-14.3,31.9-31.9v-121.3c0-2.7,2.2-4.9,4.9-4.9h72.9c2.7,0,4.9,2.2,4.9,4.9v121.3c0,17.6,14.3,31.9,31.9,31.9h72.2
                            c19,0,34-18.7,34-42.6v-111.2v-34v-83.5l41.2,36.9c2.6,2.3,5.8,3.4,9,3.4c3.7,0,7.4-1.5,10.1-4.5
                            C487.708,233.956,487.208,225.456,481.708,220.456z M395.508,287.156v34v111.1c0,9.7-4.8,15.6-7,15.6h-72.2c-2.7,0-4.9-2.2-4.9-4.9
                            v-121.1c0-17.6-14.3-31.9-31.9-31.9h-72.9c-17.6,0-31.9,14.3-31.9,31.9v121.3c0,2.7-2.2,4.9-4.9,4.9h-70.6c-0.3,0-0.5,0-0.8,0
                            s-0.5,0-0.8,0c-3.8,0-7-3.1-7-7v-124.7v-106.8v-31.3l151.8-135.6l153.1,136.9L395.508,287.156L395.508,287.156z"/>
                        </svg>
                    </button>
                    {/* Sign out */}
                    <button type="button" className="flex justify-center items-center select-none shadow-lg p-2 rounded-full w-10 h-10 bg-dark"
                        onClick={() => disconnect()}
                    >
                        <svg width="27" height="27" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#FFFFFF">
                            <path d="M4,12a1,1,0,0,0,1,1h7.59l-2.3,2.29a1,1,0,0,0,0,1.42,1,1,0,0,0,1.42,0l4-4a1,1,0,0,0,.21-.33,1,1,0,0,0,0-.76,1,1,0,0,0-.21-.33l-4-4a1,1,0,1,0-1.42,1.42L12.59,11H5A1,1,0,0,0,4,12ZM17,2H7A3,3,0,0,0,4,5V8A1,1,0,0,0,6,8V5A1,1,0,0,1,7,4H17a1,1,0,0,1,1,1V19a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V16a1,1,0,0,0-2,0v3a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V5A3,3,0,0,0,17,2Z" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className="flex flex-col m-4">
                <div className="flex flex-row gap-5 items-center justify-around">
                    <button className="" onClick={() => setCurrentContent("like")}>Liked</button>
                    <button className="" onClick={() => setCurrentContent("messages")}>Messages</button>
                </div>
                {currentContent === "like" && <Liked />}
            </div>
        </div>
    );
};
