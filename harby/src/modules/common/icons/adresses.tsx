import React from "react"
import { IconProps } from "types/icon"

const Addresses: React.FC<IconProps> = ({
    size = "20",
    color = "currentColor",
    ...attributes
}) => {
    return (
        // <svg
        //     width={size}
        //     height={size}
        //     viewBox="0 0 23 19"
        //     fill='none'
        //     xmlns="http://www.w3.org/2000/svg"
        //     {...attributes}
        // >
        <svg
            width={size}
            height={size}
            viewBox="0 0 20 20"
            fill={color}
            xmlns="http://www.w3.org/2000/svg"
            {...attributes}
        >
            <path d="M1.41955 6.01177C1.49026 3.39547 3.47016 1.41557 6.01575 1.41557V0.00136415C2.55092 -0.0693459 -0.136086 2.61766 0.00533584 6.01177H1.41955ZM6.01575 4.38542V2.97121C4.24798 3.04192 2.97519 4.31471 2.97519 6.01177H4.3894C4.53082 5.16324 5.16722 4.52684 6.01575 4.38542ZM16.0157 1.41557C18.5613 1.41557 20.5412 3.39547 20.6119 6.01177H22.0261C22.1675 2.61766 19.4805 -0.0693459 16.0157 0.00136415V1.41557ZM16.0157 2.97121V4.38542C16.8642 4.52684 17.5006 5.16324 17.642 6.01177H19.0563C19.0563 4.31471 17.7835 3.04192 16.0157 2.97121ZM18.0157 19.0001V11.0001H21.0157L11.0157 2.00005L1.01575 11.0001H4.01575V19.0001H18.0157ZM11.0157 4.70005L16.0157 9.20005V17.0001H6.01575V9.20005L11.0157 4.70005Z" fill="#6F6F6F" />
        </svg>
    )
}

export default Addresses
