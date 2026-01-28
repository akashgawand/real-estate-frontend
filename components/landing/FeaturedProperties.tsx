"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  BedDouble,
  Bath,
  Square,
  ArrowUpRight,
  Heart,
} from "lucide-react";

// Accent color for consistent branding (Amber/Gold)
const ACCENT_COLOR = "#F59E0B";

interface Property {
  id: number;
  title: string;
  description?: string;
  price: number;
  location: string;
  imageUrl: string;
  propertyType: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
}

interface FeaturedPropertiesProps {
  properties: Property[];
}

const PropertyCard: React.FC<{ property: Property; index: number }> = ({
  property,
  index,
}) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0, // Clean look (no cents)
    }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group h-full"
    >
      {/* CARD: White background, removed border, soft shadow */}
      <div className="h-full flex flex-col bg-white rounded-xl overflow-hidden transition-all duration-300 hover:shadow-2xl shadow-sm border border-transparent hover:border-gray-100">
        {/* IMAGE SECTION */}
        <div className="relative h-80 overflow-hidden">
          {/* Badge: Minimalist Glass Pill */}
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-900 shadow-sm border border-white/20">
              {property.propertyType}
            </span>
          </div>

          {/* Like Button */}
          <button className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center bg-white/90 backdrop-blur-md rounded-full text-gray-400 hover:text-red-500 transition-colors shadow-sm border border-white/20">
            <Heart className="w-4 h-4" />
          </button>

          <img
            src={property.imageUrl}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Hover Overlay - Subtle Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-300" />

          {/* Price Tag (Overlapping Image) */}
          <div className="absolute bottom-4 left-4 text-white">
            <span className="text-xl md:text-2xl font-serif tracking-tight">
              {formatPrice(property.price)}
            </span>
          </div>
        </div>

        {/* CONTENT SECTION */}
        <div className="p-6 flex flex-col flex-grow relative">
          {/* Title & Location */}
          <div className="mb-6">
            <div className="flex justify-between items-start mb-1">
              <h3 className="text-lg font-serif text-gray-900 line-clamp-1 group-hover:text-[#F59E0B] transition-colors cursor-pointer">
                {property.title}
              </h3>
              <span className="text-[#F59E0B] opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                <ArrowUpRight className="w-5 h-5" />
              </span>
            </div>

            <div className="flex items-center text-gray-500 text-xs font-medium uppercase tracking-wide mt-1">
              <MapPin className="w-3 h-3 mr-1 text-gray-400" />
              <span className="line-clamp-1">{property.location}</span>
            </div>
          </div>

          {/* DIVIDER */}
          <div className="w-full h-px bg-gray-100 mb-4 mt-auto"></div>

          {/* TECH SPECS: Minimalist Row */}
          <div className="flex items-center justify-between text-gray-500 text-xs font-medium uppercase tracking-wide">
            <div className="flex items-center gap-2">
              <BedDouble className="w-4 h-4 text-gray-400" />
              <span>
                {property.bedrooms} <span className="text-gray-400">Beds</span>
              </span>
            </div>
            <div className="w-px h-3 bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <Bath className="w-4 h-4 text-gray-400" />
              <span>
                {property.bathrooms}{" "}
                <span className="text-gray-400">Baths</span>
              </span>
            </div>
            <div className="w-px h-3 bg-gray-200"></div>
            <div className="flex items-center gap-2">
              <Square className="w-4 h-4 text-gray-400" />
              <span>
                {property.area} <span className="text-gray-400">SqFt</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({
  properties,
}) => {
  if (!properties || properties.length === 0) return null;

  return (
    // Background: Clean Light Gray
    <section id="featured" className="py-24 bg-[#F9FAFB]">
      <div className="container mx-auto px-6 max-w-7xl">
        {/* SECTION HEADER: Clean & Editorial */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <span className="text-[#F59E0B] font-bold tracking-widest uppercase text-xs mb-3 block">
              Exclusive Inventory
            </span>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-4 leading-tight">
              Featured Properties
            </h2>
            <p className="text-lg text-gray-500 font-light leading-relaxed max-w-lg">
              Handpicked selection of premium properties, curated for modern
              living standards and investment potential.
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="hidden md:flex items-center gap-3 px-8 py-3 bg-white border border-gray-200 text-gray-900 hover:border-gray-900 transition-all text-xs font-bold uppercase tracking-widest shadow-sm hover:shadow-md"
          >
            View All <ArrowUpRight className="w-4 h-4" />
          </motion.button>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <PropertyCard key={property.id} property={property} index={index} />
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="mt-12 flex justify-center md:hidden">
          <button className="flex items-center gap-2 px-8 py-4 bg-gray-900 text-white font-bold uppercase tracking-wider text-xs shadow-lg w-full justify-center">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
