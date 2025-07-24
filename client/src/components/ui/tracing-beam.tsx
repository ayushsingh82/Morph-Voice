"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useTransform, useScroll, useSpring } from "framer-motion";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);

  useEffect(() => {
    if (contentRef.current) {
      setSvgHeight(contentRef.current.offsetHeight);
    }
  }, []);

  const y1 = useSpring(
    useTransform(scrollYProgress, [0, 0.8], [50, svgHeight - 50]),
    {
      stiffness: 500,
      damping: 90,
    }
  );

  const y2 = useSpring(
    useTransform(scrollYProgress, [0, 1], [50, svgHeight - 50]),
    {
      stiffness: 500,
      damping: 90,
    }
  );

  return (
    <motion.div
      ref={ref}
      className={className}
    >
      <div ref={contentRef} className="relative w-full max-w-4xl mx-auto">
        <div className="absolute -left-20 top-3">
          <motion.div
            transition={{
              duration: 0.2,
              delay: 0.5,
            }}
            animate={{
              boxShadow:
                scrollYProgress.get() > 0
                  ? "none"
                  : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            }}
            className="ml-[27px] h-4 w-4 rounded-full border border-emerald-500 bg-white"
          />
          <svg
            viewBox={`0 0 20 ${svgHeight}`}
            width="20"
            height={svgHeight}
            className="ml-4 block"
            aria-hidden="true"
          >
            <motion.path
              d={`M 1 0V -36 l 18 24 V ${svgHeight * 0.8} l -18 24V ${svgHeight}`}
              fill="none"
              stroke="#10b981"
              strokeOpacity="0.16"
              transition={{
                duration: 10,
              }}
            />
            <motion.path
              d={`M 1 ${y1} l 18 24`}
              fill="none"
              stroke="#10b981"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transition={{
                duration: 10,
              }}
            />
            <motion.path
              d={`M 1 ${y2} l 18 24`}
              fill="none"
              stroke="#059669"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              transition={{
                duration: 10,
              }}
            />
          </svg>
        </div>
        {children}
      </div>
    </motion.div>
  );
};
