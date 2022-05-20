import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser, useLogin } from "hooks/useLogin";
import { Button } from "ui/Button";
import { LeftPannel } from "modules/LeftPannel";
import { TextInput } from "ui/TextInput";

export default function Pofile() {
    const navigate = useNavigate();
    const { user, updateUser } = useLogin();
    const [updatedUser, setUpdatedUser] = useState<LoginUser>({ id: user.id, prenom: user.prenom, nom: user.nom, avatar: user.avatar });
    const [rawAvatarData, setRawAvatarData] = useState<Blob | null>();
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

    return (
        <div className="flex flex-row items-center">
            <LeftPannel />
            <div className="flex flex-col h-3/5 w-7/12 bg-white m-auto rounded-lg px-20 pb-20">
                <div className="flex flex-col my-10 w-full">
                    <div className="flex flex-row gap-5 items-center justify-around">
                        <button className="">Profile</button>
                        <button className="">Houses</button>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <img className="cursor-pointer bg-primary-100 rounded-full shadow w-40 h-40" src={updatedUser.avatar} onClick={() => fileInput.current?.click()} />
                        <input type="file" ref={fileInput} name="avatar" hidden={true} onChange={e => handleAvatarInput(e)} />
                        <div className="flex flex-row gap-7 w-full justify-center">
                            <TextInput placeholder={user.prenom} onChange={e => setUpdatedUser({ ...updatedUser, prenom: e.target.value })} />
                            <TextInput placeholder={user.nom} onChange={e => setUpdatedUser({ ...updatedUser, nom: e.target.value })} />
                        </div>
                    </div>
                    <div className="flex flex-row w-full h-full justify-around items-center mt-60">
                        <Button onClick={() => sendContent()}>Save</Button>
                        <Button color="primary-outline" onClick={() => navigate("/home")}>Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
