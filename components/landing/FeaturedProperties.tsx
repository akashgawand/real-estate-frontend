"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, ArrowUpRight, Heart } from "lucide-react";

// Accent color for consistent branding (Amber/Gold)
const ACCENT_COLOR = "#F59E0B";

interface Project {
  id: number;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  projectType: string;
  status?: string;
}

interface FeaturedPropertiesProps {
  properties: Project[];
}

const ProjectCard: React.FC<{ property: Project; index: number }> = ({
  property,
  index,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      {/* CARD: Enhanced design with better shadows and borders */}
      <div className="h-full flex flex-col bg-white rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl shadow-md border border-gray-100 hover:border-[#F59E0B]/20 hover:-translate-y-1">
        {/* IMAGE SECTION - Reduced height for compact carousel */}
        <div className="relative h-48 overflow-hidden">
          {/* Badge: Enhanced Glass Morphism */}
          <div className="absolute top-3 left-3 z-10 flex gap-1.5 flex-wrap">
            <span className="px-3 py-1 bg-white/95 backdrop-blur-lg rounded-full text-[9px] font-extrabold uppercase tracking-widest text-gray-900 shadow-lg border border-white/40">
              {property.projectType}
            </span>
            {property.status && (
              <span className="px-3 py-1 bg-gradient-to-r from-[#F59E0B] to-[#D97706] backdrop-blur-lg rounded-full text-[9px] font-extrabold uppercase tracking-widest text-white shadow-lg border border-white/30">
                {property.status}
              </span>
            )}
          </div>

          {/* Like Button - Enhanced */}
          <button className="absolute top-3 right-3 z-10 w-8 h-8 flex items-center justify-center bg-white/95 backdrop-blur-lg rounded-full text-gray-400 hover:text-red-500 hover:scale-110 transition-all duration-300 shadow-lg border border-white/40">
            <Heart className="w-3.5 h-3.5" />
          </button>

          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Enhanced Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-50 group-hover:opacity-30 transition-opacity duration-500" />
        </div>

        {/* CONTENT SECTION - Compact spacing */}
        <div className="p-5 flex flex-col flex-grow relative">
          {/* Title & Location */}
          <div className="mb-3">
            <div className="flex justify-between items-start gap-2 mb-1.5">
              <h3 className="text-base font-serif font-semibold text-gray-900 line-clamp-2 leading-tight group-hover:text-[#F59E0B] transition-colors cursor-pointer">
                {property.title}
              </h3>
              <span className="text-[#F59E0B] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 flex-shrink-0">
                <ArrowUpRight className="w-4 h-4" />
              </span>
            </div>

            <div className="flex items-center text-gray-500 text-[10px] font-semibold uppercase tracking-wider mt-1.5">
              <MapPin className="w-3 h-3 mr-1 text-[#F59E0B]" />
              <span className="line-clamp-1">{property.location}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent mb-3"></div>

          {/* PROJECT DESCRIPTION - Compact */}
          <div className="flex-grow">
            <p className="text-xs text-gray-600 leading-relaxed line-clamp-2 mb-3">
              {property.description}
            </p>
          </div>

          {/* Learn More Link */}
          <div className="mt-auto pt-2">
            <button className="text-[10px] font-bold uppercase tracking-widest text-[#F59E0B] hover:text-[#D97706] transition-colors flex items-center gap-1.5 group/btn">
              <span>Learn More</span>
              <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
}) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(false);

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  React.useEffect(() => {
    checkScroll();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScroll);
      window.addEventListener("resize", checkScroll);
      return () => {
        container.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, [properties]);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!properties || properties.length === 0) return null;

  return (
    // Background: Clean Light Gray
    <section id="featured" className="py-24 bg-[#F9FAFB]">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* SECTION HEADER: Clean & Editorial */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-[#F59E0B] font-bold tracking-widest uppercase text-xs mb-3 block">
              Our Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 leading-tight">
              Ongoing Projects
            </h2>
            <p className="text-lg text-gray-500 font-light leading-relaxed max-w-lg">
              Discover our current developments and transformations, showcasing
              excellence in design and execution.
            </p>
          </motion.div>

          <Link href="/projects">
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="hidden md:flex items-center gap-3 px-8 py-3 bg-white border border-gray-200 text-gray-900 hover:border-gray-900 transition-all text-xs font-bold uppercase tracking-widest shadow-sm hover:shadow-md"
            >
              View All <ArrowUpRight className="w-4 h-4" />
            </motion.button>
          </Link>
        </div>

        {/* HORIZONTAL SCROLLING CAROUSEL */}
        <div className="relative">
          {/* Left Gradient Overlay */}
          {canScrollLeft && (
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#F9FAFB] to-transparent z-10 pointer-events-none" />
          )}

          {/* Right Gradient Overlay */}
          {canScrollRight && (
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#F9FAFB] to-transparent z-10 pointer-events-none" />
          )}

          {/* Left Scroll Button */}
          {canScrollLeft && (
            <button
              onClick={() => scroll("left")}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 border border-gray-200"
            >
              <ArrowUpRight className="w-5 h-5 rotate-180 text-gray-900" />
            </button>
          )}

          {/* Right Scroll Button */}
          {canScrollRight && (
            <button
              onClick={() => scroll("right")}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 border border-gray-200"
            >
              <ArrowUpRight className="w-5 h-5 text-gray-900" />
            </button>
          )}

          {/* Scrollable Container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {properties.map((property, index) => (
              <div
                key={property.id}
                className="flex-shrink-0 w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)]"
              >
                <ProjectCard property={property} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 flex justify-center md:hidden">
          <Link href="/projects" className="w-full">
            <button className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold uppercase tracking-wider text-xs shadow-lg w-full justify-center">
              View All Projects
            </button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default FeaturedProperties;
