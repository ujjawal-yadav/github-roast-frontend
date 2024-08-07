'use client'
import React, { FC } from "react";
import { FaArrowRight, FaLinkedin, FaGithubSquare } from "react-icons/fa";
import { ThemeSwitcher } from "../utils/themeSwitcher";

type Props = {
    open: boolean;
    setOpen: (open: boolean) => void;
    theme: string;
    setTheme: (theme: string) => void;
};

const Landing: FC<Props> = ({ open, setOpen, theme, setTheme }) => {
    const handleFindOutClick = () => {
        setOpen(true);
    };

    return (
        <div className={`w-full h-screen flex flex-col transition-transform ${open ? 'translate-x-full' : 'translate-x-0'} ${theme === 'dark' ? 'dark' : ''}`}>
            <div className="flex-grow dark:bg-black flex flex-col">
                <div className="absolute top-4 right-2">
                    <ThemeSwitcher theme={theme} setTheme={setTheme} />
                </div>
                <div className="flex-grow flex flex-col items-center px-4 sm:px-6 lg:px-8 dark:text-custom-color-1">
                    <div className="pt-10 w-full flex flex-col items-center">
                        <h1 className="text-4xl sm:text-5xl md:text-6xl font-Cardo text-center dark:bg-gradient-to-r from-custom-color-1 via-custom-color-3 to-custom-color-2 dark:bg-clip-text dark:text-transparent">
                            How Bad Is Your
                        </h1>
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-Cardo text-center mt-5 dark:bg-gradient-to-r from-custom-color-1 via-custom-color-3 to-custom-color-2 dark:bg-clip-text dark:text-transparent">
                            Github?
                        </h1>
                        <h1 className="text-lg sm:text-xl md:text-2xl font-Cardo text-center mt-5 dark:bg-gradient-to-r from-custom-color-1 via-custom-color-3 to-custom-color-2 dark:bg-clip-text dark:text-transparent">
                            Our sophisticated A.I. judges your
                        </h1> 
                         <h1 className="text-lg sm:text-xl md:text-2xl font-Cardo text-center dark:bg-gradient-to-r from-custom-color-1 via-custom-color-3 to-custom-color-2 dark:bg-clip-text dark:text-transparent">
                            Github Profile
                        </h1>
                        <button onClick={handleFindOutClick} className="bg-gray-900 hover:bg-black text-white font-bold py-2 px-6 mt-5 rounded-full flex items-center">
                            Find out <FaArrowRight className="ml-2" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="bg-[#060B1E] w-full py-2 flex font-Cardo flex-col items-center justify-center dark:bg-gray-900">
                <div className="w-full max-w-[80%] text-white text-base font-semibold text-center">
                    Contact me 
                </div>
                <div className="max-w-[60%] h-10 flex flex-row items-center gap-12 items text-center  mt-2">
                    <a href="https://www.linkedin.com/in/ujjawal-yadav-1425531b4/" target="_blank" rel="noopener noreferrer" className="mr-2">
                        <FaLinkedin size={20} color="white" />
                    </a>
                    <a href="https://github.com/ujjawal-yadav" target="_blank" rel="noopener noreferrer" className="ml-2">
                        <FaGithubSquare size={20} color="white" />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default Landing;
