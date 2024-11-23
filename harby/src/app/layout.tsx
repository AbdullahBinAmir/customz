import Providers from "@modules/providers"
import "styles/globals.css"

import { Poppins } from "next/font/google"

import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <link rel="icon" href="customz.png" type="image/png" />
      </head>
      <body>
        <Providers>
          <main className="relative">{children}</main>
        </Providers>
        <ToastContainer />
      </body>
    </html>
  )
}
