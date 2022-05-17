import React, { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { Spinner } from "./Spinner";

const sizeClassnames = {
    big: "py-2 px-6 text-sm rounded-lg",
    small: "px-2 py-1 text-sm rounded-md",
    tiny: "px-1 text-sm rounded-5",
};

const colorClassnames = {
    primary:
        "text-button text-primary-50 bg-gradient-to-l from-primary-600 to-primary-400 transition duration-200 ease-in-out hover:bg-accent-hover disabled:text-accent-disabled disabled:bg-accent-hover",
    secondary:
        "text-button bg-primary-500 hover:bg-primary-400 disabled:text-primary-300",
    outline:
        "text-button text-dark bg-none",
    transparent: "text-button bg-transparent",
};

export type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> & {
    size?: keyof typeof sizeClassnames;
    color?: keyof typeof colorClassnames;
    loading?: boolean;
    icon?: ReactNode;
    transition?: boolean;
};

export const Button: React.FC<ButtonProps> = ({
    children,
    size = "big",
    color = "primary",
    disabled,
    loading,
    icon,
    className = "",
    transition,
    ...props
}) => (
    <button
        disabled={disabled || loading}
        className={`flex outline-none focus:ring-4 focus:ring-${color} ${sizeClassnames[size]
            } ${transition ? `transition duration-200 ease-in-out` : ``} ${colorClassnames[color]
            } font-bold flex items-center justify-center ${className}`}
        {...props}
    >
        <span className={loading ? "opacity-0" : `flex items-center`}>
            {icon ? <span className={`mr-2 items-center`}>{icon}</span> : null}
            {children}
        </span>
        {loading ? (
            <span className={`absolute`}>
                <Spinner />
            </span>
        ) : null}
    </button>
);
