"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import api from "@/lib/api";

interface CaseStudy {
  id: number;
  title: string;
  location: string;
  category: string;
  description: string;
  imageUrl: string;
  year: number;
  status: string;
}

// Custom easing for that "luxury" slow-settle feel
const transitionSettings = {
  duration: 0.8,
  ease: [0.32, 0.72, 0, 1],
};

export default function PreviousWork() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        const response = await api.get("/case-studies?limit=5");
        setCaseStudies(response.data.data);
      } catch (error) {
        console.error("Failed to fetch case studies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCaseStudies();
  }, []);

  return (
    <section className="py-24 bg-white text-black overflow-hidden relative">
      <div className="container mx-auto px-6 max-w-[1400px]">
        {/* Header */}
        <header className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/10 pb-8">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="block text-xs font-medium tracking-[0.2em] uppercase text-black/40 mb-4"
            >
              Selected Works
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-serif font-light leading-[0.9]"
            >
              Architectural <br />
              <span className="text-black/40 italic">Perspectives</span>
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="hidden md:block text-right"
          >
            <p className="text-sm text-black/40 max-w-xs leading-relaxed">
              Curated selection of spatial transformations and recent
              developments.
            </p>
          </motion.div>
        </header>

        {/* Desktop: Premium Horizontal Rail */}
        <div className="hidden md:flex gap-0 h-[70vh] min-h-[600px] w-full border-l border-white/10">
          {isLoading
            ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-white/5 animate-pulse border-r border-white/10"
                />
              ))
            : caseStudies.map((study, index) => {
                const isHovered = hoveredIndex === index;
                const isSomeoneHovered = hoveredIndex !== null;

                // If someone is hovered, non-hovered items shrink.
                // If no one is hovered, everyone is equal (1).
                const flexValue = isHovered ? 3.5 : isSomeoneHovered ? 0.5 : 1;

                return (
                  <motion.div
                    key={study.id}
                    className="relative overflow-hidden cursor-pointer border-r border-white/10 group"
                    style={{ flexGrow: flexValue }} // Use style for better performance than animate prop for layout
                    animate={{ flexGrow: flexValue }}
                    transition={transitionSettings}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Background Image with Noir Effect */}
                    <div className="absolute inset-0 w-full h-full">
                      <motion.div
                        className="absolute inset-0 bg-black z-10"
                        animate={{ opacity: isHovered ? 0 : 0.4 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.img
                        src={study.imageUrl}
                        alt={study.title}
                        className="w-full h-full object-cover"
                        // Slight grayscale by default, color on hover. Slight zoom pan.
                        animate={{
                          scale: isHovered ? 1.1 : 1,
                          filter: isHovered
                            ? "grayscale(0%) contrast(100%)"
                            : "grayscale(0%) contrast(120%)",
                        }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                      />
                    </div>

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 z-20" />

                    {/* Index Number (Top Left) */}
                    <div className="absolute top-8 left-8 z-30 overflow-hidden">
                      <motion.span
                        className="block text-xs font-mono text-white/50"
                        animate={{ y: isHovered ? -20 : 0 }}
                        transition={transitionSettings}
                      >
                        0{index + 1}
                      </motion.span>
                    </div>

                    {/* Vertical Text (Visible when NOT hovered) */}
                    <motion.div
                      className="absolute bottom-8 left-8 z-30 origin-bottom-left"
                      animate={{
                        opacity: isHovered ? 0 : 1,
                        rotate: -90,
                        x: isHovered ? -20 : 0,
                      }}
                      transition={transitionSettings}
                    >
                      <span className="text-sm font-medium tracking-[0.2em] uppercase text-white/60 whitespace-nowrap">
                        {study.category}
                      </span>
                    </motion.div>

                    {/* Content Overlay (Visible ONLY when hovered) */}
                    <div className="absolute bottom-0 left-0 w-full p-8 z-30 flex flex-col justify-end h-full">
                      <motion.div
                        initial={false}
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          y: isHovered ? 0 : 40,
                        }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        className="space-y-4"
                      >
                        {/* Status Pill */}
                        {study.status === "Ongoing" && (
                          <span className="inline-block px-2 py-1 bg-white text-black text-[10px] font-bold uppercase tracking-wider mb-2">
                            Work in Progress
                          </span>
                        )}

                        <div className="overflow-hidden">
                          <h3 className="text-4xl font-serif text-white mb-2 leading-tight">
                            {study.title}
                          </h3>
                        </div>

                        <div className="flex items-center gap-6 text-xs font-mono text-white/60 uppercase tracking-wider border-t border-white/20 pt-4">
                          <span>{study.year}</span>
                          <span>—</span>
                          <span>{study.location}</span>
                        </div>

                        <p className="text-sm text-white/70 leading-relaxed max-w-md line-clamp-3">
                          {study.description}
                        </p>

                        <div className="pt-4">
                          <button className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] hover:text-white/70 transition-colors">
                            View Case Study <ArrowUpRight size={14} />
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
        </div>

        {/* Mobile: Elegant Stack (Non-interactive) */}
        <div className="md:hidden space-y-1">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-64 bg-white/10 animate-pulse" />
              ))
            : caseStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="relative h-[500px] overflow-hidden group"
                >
                  <img
                    src={study.imageUrl}
                    alt={study.title}
                    className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/50 mb-2 block">
                      0{index + 1} / {study.category}
                    </span>
                    <h3 className="text-3xl font-serif text-white mb-2">
                      {study.title}
                    </h3>
                    <p className="text-xs text-white/60 line-clamp-2">
                      {study.description}
                    </p>
                  </div>
                </motion.div>
              ))}
        </div>

        {/* Footer Link */}
        <div className="mt-16 text-center">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white/5 hover:bg-white text-white hover:text-black transition-colors duration-500"
          >
            <span className="text-xs font-medium tracking-[0.2em] uppercase">
              Browse Full Archive
            </span>
            <ArrowUpRight size={14} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}
