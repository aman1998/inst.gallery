import React from "react";
import { motion } from "framer-motion";

interface Props {
  className?: string;
  text: string;
}
const AnimatedText: React.FC<Props> = ({ text, className }) => {
  const letters = Array.from(text);

  // Анимационные настройки для каждой буквы
  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: i * 0.1 },
    }),
  };

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", damping: 12 } },
  };

  return (
    <motion.div className={className} variants={container} initial="hidden" animate="visible">
      {letters.map((letter, index) => (
        <motion.span key={index} variants={child}>
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
