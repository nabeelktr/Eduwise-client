'use client'
import "./globals.css";
import {Poppins} from "next/font/google"
import {Josefin_Sans} from 'next/font/google'
import { ThemeProvider } from "../utils/theme-provider";
import { Toaster } from "sonner";
import { Providers } from "./Provider";
import { SessionProvider } from "next-auth/react";
import { useLoadUserQuery } from "../../redux/features/api/apiSlice";
import Loader from '../components/ui/Loader/Loader'
import { FC } from "react";
import { BeatLoader } from "react-spinners";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../../redux/store";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",
})

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${josefin.variable} !bg-white bg-no-repeat dark:bg-gradient-to-b dark:from-gray-800 dark:to-black duration-300`}>
        <Providers>
          <PersistGate loading={null} persistor={persistor}>
          <SessionProvider>
              <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                {/* <Custom>{children}</Custom> */}
                {children}
                <Toaster position="top-center"/>
              </ThemeProvider>
            </SessionProvider>
            </PersistGate>
        </Providers>
      </body>
    </html>
  );
}

const Custom : FC<{children: React.ReactNode}> = ({children}) => {
  const {isLoading} = useLoadUserQuery({})
  return (
    <>
    {
    isLoading ? 
      <Loader />
    : 
    <>
    {children}
    </>
    }
    </>
  )
}
