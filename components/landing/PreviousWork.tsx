"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
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

export default function PreviousWork() {
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCaseStudies = async () => {
      try {
        // Fetch specifically 4 items for the asymmetrical grid
        const response = await api.get("/case-studies?limit=4");
        setCaseStudies(response.data.data);
      } catch (error) {
        console.error("Failed to fetch case studies:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCaseStudies();
  }, []);

  // CONFIG: Restored Asymmetry (7/5 split) but reduced Heights drastically
  const getGridConfig = (index: number) => {
    const patterns = [
      // Row 1: Wide Left, Narrow Right
      { span: "md:col-span-7", height: "h-[350px]" },
      { span: "md:col-span-5", height: "h-[350px]" },
      // Row 2: Narrow Left, Wide Right
      { span: "md:col-span-5", height: "h-[350px]" },
      { span: "md:col-span-7", height: "h-[350px]" },
    ];
    return patterns[index % patterns.length];
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <header className="mb-12 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif font-light text-gray-900 mb-4"
          >
            Previous Projects
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            A selection of our recent developments and architectural
            transformations.
          </motion.p>
        </header>

        {/* The Grid: 12 Columns total */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-12">
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className={`${getGridConfig(i).span} ${getGridConfig(i).height} bg-gray-100 animate-pulse rounded-sm`}
                />
              ))
            : caseStudies.map((study, index) => {
                const { span, height } = getGridConfig(index);

                return (
                  <motion.div
                    key={study.id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`${span} ${height} group relative overflow-hidden cursor-pointer bg-gray-900 rounded-sm`}
                  >
                    {/* Image */}
                    <div className="absolute inset-0">
                      <img
                        src={study.imageUrl}
                        alt={study.title}
                        className="w-full h-full object-cover opacity-80 transition-transform duration-1000 ease-out group-hover:scale-105 group-hover:opacity-100"
                      />
                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                    </div>

                    {/* Status Badge */}
                    {study.status === "Ongoing" && (
                      <div className="absolute top-4 left-4 z-20">
                        <span className="px-2 py-1 bg-white/10 backdrop-blur-md border border-white/20 text-[10px] uppercase tracking-widest text-white">
                          {study.status}
                        </span>
                      </div>
                    )}

                    {/* Content - Compact Layout */}
                    <div className="absolute inset-0 p-6 flex flex-col justify-end z-10">
                      <div className="space-y-1">
                        {/* Meta */}
                        <div className="flex items-center gap-2 text-white/70 text-[10px] uppercase tracking-wider">
                          <span>{study.category}</span>
                          <span>•</span>
                          <span>{study.year}</span>
                        </div>

                        {/* Title - Reduced font size for compact card */}
                        <h3 className="text-2xl md:text-3xl font-serif text-white leading-tight">
                          {study.title}
                        </h3>

                        {/* Location */}
                        <div className="flex items-center gap-1 text-white/60 text-xs">
                          <MapPin size={12} />
                          <span>{study.location}</span>
                        </div>
                      </div>

                      {/* Expandable Hover Content */}
                      <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-500 ease-in-out">
                        <div className="overflow-hidden">
                          <p className="pt-3 text-white/80 text-xs leading-relaxed line-clamp-2 max-w-md">
                            {study.description}
                          </p>
                          {/* <div className="pt-3 flex items-center gap-2 text-white text-xs font-semibold uppercase tracking-widest">
                            View Project
                            <ArrowRight
                              size={14}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
        </div>

        {/* Footer Button */}
        {!isLoading && (
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <button className="group relative px-10 py-4 border border-gray-900 text-gray-900 overflow-hidden transition-colors">
              <span className="relative z-10 font-medium tracking-widest uppercase text-xs group-hover:text-white transition-colors duration-300">
                View All Projects
              </span>
              <div className="absolute inset-0 bg-gray-900 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
