import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginUser, useLogin } from "hooks/useLogin";
import { Button } from "ui/Button";
import { LeftPannel } from "modules/LeftPannel";
import { Input } from "ui/Input";

export default function Pofile() {
    const navigate = useNavigate();
    const { user, updateUser } = useLogin();
    const [updatedUser, setUpdatedUser] = useState<LoginUser>({ id: user.id, prenom: user.prenom, nom: user.nom, avatar: user.avatar });
    const [rawAvatarData, setRawAvatarData] = useState<Blob | null>();
    const fileInput = useRef<HTMLInputElement | null>(null);

    const sendContent = () => {
        const formData = new FormData();
        if (rawAvatarData) formData.append("file", rawAvatarData);
        if (updatedUser.prenom) formData.append("prenom", user.prenom);
        if (updatedUser.nom) formData.append("nom", user.nom);
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
            <div className="flex flex-col h-3/5 w-7/12 bg-white m-auto rounded-lg p-4">
                <div className="flex flex-col">
                    <div className="flex flex-row">
                        <img className="cursor-pointer bg-primary-100 rounded-full shadow w-40 h-40" src={updatedUser.avatar} onClick={() => fileInput.current?.click()} />
                        <input type="file" ref={fileInput} name="avatar" hidden={true} onChange={e => handleAvatarInput(e)} />
                        <Input label={user.prenom}></Input>
                    </div>
                    <div className="flex flex-row w-full h-full justify-around items-center">
                        <Button onClick={() => sendContent()}>Save</Button>
                        <Button color="secondary" onClick={() => navigate("/home")}>Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
