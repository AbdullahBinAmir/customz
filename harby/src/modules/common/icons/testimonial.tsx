import React from "react"
import { IconProps } from "types/icon"

const TestimonialTag: React.FC<IconProps> = ({
    size = "20",
    color = "currentColor",
    ...attributes
}) => {
    return (
        <svg width="12" height="12" viewBox="0 0 28 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M27.718 10.3269C27.718 8.48427 26.7505 6.78942 25.1929 5.87301L16.3889 0.689926C14.8216 -0.226476 12.8963 -0.226476 11.3387 0.689926L2.53477 5.86316C0.967468 6.78942 0 8.48427 0 10.3269V20.6832C0 22.5259 0.967468 24.2208 2.52509 25.1372L11.3291 30.3104C12.8963 31.2268 14.8216 31.2268 16.3792 30.3104L25.1832 25.1372C26.7505 24.2208 27.7083 22.5161 27.7083 20.6832V10.3269H27.718ZM24.0126 25.8269H13.8541C8.24283 25.8269 3.69573 21.1956 3.69573 15.4805C3.69573 9.76526 8.24283 5.13398 13.8541 5.13398C19.4655 5.13398 24.0126 9.76526 24.0126 15.4805V25.8269Z" fill="url(#paint0_linear_1423_226)" />
            <defs>
                <linearGradient id="paint0_linear_1423_226" x1="0" y1="15.5021" x2="27.7164" y2="15.5021" gradientUnits="userSpaceOnUse">
                    <stop stop-color="#5DC56C" />
                    <stop offset="1" stop-color="#18B3D3" />
                </linearGradient>
            </defs>
        </svg>

    )
}

export default TestimonialTag
