import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser, useLogin } from "hooks/useLogin";
import { Button } from "ui/Button";
import { LeftPannel } from "modules/LeftPannel";
import { TextInput } from "ui/TextInput";
import { House } from "hooks/useHouse";
import { useOwns } from "hooks/useOwns";

export default function Pofile() {
    const navigate = useNavigate();
    const { owns, getOwns } = useOwns();
    const { user, updateUser } = useLogin();
    const [updatedUser, setUpdatedUser] = useState<LoginUser>({ id: user.id, prenom: user.prenom, nom: user.nom, avatar: user.avatar });
    const [rawAvatarData, setRawAvatarData] = useState<Blob | null>();
    const [menu, setMenu] = useState<string>("profile");
    const fileInput = useRef<HTMLInputElement | null>(null);

    const sendContent = () => {
        const formData = new FormData();
        if (rawAvatarData) formData.append("file", rawAvatarData);
        if (updatedUser.prenom) formData.append("prenom", updatedUser.prenom);
        if (updatedUser.nom) formData.append("nom", updatedUser.nom);
        updateUser(formData);
    };

    const handleAvatarInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setRawAvatarData(e.target.files[0]);
            setUpdatedUser({ ...updatedUser, avatar: URL.createObjectURL(e.target.files[0]) });
        }
    };

    useEffect(() => {
        getOwns();
    }, [getOwns]);

    return (
        <div className="flex flex-row items-center">
            <LeftPannel />
            <div className="container flex flex-col h-3/5 w-7/12 bg-white m-auto rounded-lg px-20 pb-20 shadow">
                <div className="flex flex-col my-10 w-full">
                    <div className="flex flex-row gap-5 items-center justify-around">
                        <button className={menu === "profile" ? "border-b-2 border-primary-500" : ""} onClick={() => setMenu("profile")}>Profile</button>
                        <button className={menu === "estates" ? "border-b-2 border-primary-500" : ""} onClick={() => setMenu("estates")}>Estate</button>
                    </div>
                </div>
                {menu === "profile" &&
                    <div className="flex flex-col">
                        <div className="flex flex-row justify-center items-center">
                            <img className="cursor-pointer bg-primary-100 rounded-full shadow w-40 h-40" src={updatedUser.avatar} onClick={() => fileInput.current?.click()} />
                            <input type="file" ref={fileInput} name="avatar" hidden={true} onChange={e => handleAvatarInput(e)} />
                            <div className="flex flex-row gap-7 w-full justify-center">
                                <TextInput placeholder={user.prenom} onChange={e => setUpdatedUser({ ...updatedUser, prenom: e.target.value })} />
                                <TextInput placeholder={user.nom} onChange={e => setUpdatedUser({ ...updatedUser, nom: e.target.value })} />
                            </div>
                        </div>
                        <div>

                        </div>
                        <div className="flex flex-row w-full h-full justify-around items-center mt-60">
                            <Button onClick={() => sendContent()}>Save</Button>
                            <Button color="primary-outline" onClick={() => navigate("/home")}>Cancel</Button>
                        </div>
                    </div>
                }
                {menu === "estates" && owns.length > 0 ?
                    <div className="grid grid-cols-4 mt-6">
                        {owns.map((house: House, key: number) => (
                            <div className="relative flex items-center justify-center mx-2 w-full h-full" key={key}>
                                <img className="shadow-lg rounded-lg cursor-pointer w-full h-full" src={house.photos[0]} />
                                <p className="text-white font-bold absolute left-2 bottom-3">{house.title}</p>
                            </div>
                        ))}
                    </div>
                    : menu === "estates" &&
                    <div className="flex justify-center items-center h-96">
                        <p className="text-primary-900 font-bold">You haven&apos;t added anything yet</p>
                    </div>
                }
            </div>
        </div>
    );
}
