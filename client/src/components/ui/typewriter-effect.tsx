"use client";
import { useEffect } from "react";
import { motion, stagger, useAnimate } from "framer-motion";

export const TypewriterEffect = ({
  words,
  className,
}: {
  words: {
    text: string;
    className?: string;
  }[];
  className?: string;
}) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
      },
      {
        duration: 2,
        delay: stagger(0.2),
      }
    );
  }, [animate]);

  const renderWords = words.map((word, idx) => {
    return (
      <motion.span
        initial={{
          opacity: 0,
        }}
        key={`${word.text}-${idx}`}
        className={word.className}
      >
        {word.text}&nbsp;
      </motion.span>
    );
  });

  return (
    <div className={className}>
      <div className="mt-4">
        <div className="text-4xl md:text-6xl font-bold text-center" ref={scope}>
          {renderWords}
        </div>
      </div>
    </div>
  );
};
