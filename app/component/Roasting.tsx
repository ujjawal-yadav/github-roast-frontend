import React, { FC, useEffect, useState, useRef } from "react";
import { FaArrowRight } from "react-icons/fa";
import toast from 'react-hot-toast';
import useTypingEffect from "../utils/roastEditing";
import Modal from "./Modal";
import { useSocket } from "../SocketContext";
import { TiArrowBackOutline } from "react-icons/ti";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    theme: string;
};

const Roasting: FC<Props> = ({ open, setOpen, theme }) => {
    const socket = useSocket();
    const [githubUsername, setGithubUsername] = useState("");
    const [roastContent, setRoastContent] = useState("");
    const [error, setError] = useState("");
    const [shouldFetch, setShouldFetch] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [requestCount, setRequestCount] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const [autoScroll, setAutoScroll] = useState(true);
    const [socketId, setSocketId] = useState<string>("");
    const [githubData, setGithubData] = useState<any>(null);

    const handleRoastClick = () => {
        if (githubUsername.trim() === "") {
            toast.error("Please enter a GitHub username.");
        } else {
            setError("");
            if (!loading) {
                setShouldFetch(true);
                setLoading(true);
            }
        }
    };

    const handleDataFetched = (data: string) => {
        setRoastContent(data);
        setShouldFetch(false);
        setLoading(false);
        setRequestCount(prevCount => prevCount + 1);
        
    };

    const handleError = (error: string) => {
        setError(error);
        setRoastContent("");
        setShouldFetch(false);
        setLoading(false);
    };

    useEffect(() => {
        const fetchGitHubData = async () => {
            try {
                const serverUri = process.env.NEXT_PUBLIC_SERVER_URI;
                if (!serverUri) {
                    throw new Error("Server URI is not defined");
                }

                const response = await fetch(`${serverUri}${githubUsername}`, {
                    method: "GET",
                    headers: {
                        'socketId': socketId
                    }
                });

                if (!response.ok) {
                    if (response.status === 400) {
                        const errorMessage = "Enter a correct GitHub username.";
                        throw new Error(errorMessage);
                    }
                    if (response.status === 503) {
                        const errorMessage = "The AI is busy...Please try again";
                        throw new Error(errorMessage);
                    } else {
                        const errorMessage = await response.text();
                        throw new Error(errorMessage || "Failed to fetch data");
                    }
                }

                const data = await response.json();
                const roastData = `${data.candidates[0].content.parts[0].text}`;
                console.log(roastData);

                handleDataFetched(roastData);
            } catch (error: any) {
                handleError("Enter the correct Username");
                toast.error(error.message);
            }
        };

        if (shouldFetch) {
            fetchGitHubData();
        }
    }, [shouldFetch, githubUsername, socketId]);

    const typingEffectText = useTypingEffect(roastContent, 100);

    useEffect(() => {
        if (socket) {
            socket.on("connect", () => {
                console.log("Connected to socket server");
                console.log(socket.id);
                setSocketId(socket.id as string);
            });

            socket.on("disconnect", () => {
                console.log("Disconnected from socket server");
                setSocketId("");
            });

            socket.on("githubData", (data) => {
                console.log("Received githubData:", data);
                setGithubData(data);
                if (requestCount <= 2) {
                    setIsModalOpen(true);
                }
            
            });

            return () => {
                socket.off("connect");
                socket.off("disconnect");
            };
        }
    }, [socket, requestCount]);

    return (
        <div className={`w-full overflow-auto font-Cardo ${theme === "dark" ? "dark" : ""}`}>
            <button
                className="fixed top-4 left-4 text-white font-bold flex items-center"
                onClick={() => setOpen(false)}
            >
                <TiArrowBackOutline size={25} className="dark:text-custom-color-2 text-black" />
            </button>
            <div className="w-full h-screen flex items-center justify-center overflow-auto dark:bg-black">
                <div className="w-[87%] bg-white bg-opacity-15 top-8 rounded-3xl h-[90%] flex flex-col items-center justify-center dark:bg-opacity-10">
                    <div className={`w-full ${roastContent ? 'mt-1 flex-col items-center' : 'flex justify-center items-center h-full'}`}>
                        <div className="2xl:w-[35%] xl:w-[50%] lg:w-[60%] md:w-[80%] sm:w-[95%] 2xl:mx-[32%] xl:mx-[25%] lg:mx-[20%] md:mx-[10%] sm:mx-[2%] flex-1 flex-col items-center">
                            <h2 className="mb-2 font-semibold text-center text-gray-900 dark:bg-gradient-to-r from-custom-color-1 via-custom-color-3 to-custom-color-2 dark:bg-clip-text dark:text-transparent">Your GitHub Username:</h2>
                            <input 
                                type="text" 
                                className="bg-slate-400 rounded-full mb-4 border-slate-400 text-gray-900 w-full p-2.5 placeholder-gray-800 placeholder-opacity-50 text-center dark:bg-gradient-to-r from-custom-color-1 via-custom-color-3 to-custom-color-2" 
                                placeholder="Octocat.." 
                                value={githubUsername}
                                onChange={(e) => setGithubUsername(e.target.value)}
                                required 
                                disabled={loading}
                            />
                            {error && <p className="text-red-500">{error}</p>}
                            <div className="flex justify-evenly">
                                <button 
                                    className="hover:bg-black mb-5 -mt-1 bg-gray-700 text-white font-bold py-2 px-4 rounded-full flex items-center" 
                                    onClick={handleRoastClick}
                                    disabled={loading}
                                >
                                    <p className="text-yellow-300">git&nbsp;</p> roast <FaArrowRight className="ml-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                    {roastContent && (
                        <div 
                            ref={containerRef}
                            className="mb-5 p-4 h-[66%] w-[95%] bg-white bg-opacity-20 rounded-3xl overflow-y-auto scrollbar-none scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:bg-opacity-10 dark:text-slate-200">
                            <p className="m-2 whitespace-pre-wrap">{typingEffectText.map((text, index) => (
                                <React.Fragment key={index}>{text}</React.Fragment>
                            ))}</p>
                        </div>
                    )}
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} data={githubData} />
            
        </div>
    );
};

export default Roasting;
