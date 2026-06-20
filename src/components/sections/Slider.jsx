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

export default function Slider({ slides }) {
  const [[page, direction], setPage] = useState([0, 0]);

  // Handle case where slides is empty or undefined
  if (!slides || slides.length === 0) {
    return null;
  }

  const slideIndex = ((page % slides.length) + slides.length) % slides.length;

  const paginate = useCallback((newDirection) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  // Auto-play feature: transitions every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 7000);
    return () => clearInterval(timer);
  }, [paginate]);

  const ActiveSlide = slides[slideIndex];

  return (
    <div className="relative w-full min-h-[calc(100vh-5rem)] overflow-hidden bg-theme-background">
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
            <ActiveSlide />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Left Navigation Arrow */}
      <button
        onClick={() => paginate(-1)}
        className="absolute left-4 tablet:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-theme-primary/50 hover:shadow-[0_0_15px_rgba(78,103,252,0.3)] active:scale-95 text-white transition-all duration-300 flex items-center justify-center backdrop-blur-md cursor-pointer group"
        aria-label="Previous Slide"
      >
        <FiChevronLeft className="w-6 h-6 transition-transform group-hover:-translate-x-0.5" />
      </button>

      {/* Right Navigation Arrow */}
      <button
        onClick={() => paginate(1)}
        className="absolute right-4 tablet:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-theme-primary/50 hover:shadow-[0_0_15px_rgba(78,103,252,0.3)] active:scale-95 text-white transition-all duration-300 flex items-center justify-center backdrop-blur-md cursor-pointer group"
        aria-label="Next Slide"
      >
        <FiChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-0.5" />
      </button>

      {/* Horizontal Line Position Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2.5 items-center justify-center">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              const diff = index - slideIndex;
              if (diff !== 0) {
                setPage([page + diff, diff > 0 ? 1 : -1]);
              }
            }}
            className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
              index === slideIndex 
                ? "w-10 bg-white shadow-[0_0_8px_rgba(255,255,255,0.6)]" 
                : "w-5 bg-white/30 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
