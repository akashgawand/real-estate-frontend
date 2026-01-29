"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
  return (
    // Container needs relative and z-10 to sit ON TOP of the sticky Hero
    <div className="relative z-10 w-full min-h-screen bg-transparent  pointer-events-none md:pointer-events-auto">
      {/* Removed the scroll-linked width/border-radius animation.
         Now it is just a solid white block that covers the hero.
      */}
      <div className="mx-auto bg-white w-full min-h-screen relative">
        {/* Subtle Texture */}
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage: `url("https://www.transparenttextures.com/patterns/concrete-wall.png")`,
          }}
        />

        <div className="container mx-auto px-6 py-24 md:py-32 max-w-7xl relative z-10 pointer-events-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left Column: Typography */}
            <div>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "60px" }}
                viewport={{ once: true }}
                className="h-1 bg-gray-900 mb-8"
              />

              <motion.span
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="block text-sm font-bold tracking-[0.2em] uppercase text-gray-500 mb-6"
              >
                Who We Are
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-6xl lg:text-7xl font-serif font-light text-gray-900 leading-[1.1] mb-8"
              >
                Crafting Spaces That <br />
                <span className="italic text-gray-400">Define Excellence</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-xl text-gray-600 leading-relaxed mb-10 font-light"
              >
                With over two decades of experience in architectural development
                and construction, we transform visions into enduring landmarks.
                Every project is a testament to precision, innovation, and
                timeless design.
              </motion.p>

              <motion.a
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                href="#contact"
                className="group inline-flex items-center gap-4 text-gray-900 font-medium tracking-wide uppercase text-sm border-b border-gray-900 pb-1 hover:text-gray-600 hover:border-gray-600 transition-all"
              >
                Discover Our Story
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-2"
                />
              </motion.a>
            </div>

            {/* Right Column: Visual */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="aspect-[3/4] md:aspect-[4/5] overflow-hidden"
              >
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop"
                  alt="Interior Architecture"
                  className="w-full h-full object-cover"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute -bottom-8 -left-8 md:left-8 bg-gray-900 p-8 text-white max-w-xs shadow-2xl"
              >
                <p className="font-serif text-2xl italic leading-tight">
                  "Architecture starts when you carefully put two bricks
                  together."
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
