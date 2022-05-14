import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?: string;
};

export const Input: React.FC<InputProps> = ({
    label,
    ...props
}) => (
    <input className="border-b-2 outline-none"
        placeholder={label}
        {...props}
    />
);
