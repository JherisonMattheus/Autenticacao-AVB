import type React from "react";

interface ButtonProps {
    width: string;
    height: string;
    label: string;
    variant: string;
    textSize: string;
    onClick: (event: React.MouseEvent<HTMLButtonElement>)=> void;
}

export default function Button({width, height, label, variant, textSize, onClick}: ButtonProps) {
    const primary = 'bg-azul-marinho hover:bg-azul-marinho-claro active:bg-azul-marinho-escuro text-cinza-nuvem';
    const secundary = 'bg-azul-ceruleo hover:bg-azul-ceruleo-claro active:bg-azul-ceruleo-escuro';

    const bgStyle = variant === 'primary'? primary : secundary;

    return (
        <button
        className= {` ${bgStyle} ${width} ${height} font-bold ${textSize} p-2 rounded-xl cursor-pointer shadow-xl`}
        onClick={onClick}
        >
            {label}
        </button>
    )
}
