// components/Footer.tsx

import React from 'react';
import { FaLinkedin, FaGithubSquare } from 'react-icons/fa';

const Footer = () => {
    return (
        <section className='Footer'>
            <div className='w-full h-auto bg-[#060B1E]'>
                <div className='w-full py-8 px-[15%] flex flex-col items-center justify-center'>
                    <div className='w-[50%] h-10 text-white font-semibold text-center'>
                        My Handles
                    </div>
                    
                    <div className='w-[30%] h-10 flex flex-row items-center justify-evenly mt-2'>
                        <a href="https://www.linkedin.com/in/ujjawal-yadav-1425531b4/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={30} color="white" />
                        </a>
                        <a href="https://github.com/ujjawal-yadav" target="_blank" rel="noopener noreferrer">
                            <FaGithubSquare size={30} color="white" />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Footer;
