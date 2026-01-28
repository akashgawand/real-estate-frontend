"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactCompareImage from "react-compare-image";
import { ChevronLeft, ChevronRight, ArrowRight, Check } from "lucide-react";

interface BeforeAfterData {
  id: number;
  title: string;
  description?: string;
  beforeImageUrl: string;
  afterImageUrl: string;
  // Added optional fields to fill the void with details
  category?: string;
  duration?: string;
  tags?: string[];
}

interface BeforeAfterSectionProps {
  data?: BeforeAfterData | BeforeAfterData[];
}

const BeforeAfterSection: React.FC<BeforeAfterSectionProps> = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const items = Array.isArray(data) ? data : data ? [data] : [];
  const currentItem = items[currentIndex];

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024); // Changed break point to 1024 for split layout
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  if (!currentItem) return null;

  return (
    <section className="py-24 bg-[#F9FAFB] overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* --- LEFT COLUMN: Content & Details --- */}
          <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentItem.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Meta Tag */}
                {/* <div className="flex items-center gap-3 mb-6">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-widest rounded-full">
                    {currentItem.category || "Transformation"}
                  </span>
                  {currentItem.duration && (
                    <span className="text-sm text-gray-500 font-medium">
                      Duration: {currentItem.duration}
                    </span>
                  )}
                </div> */}

                {/* Title */}
                <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6 leading-tight">
                  {currentItem.title}
                </h2>

                {/* Description */}
                <p className="text-lg text-gray-600 font-light leading-relaxed mb-8 border-l-2 border-gray-200 pl-6">
                  {currentItem.description ||
                    "Witness the dramatic transformation in this project showcase."}
                </p>

                {/* Project Highlights (Fills the void) */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10">
                  <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
                    Project Highlights
                  </h4>
                  <div className="space-y-3">
                    {currentItem.tags ? (
                      currentItem.tags.map((tag, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-3 text-gray-600"
                        >
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-sm">{tag}</span>
                        </div>
                      ))
                    ) : (
                      // Fallback dummy tags if none provided
                      <>
                        <div className="flex items-center gap-3 text-gray-600">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-sm">
                            Complete structural renovation
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                          <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <Check className="w-3 h-3 text-green-600" />
                          </div>
                          <span className="text-sm">
                            Modern material upgrades
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Controls (Moved to Left Side) */}
                <div className="flex items-center gap-6">
                  <div className="flex gap-2">
                    <button
                      onClick={handlePrevious}
                      className="p-4 rounded-full border border-gray-200 bg-white text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="p-4 rounded-full border border-gray-200 bg-white text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Progress Counter */}
                  <div className="h-px flex-1 bg-gray-200 relative">
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 bg-gray-900"
                      initial={{ width: 0 }}
                      animate={{
                        width: `${((currentIndex + 1) / items.length) * 100}%`,
                      }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                  <div className="text-sm font-mono text-gray-400">
                    {String(currentIndex + 1).padStart(2, "0")} —{" "}
                    {String(items.length).padStart(2, "0")}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* --- RIGHT COLUMN: Visual Comparison --- */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <div className="relative">
              {/* Main Image Frame */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                {isMobile ? (
                  // Mobile: Side by Side comparison
                  <div className="grid h-full grid-cols-2 gap-1">
                    <div className="relative">
                      <img
                        src={currentItem.beforeImageUrl}
                        alt="Before"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-md">
                        BEFORE
                      </div>
                    </div>
                    <div className="relative">
                      <img
                        src={currentItem.afterImageUrl}
                        alt="After"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 left-2 bg-black/50 text-white text-xs font-bold px-2 py-1 rounded backdrop-blur-md">
                        AFTER
                      </div>
                    </div>
                  </div>
                ) : (
                  // Desktop: Interactive slider with minimal styling
                  <div className="relative bg-white shadow-sm border border-gray-100 overflow-hidden">
                    <ReactCompareImage
                      key={currentItem.id}
                      leftImage={currentItem.beforeImageUrl}
                      rightImage={currentItem.afterImageUrl}
                      sliderLineWidth={2}
                      sliderLineColor="#9ca3af"
                      leftImageLabel="Before"
                      rightImageLabel="After"
                      hover={true}
                    />
                  </div>
                )}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 -bottom-10 -right-10 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50" />
              <div className="absolute -z-10 -top-10 -left-10 w-64 h-64 bg-purple-100 rounded-full blur-3xl opacity-50" />
            </div>
          </div>
        </div>

        {/* --- BOTTOM: Thumbnails Navigation (Fills more space) --- */}
        {items.length > 1 && (
          <div className="mt-5 pt-10 border-t border-gray-200">
            <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x">
              {items.map((item, idx) => (
                <button
                  key={item.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`flex-shrink-0 relative w-48 aspect-video rounded-lg overflow-hidden transition-all duration-300 snap-start ${
                    idx === currentIndex
                      ? "ring-2 ring-offset-2 ring-gray-900 opacity-100 scale-105"
                      : "opacity-50 hover:opacity-80 grayscale"
                  }`}
                >
                  <img
                    src={item.afterImageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-3">
                    <span className="text-white text-xs font-medium truncate w-full text-left">
                      {item.title}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default BeforeAfterSection;
