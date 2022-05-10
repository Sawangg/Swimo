import React, { DetailedHTMLProps, HTMLAttributes } from "react";

export type PopupProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    onClose: () => void;
}

export const Popup: React.FC<PopupProps> = ({
    children,
    onClose,
    ...props
}) => (
    <div className="fixed flex items-center justify-center w-screen h-screen top-0 left-0 bg-dark">
        <div className="relative flex flex-col items-center justify-center p-10 overflow-hidden bg-white rounded-lg shadow w-1/4"
            {...props}>
            <button className="fixed top-[calc(100vh_-_66vh)] right-[calc(100vw_-_61vw)]" onClick={onClose}>X</button>
            {children}
        </div>
    </div>
);
