import { useState, useEffect } from "react";

const firstLineStyle = { fontSize: '16px' }; // Define outside of component

const useTypingEffect = (text: string, delay: number) => {
    const [displayedText, setDisplayedText] = useState<React.ReactNode[]>([]);

    useEffect(() => {
        let isMounted = true;
        let currentText: React.ReactNode[] = [];
        let index = 0;
        let isFirstParagraph = true; // Track if we are in the first paragraph

        // Adjust regex to properly handle "" and ** sequences
        const splitRegex = /(\s+|\n|\"[^"]+\"|\*\*[^*]+\*\*)/g;
        const words = text.split(splitRegex);

        const interval = setInterval(() => {
            if (!isMounted || index >= words.length) {
                clearInterval(interval);
                return;
            }

            const word = words[index];
            let formattedWord;

            if (word.startsWith('"') && word.endsWith('"')) {
                // Bold and italicize the text inside ""
                formattedWord = <b key={index}><i>{word.slice(1, -1)}</i></b>;
            } else if (word.startsWith('*') && word.endsWith('*')) {
                // Capitalize and italicize the text inside **
                formattedWord = <i key={index}>{word.slice(1, -1)}</i>;
            } else if (word === "\n") {
                // Handle newline character
                currentText.push(<br key={index} />);
                isFirstParagraph = false; // After the first newline, we're no longer in the first paragraph
                index++;
                return;
            } else {
                // Normal word
                formattedWord = word;
            }

            if (isFirstParagraph && word !== "\n") {
                currentText.push(<span key={index} style={firstLineStyle}>{formattedWord}</span>, " ");
            } else if (formattedWord) {
                currentText.push(formattedWord, " ");
            }

            setDisplayedText([...currentText]);
            index++;
        }, delay);

        return () => {
            isMounted = false;
            clearInterval(interval);
        };
    }, [text, delay]); // `firstLineStyle` is not part of the dependency array

    return displayedText;
};

export default useTypingEffect;
