import { useState } from "react";
import { useLogin } from "hooks/useLogin";
import { Button } from "ui/Button";
import { LeftPannel } from "modules/LeftPannel";
import { Input } from "ui/Input";

export default function Pofile() {
    const [avatarImg, setAvatarImg] = useState<string | Blob>();
    const { user, sendAvatar } = useLogin();

    const save = () => {
        if (avatarImg) {
            const formData = new FormData();
            formData.append("file", avatarImg);
            sendAvatar(formData);
        }
    };

    const handleAvatarInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) setAvatarImg(e.target.files[0]);
    };

    return (
        <div className="flex flex-row w-screen h-screen bg-white-100">
            <LeftPannel />
            <div className="fixed flex flex-col w-screen h-screen justify-center items-center">
                <h1>{user.prenom} {user.nom}</h1>
                <Input label="name"></Input>
                <input type="file" name="avatar" onChange={e => handleAvatarInput(e)} />
                <Button onClick={() => save()}>Save</Button>
            </div>
        </div>
    );
}
