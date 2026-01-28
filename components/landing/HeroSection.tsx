"use client";

import React from "react";
import { motion } from "framer-motion";
import Button from "../ui/Button";

// --- Icons ---
const ArrowRightIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14" />
    <path d="m12 5 7 7-7 7" />
  </svg>
);
const PlayIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="0"
  >
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

interface HeroContent {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
  bgImageUrl: string;
}

interface HeroSectionProps {
  content?: HeroContent;
}

const HeroSection: React.FC<HeroSectionProps> = ({ content }) => {
  const defaultContent = {
    headline: "Building the Future, One Project at a Time.",
    subheadline:
      "We specialize in turning your complex construction ideas into reality. Quality, integrity, and innovation in every square foot.",
    ctaText: "Start Your Project",
    ctaLink: "#contact",
    bgImageUrl:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2070&auto=format&fit=crop", // Industrial/Construction vibe
    ...content,
  };

  const handleCTAClick = () => {
    const element = document.querySelector(defaultContent.ctaLink);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-gray-900 text-white">
      {/* --- 1. Background Image with Zoom Effect --- */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 z-0"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url(${defaultContent.bgImageUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        {/* Dark Overlay for Text Readability (Gradient) */}
        <div className="absolute inset-0 bg-gradient-to-r from-gray-950/90 via-gray-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-transparent to-transparent opacity-80" />
      </motion.div>

      {/* --- 2. Main Content Layout --- */}
      <div className="relative z-10 container mx-auto px-6 h-full flex flex-col justify-center">
        <div className="max-w-4xl">
          {/* Animated Line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 bg-[var(--color-accent)] mb-8"
            style={{ backgroundColor: "#F59E0B" }} // Hardcoded yellow/amber if variable fails
          />

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-[1.1] mb-8 tracking-tight"
          >
            {defaultContent.headline}
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-2xl text-gray-300 max-w-2xl mb-12 font-light leading-relaxed"
          >
            {defaultContent.subheadline}
          </motion.p>

          {/* Buttons Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            {/* Primary CTA (High Contrast Yellow/Amber) */}
            <Button
              onClick={handleCTAClick}
              className="px-10 py-5 bg-[#F59E0B] hover:bg-[#D97706] text-black font-bold text-lg rounded-none transition-all flex items-center gap-3 shadow-[0_0_20px_rgba(245,158,11,0.3)] hover:shadow-[0_0_30px_rgba(245,158,11,0.5)]"
            >
              <span>{defaultContent.ctaText}</span>
              <ArrowRightIcon />
            </Button>

            {/* Secondary CTA (Glass) */}
            {/* <button className="group flex items-center gap-3 px-6 py-4 text-white hover:text-[#F59E0B] transition-colors">
              <div className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center group-hover:border-[#F59E0B] group-hover:bg-[#F59E0B]/10 transition-all">
                <PlayIcon />
              </div>
              <span className="font-semibold tracking-wide uppercase text-sm">
                Watch Showreel
              </span>
            </button> */}
          </motion.div>
        </div>
      </div>

      {/* --- 3. Bottom Floating Cards (Glassmorphism) --- */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="absolute bottom-0 right-0 w-full md:w-auto p-6 md:p-0"
      >
        <div className="flex flex-col md:flex-row bg-gray-900 md:bg-transparent">
          {/* Card 1 */}
          <div className="backdrop-blur-md bg-white/10 border-t md:border-t-0 md:border-l border-white/10 p-8 w-full md:w-64">
            <h3 className="text-[#F59E0B] text-4xl font-bold mb-2">25+</h3>
            <p className="text-gray-300 text-sm uppercase tracking-wider font-semibold">
              Years of Experience
            </p>
          </div>

          {/* Card 2 */}
          <div className="backdrop-blur-md bg-white/5 border-t md:border-t-0 md:border-l border-white/10 p-8 w-full md:w-64">
            <h3 className="text-white text-4xl font-bold mb-2">850</h3>
            <p className="text-gray-300 text-sm uppercase tracking-wider font-semibold">
              Projects Completed
            </p>
          </div>

          {/* Card 3 (Active State Visual) */}
          <div className="bg-[#F59E0B] p-8 w-full md:w-64 flex flex-col justify-center">
            <p className="text-black font-bold text-lg leading-tight mb-2">
              "Quality construction solutions for modern living."
            </p>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-8 h-px bg-black/50"></div>
              <span className="text-black/70 text-xs font-bold uppercase">
                Our Mission
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
