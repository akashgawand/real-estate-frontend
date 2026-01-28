"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import api from "@/lib/api";

// --- Types ---
interface RoiConfig {
  id: number;
  propertyType: string;
  roiPercentageMin: number;
  roiPercentageMax: number;
  imageUrl: string;
  disclaimerText?: string;
}

interface RoiResult {
  investmentAmount: number;
  years: number;
  propertyType: string;
  roiPercentageMin: number;
  roiPercentageMax: number;
  avgRoiPercentage: number;
  estimatedTotalReturn: number;
  estimatedProfit: number;
  disclaimerText?: string;
}

const ROIEstimator: React.FC = () => {
  const [configs, setConfigs] = useState<RoiConfig[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [investmentAmount, setInvestmentAmount] = useState<number>(1000000);
  const [years, setYears] = useState<number>(10);
  const [result, setResult] = useState<RoiResult | null>(null);
  const [selectedConfig, setSelectedConfig] = useState<RoiConfig | null>(null);

  // Custom Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // --- Logic ---
  useEffect(() => {
    fetchConfigs();

    // Close dropdown when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (selectedType) {
      const config = configs.find((c) => c.propertyType === selectedType);
      setSelectedConfig(config || null);
      calculateROI();
    }
  }, [selectedType, investmentAmount, years, configs]);

  const fetchConfigs = async () => {
    try {
      const response = await api.get("/roi-config");
      setConfigs(response.data);
      if (response.data.length > 0) {
        setSelectedType(response.data[0].propertyType);
      }
    } catch (error) {
      console.error("Failed to fetch ROI configs:", error);
    }
  };

  const calculateROI = async () => {
    if (!selectedType) return;
    try {
      const response = await api.post<RoiResult>("/roi-config/calculate", {
        propertyType: selectedType,
        investmentAmount,
        years,
      });
      setResult(response.data);
    } catch (error) {
      console.error("Failed to calculate ROI:", error);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleSelect = (type: string) => {
    setSelectedType(type);
    setIsDropdownOpen(false);
  };

  return (
    <section className="relative w-full h-screen bg-white text-gray-900 overflow-hidden flex items-center">
      <div className="container mx-auto px-6 md:px-12 max-w-screen-xl h-full max-h-[900px] flex items-center">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="grid lg:grid-cols-12 gap-8 lg:gap-20 w-full h-full lg:h-auto items-center"
        >
          {/* --- Left Column: Controls & Data --- */}
          <div className="lg:col-span-5 flex flex-col justify-center h-full">
            {/* Header */}
            <div className="mb-8 border-l-2 border-gray-900 pl-6">
              <h2 className="text-3xl md:text-4xl font-serif text-gray-900 tracking-tight leading-tight mb-2">
                Investment Return
              </h2>
              <p className="text-xs text-gray-500 font-medium tracking-wide">
                Indicative returns based on historical market behavior
              </p>
            </div>

            {/* Controls Container */}
            <div className="space-y-8 mb-8">
              {/* CUSTOM DROPDOWN */}
              <div className="relative" ref={dropdownRef}>
                <label className="block text-[10px] font-bold  text-gray-600   uppercase tracking-widest mb-2">
                  Asset Class
                </label>

                {/* Trigger */}
                <div
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="relative w-full border-b border-gray-300 py-2 pr-8 cursor-pointer group hover:border-gray-900 transition-colors"
                >
                  <span className="text-xl font-serif text-gray-900 select-none">
                    {selectedType || "Select Asset Type"}
                  </span>

                  {/* Chevron */}
                  <div
                    className={`absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none transition-transform duration-300 ${
                      isDropdownOpen ? "rotate-180" : ""
                    }`}
                  >
                    <svg width="10" height="6" viewBox="0 0 12 8" fill="none">
                      <path
                        d="M1 1.5L6 6.5L11 1.5"
                        stroke="#111827"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                </div>

                {/* Dropdown */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute left-0 top-full w-full z-50 bg-white shadow-xl mt-1 border border-gray-100 max-h-48 overflow-y-auto"
                    >
                      {configs.map((config) => (
                        <div
                          key={config.id}
                          onClick={() => handleSelect(config.propertyType)}
                          className={`px-4 py-3 text-lg font-serif cursor-pointer transition-colors hover:bg-gray-50 ${
                            selectedType === config.propertyType
                              ? "bg-gray-50 text-gray-900 font-medium"
                              : "text-gray-600"
                          }`}
                        >
                          {config.propertyType}
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Amount Slider */}
              <div>
                <div className="flex justify-between items-end mb-3">
                  <label className="text-[10px] font-bold  text-gray-600   uppercase tracking-widest">
                    Capital Deployment
                  </label>
                  <span className="text-lg font-serif text-gray-900">
                    {formatCurrency(investmentAmount)}
                  </span>
                </div>
                <input
                  type="range"
                  min="50000"
                  max="5000000"
                  step="50000"
                  value={investmentAmount}
                  onChange={(e) => setInvestmentAmount(Number(e.target.value))}
                  className="w-full h-[4px] bg-gray-300 appearance-none cursor-pointer focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-gray-900 [&::-webkit-slider-thumb]:rounded-full"
                />
              </div>

              {/* Duration Slider */}
              <div>
                <div className="flex justify-between items-end mb-3">
                  <label className="text-[10px] font-bold  text-gray-600   uppercase tracking-widest">
                    Investment Horizon
                  </label>
                  <span className="text-lg font-serif text-gray-900">
                    {years} Years
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(Number(e.target.value))}
                  className="w-full h-[4px] bg-gray-300 appearance-none cursor-pointer focus:outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-gray-900 [&::-webkit-slider-thumb]:rounded-full"
                />
              </div>
            </div>

            {/* Results Display */}
            <div className="border-t border-gray-300 pt-6">
              {result ? (
                <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                  {/* ROI Range */}
                  <div className="col-span-1">
                    <p className="text-[10px] font-bold  text-gray-600   uppercase tracking-widest mb-1">
                      Projected ROI
                    </p>
                    <p className="text-xl font-serif text-gray-900">
                      {result.roiPercentageMin}% – {result.roiPercentageMax}%
                    </p>
                  </div>

                  {/* Profit */}
                  <div className="col-span-1">
                    <p className="text-[10px] font-bold  text-gray-600   uppercase tracking-widest mb-1">
                      Est. Capital Gain
                    </p>
                    <p className="text-xl font-serif text-gray-900">
                      {formatCurrency(result.estimatedProfit)}
                    </p>
                  </div>

                  {/* Total Value */}
                  <div className="col-span-2 pt-2">
                    <p className="text-[10px] font-bold  text-gray-600   uppercase tracking-widest mb-1">
                      Projected Portfolio Value
                    </p>
                    <p className="text-4xl font-serif text-gray-900 tracking-tight">
                      {formatCurrency(result.estimatedTotalReturn)}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="h-32 flex items-center  text-gray-600   italic text-sm">
                  Calculations loading...
                </div>
              )}
            </div>

            {/* Disclaimer */}
            <p className="mt-6 text-[10px]  text-gray-600   leading-relaxed italic max-w-sm">
              {result?.disclaimerText ||
                selectedConfig?.disclaimerText ||
                "Figures provided are estimates based on historical performance. Consult with your financial advisor."}
            </p>
          </div>

          {/* --- Right Column: Contextual Image --- */}
          <div className="hidden lg:flex lg:col-span-7 h-full flex-col justify-center pl-10">
            <motion.div
              key={selectedConfig?.imageUrl}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              // Use h-full with max-height constraint to ensure it fits screen
              className="relative w-full h-[85vh] max-h-[800px] overflow-hidden bg-gray-200"
            >
              {selectedConfig ? (
                <img
                  src={selectedConfig.imageUrl}
                  alt={selectedConfig.propertyType}
                  className="w-full h-full object-cover grayscale-[20%] contrast-[0.95]"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
              <div className="absolute inset-0 border border-black/5 pointer-events-none" />
            </motion.div>

            <div className="mt-3 flex justify-between items-center px-1">
              <span className="text-[10px]  text-gray-600   uppercase tracking-widest">
                Fig 1.1 — {selectedConfig?.propertyType || "Asset Context"}
              </span>
              <span className="text-[10px]  text-gray-600   uppercase tracking-widest">
                Global Index
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ROIEstimator;
