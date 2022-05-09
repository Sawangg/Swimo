import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type InputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    label?: string;
};

export const Input: React.FC<InputProps> = ({
    label,
    ...props
}) => (
    <input className="" placeholder={label} {...props} />
);
