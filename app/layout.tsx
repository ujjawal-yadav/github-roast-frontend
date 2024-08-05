
import {  Playfair_Display, Cardo, Overlock } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./utils/theme-provider";
// import { Providers } from "./Provider"; 
import {Toaster} from 'react-hot-toast';
// import socketIO from "socket.io-client";
// const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";
// const socketId=socketIO( ENDPOINT,{transports:["websocket"]});
import { SocketProvider } from "./SocketContext";


const playFair = Playfair_Display({ subsets: ["latin"],weight:["400","500","600","700","800","900"],variable:"--font-PlayfairDisplay", });
const cardo = Cardo({ subsets: ["latin"],weight:["400","700"],variable:"--font-Cardo", });
const overlock = Overlock({ subsets: ["latin"],weight:["400","700","900"],variable:"--font-Overlock)", });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playFair.variable} ${cardo.variable} ${overlock.variable} bg-gradient-to-r from-custom-color-1 via-custom-color-3 to-custom-color-2  dark:bg-black `}>
        <SocketProvider>

        <ThemeProvider attribute="class" defaultTheme="system" enableSystem> 
            {children}
            <Toaster position='top-center' reverseOrder={false}/>
          </ThemeProvider>
        </SocketProvider>
          
        
      </body>
    </html>
  )
};
