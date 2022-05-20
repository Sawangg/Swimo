import { useState } from "react";
import { SwipeCard } from "modules/SwipeCard";
import { RightPannel } from "modules/RightPannel";
import { LeftPannel } from "modules/LeftPannel";
import { useHouse } from "hooks/useHouse";

export default function Home() {
    const { house } = useHouse();
    const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

    const openProfile = () => setIsDescriptionOpen(!isDescriptionOpen);

    return (
        <>
            <LeftPannel />
            <div className="fixed flex flex-row w-screen h-screen justify-center items-center">
                <SwipeCard openProfile={openProfile} />
            </div>
            {isDescriptionOpen && <RightPannel house={house}/>}
        </>
    );
}
