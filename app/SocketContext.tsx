'use client'
import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { io, Socket } from "socket.io-client";

const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_SERVER_URI || "";

// Define a type for the socket
type SocketContextType = Socket | null;

const SocketContext = createContext<SocketContextType>(null);

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState<SocketContextType>(null);

    useEffect(() => {
        const socketInstance: Socket = io(ENDPOINT, { transports: ["websocket"] });
        setSocket(socketInstance);

        socketInstance.on("connect", () => {
            console.log("Connected to socket server");
        });

        socketInstance.on("disconnect", () => {
            console.log("Disconnected from socket server");
        });

        return () => {
            socketInstance.disconnect();
        };
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};
