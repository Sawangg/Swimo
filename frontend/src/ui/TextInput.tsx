import React, { DetailedHTMLProps, InputHTMLAttributes } from "react";

export type TextInputProps = DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    placeholder?: string;
    password?: boolean;
    label?: string;
    disabled?: boolean;
};

export const TextInput: React.FC<TextInputProps> = ({
    placeholder,
    password,
    ...props
}) => (
    <div className="mb-3 xl:w-96">
        <input {...props}
            type={password ? "password" : "text"}
            className="block w-full px-3 py-1.5 text-base font-normal text-primary-800 bg-white bg-clip-padding border border-solid border-primary-800
                    rounded transition ease-in-out m-0focus:text-primary-700 focus:bg-white focus:border-primary-300 focus:outline-none"
            placeholder={placeholder}
        />
    </div>
);
