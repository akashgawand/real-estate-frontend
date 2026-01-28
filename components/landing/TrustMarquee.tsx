"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@/lib/api";

interface TrustPartner {
  id: number;
  name: string;
  logoUrl?: string;
  isTextBased: boolean;
  order: number;
}

interface MarqueeSettings {
  isEnabled: boolean;
  speed: number;
}

const TrustMarquee: React.FC = () => {
  const [partners, setPartners] = useState<TrustPartner[]>([]);
  const [settings, setSettings] = useState<MarqueeSettings>({
    isEnabled: true,
    speed: 30, // Slower speed for elegance
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [partnersRes, settingsRes] = await Promise.all([
        api.get("/trust-partners"),
        api.get("/marquee"),
      ]);
      setPartners(partnersRes.data);
      if (settingsRes.data) {
        setSettings(settingsRes.data);
      }
    } catch (error) {
      console.error("Failed to fetch trust partners:", error);
    }
  };

  if (!partners.length) return null;

  // Duplicate items enough times to ensure smooth scrolling on wide screens
  // We create a "track" that is long enough to never show a gap
  const marqueeContent = [...partners, ...partners, ...partners, ...partners];

  return (
    <section className="py-20 bg-white border-b border-gray-100 overflow-hidden">
      <div className="container mx-auto px-6 mb-12 text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em]"
        >
          Trusted by Industry Leaders
        </motion.p>
      </div>

      <div className="relative flex overflow-hidden group">
        {/* Gradients to fade edges */}
        <div className="absolute top-0 bottom-0 left-0 w-24 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />

        {/* The Moving Track */}
        <motion.div
          className="flex items-center gap-24" // Generous gap
          animate={{
            x: ["0%", "-50%"], // Move half the length of the duplicated array
          }}
          transition={{
            duration: settings.speed, // Slower is better for luxury
            repeat: Infinity,
            ease: "linear",
          }}
          // Pause on hover for accessibility/inspection
          whileHover={{ animationPlayState: "paused" }}
        >
          {marqueeContent.map((partner, index) => (
            <div
              key={`${partner.id}-${index}`}
              className="flex-shrink-0 flex items-center justify-center grayscale opacity-40 hover:opacity-100 hover:grayscale-0 transition-all duration-500 cursor-default"
            >
              {partner.isTextBased ? (
                <span className="text-2xl font-serif text-gray-900 font-medium whitespace-nowrap">
                  {partner.name}
                </span>
              ) : partner.logoUrl ? (
                <img
                  src={partner.logoUrl}
                  alt={partner.name}
                  className="h-10 w-auto object-contain max-w-[150px]"
                />
              ) : null}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustMarquee;
