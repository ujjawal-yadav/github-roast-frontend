import { useEffect, useState } from 'react';

const useTypingEffect = (text: string, speed: number, onComplete?: () => void) => {
    const [displayedText, setDisplayedText] = useState("");

    useEffect(() => {
        let index = 0;
        const intervalId = setInterval(() => {
            setDisplayedText((prev) => prev + text[index]);
            index++;
            if (index === text.length) {
                clearInterval(intervalId);
                if (onComplete) {
                    onComplete();
                }
            }
        }, speed);

        return () => clearInterval(intervalId);
    }, [text, speed, onComplete]);

    return displayedText;
};

export default useTypingEffect;
