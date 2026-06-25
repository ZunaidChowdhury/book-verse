"use client";

import React, { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    zIndex: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    zIndex: 0,
  }),
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
  return Math.abs(offset) * velocity;
};

export default function Slider({ slides, isDarkMode }) {
  const [[page, direction], setPage] = useState([0, 0]);

  // Prevent crashes if slides array is unpopulated or empty
  if (!slides || slides.length === 0) {
    return null;
  }

  const slideIndex = ((page % slides.length) + slides.length) % slides.length;

  const paginate = useCallback((newDirection) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  // Slider timing mechanism: changes page targets every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 7000);
    return () => clearInterval(timer);
  }, [paginate]);

  const ActiveSlide = slides[slideIndex];

  return (
    <div className={`relative w-full min-h-[calc(100vh-5rem)] overflow-hidden transition-colors duration-300 ${isDarkMode ? "bg-theme-background" : "bg-foreground"
      }`}>
      {/* Slider Core Stage View */}
      <div className="relative w-full min-h-[calc(100vh-5rem)] flex items-center">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={page}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.25 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute inset-0 w-full h-full"
          >
            {/* Inject active contextual props downward into slides dynamically */}
            <ActiveSlide isDarkMode={isDarkMode} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrow Elements Container */}
      <div className="absolute bottom-6 tablet:bottom-auto tablet:top-1/2 tablet:-translate-y-1/2 left-4 right-4 tablet:left-6 tablet:right-6 desktop:left-8 desktop:right-8 z-20 flex justify-between tablet:block pointer-events-none">

        {/* Left Navigation Arrow */}
        <button
          onClick={() => paginate(-1)}
          className={`w-10 h-10 tablet:w-12 tablet:h-12 rounded-full border transition-all duration-300 flex items-center justify-center backdrop-blur-md cursor-pointer group pointer-events-auto active:scale-95 focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] tablet:absolute tablet:left-0 tablet:-translate-y-1/2 ${isDarkMode
              ? "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-theme-primary/50 hover:shadow-[0_0_15px_rgba(78,103,252,0.3)]"
              : "bg-black/5 border-black/10 text-text-primary hover:bg-black/10 hover:border-theme-primary/50 hover:shadow-[0_0_15px_rgba(78,103,252,0.15)]"
            }`}
          aria-label="Previous Slide"
        >
          <FiChevronLeft className="w-5 h-5 tablet:w-6 tablet:h-6 transition-transform group-hover:-translate-x-0.5" />
        </button>

        {/* Right Navigation Arrow */}
        <button
          onClick={() => paginate(1)}
          className={`w-10 h-10 tablet:w-12 tablet:h-12 rounded-full border transition-all duration-300 flex items-center justify-center backdrop-blur-md cursor-pointer group pointer-events-auto active:scale-95 focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] tablet:absolute tablet:right-0 tablet:-translate-y-1/2 ${isDarkMode
              ? "bg-white/5 border-white/10 text-white hover:bg-white/10 hover:border-theme-primary/50 hover:shadow-[0_0_15px_rgba(78,103,252,0.3)]"
              : "bg-black/5 border-black/10 text-text-primary hover:bg-black/10 hover:border-theme-primary/50 hover:shadow-[0_0_15px_rgba(78,103,252,0.15)]"
            }`}
          aria-label="Next Slide"
        >
          <FiChevronRight className="w-5 h-5 tablet:w-6 tablet:h-6 transition-transform group-hover:translate-x-0.5" />
        </button>

      </div>

      {/* Horizontal Indicator Dots Row */}
      <div className="absolute bottom-18 tablet:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 tablet:gap-2.5 items-center justify-center">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const diff = index - slideIndex;
              if (diff !== 0) {
                setPage([page + diff, diff > 0 ? 1 : -1]);
              }
            }}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer focus-visible:outline-2 focus-visible:outline-[var(--theme-primary)] ${index === slideIndex
                ? isDarkMode
                  ? "w-8 tablet:w-10 bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]"
                  : "w-8 tablet:w-10 bg-text-primary shadow-[0_0_8px_rgba(0,0,0,0.2)]"
                : isDarkMode
                  ? "w-4 tablet:w-5 bg-white/30 hover:bg-white/60"
                  : "w-4 tablet:w-5 bg-text-primary/20 hover:bg-text-primary/50"
              }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
