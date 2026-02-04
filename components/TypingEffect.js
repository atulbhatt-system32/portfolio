import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

export default function TypingEffect({ text }) {
    const [displayedText, setDisplayedText] = useState("");
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const currentText = text[index];
        let i = 0;

        // Typing animation
        const typingInterval = setInterval(() => {
            if (i <= currentText.length) {
                setDisplayedText(currentText.slice(0, i));
                i++;
            } else {
                clearInterval(typingInterval);

                // Pause before deleting
                setTimeout(() => {
                    let j = currentText.length;
                    const deletingInterval = setInterval(() => {
                        if (j >= 0) {
                            setDisplayedText(currentText.slice(0, j));
                            j--;
                        } else {
                            clearInterval(deletingInterval);
                            setIndex((prev) => (prev + 1) % text.length);
                        }
                    }, 50); // Deleting speed
                }, 2000); // Pause duration
            }
        }, 100); // Typing speed

        return () => clearInterval(typingInterval);
    }, [index, text]);

    return (
        <span className="inline-block min-h-[1.5em]">
            {displayedText}
            <motion.span
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                className="inline-block ml-1 w-0.5 h-[1em] bg-current align-middle"
            />
        </span>
    );
}
