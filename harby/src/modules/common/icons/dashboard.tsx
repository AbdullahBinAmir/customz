import React from "react"
import { IconProps } from "types/icon"

const Dashboard: React.FC<IconProps> = ({
    size = "18",
    color = "currentColor",
    ...attributes
}) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...attributes}>
            <path d="M10 0V6H18V0M10 18H18V8H10M0 18H8V12H0M0 10H8V0H0V10Z" fill={color} />
        </svg>
    )
}

export default Dashboard
