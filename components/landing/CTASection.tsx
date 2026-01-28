"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Phone } from "lucide-react";
import api from "@/lib/api";

interface CTAContent {
  heading: string;
  subheading?: string;
  ctaText: string;
  ctaLink: string;
  whatsappNumber?: string;
  imageUrl?: string; // Ideally, your API returns an image. I'll add a fallback.
}

const CTASection: React.FC = () => {
  const [content, setContent] = useState<CTAContent | null>(null);

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const response = await api.get("/cta");
      setContent(response.data);
    } catch (error) {
      console.error("Failed to fetch CTA content:", error);
    }
  };

  if (!content) return null;

  const handleWhatsApp = () => {
    if (content.whatsappNumber) {
      window.open(
        `https://wa.me/${content.whatsappNumber.replace(/[^0-9]/g, "")}`,
        "_blank",
      );
    }
  };

  // Fallback image if API doesn't provide one
  const bgImage =
    content.imageUrl ||
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop";

  return (
    <section className="relative w-full bg-gray-900 overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[600px]">
        {/* --- LEFT: Content Area (Dark) --- */}
        <div className="w-full lg:w-1/2 p-12 lg:p-24 flex flex-col justify-center relative z-10">
          {/* Decorative Top Line */}
          <div className="w-20 h-1 bg-[#F59E0B] mb-8"></div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-white mb-6 leading-[1.1]">
              {content.heading}
            </h2>

            {content.subheading && (
              <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-lg font-light leading-relaxed">
                {content.subheading}
              </p>
            )}

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              {/* Primary Action */}
              <button
                onClick={() => (window.location.href = content.ctaLink)}
                className="group relative px-10 py-5 bg-[#F59E0B] hover:bg-[#D97706] text-gray-900 transition-all duration-300"
              >
                <div className="flex items-center gap-3 font-bold tracking-widest uppercase text-xs">
                  {content.ctaText}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </button>

              {/* Secondary Action (WhatsApp) */}
              {content.whatsappNumber && (
                <button
                  onClick={handleWhatsApp}
                  className="group px-10 py-5 border border-gray-700 hover:border-white text-white transition-all duration-300"
                >
                  <div className="flex items-center gap-3 font-bold tracking-widest uppercase text-xs">
                    <MessageCircle className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
                    <span>WhatsApp</span>
                  </div>
                </button>
              )}
            </div>

            {/* Contact Info Footer */}
            <div className="mt-16 pt-8 border-t border-gray-800 flex items-center gap-2 text-gray-500 text-sm">
              <Phone className="w-4 h-4" />
              <span>
                Need immediate assistance? Call us at +1 (555) 000-0000
              </span>
            </div>
          </motion.div>
        </div>

        {/* --- RIGHT: Visual Area (Image) --- */}
        <div className="w-full lg:w-1/2 relative h-[400px] lg:h-auto">
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <img
              src={bgImage}
              alt="Architecture Detail"
              className="w-full h-full object-cover grayscale-[30%] hover:grayscale-0 transition-all duration-1000 ease-out"
            />

            {/* Gradient Overlay for blending on smaller screens */}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent lg:hidden" />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-transparent to-transparent hidden lg:block" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
