"use client";

import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Phone,
  Download,
  Shield,
  Car,
  Trees,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
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

interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

const AMENITIES = [
  { icon: Shield, label: "24/7 Security" },
  { icon: Car, label: "Valet Parking" },
  { icon: Trees, label: "Private Gardens" },
];

function ProjectsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const currentPage = Number(searchParams.get("page")) || 1;
  const LIMIT = 5;

  useEffect(() => {
    fetchProjects(currentPage);
  }, [currentPage]);

  const fetchProjects = async (page: number) => {
    try {
      setIsLoading(true);
      const response = await api.get(
        `/case-studies?page=${page}&limit=${LIMIT}`,
      );
      setCaseStudies(response.data.data);
      setPagination(response.data.pagination);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    router.push(`/projects?page=${newPage}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen bg-[#FDFBF9] pb-32 font-sans text-stone-900 selection:bg-stone-200">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl pt-20">
        {/* --- EDITORIAL INTRO SECTION --- */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24 border-b border-stone-300 pb-12">
          <div className="md:col-span-7">
            <h1 className="text-4xl md:text-6xl font-serif text-stone-900 leading-tight">
              Curated <span className="italic text-stone-600">Living</span>{" "}
              <br />
              Spaces & Estates
            </h1>
          </div>
          <div className="md:col-span-5 flex flex-col justify-end">
            <p className="text-stone-700 text-base md:text-lg leading-relaxed max-w-md">
              Discover a portfolio of architecturally significant properties.
              Each development is selected for its uncompromising standards of
              design, craftsmanship, and location.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <span className="text-xs font-bold uppercase tracking-widest text-stone-900">
                {caseStudies.length} Residences Available
              </span>
              <div className="h-px w-12 bg-stone-900"></div>
            </div>
          </div>
        </div>

        {/* --- LOADING STATE --- */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-px h-16 bg-stone-200 overflow-hidden relative">
              <div className="absolute inset-0 bg-stone-900 animate-[pulse_1.5s_ease-in-out_infinite]"></div>
            </div>
            <span className="mt-6 text-xs font-bold uppercase tracking-widest text-stone-500">
              Retrieving Portfolio...
            </span>
          </div>
        ) : (
          <div className="space-y-20">
            {caseStudies.map((study, index) => (
              <motion.article
                key={study.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                  duration: 0.8,
                  ease: "easeOut",
                  delay: index * 0.1,
                }}
                // Added 'items-stretch' to ensure both columns are equal height
                className="group relative flex flex-col md:flex-row bg-white hover:shadow-xl hover:shadow-stone-200/50 transition-all duration-500 border border-transparent hover:border-stone-100 items-stretch"
              >
                {/* --- IMAGE SECTION --- */}
                {/* UPDATED SIZING LOGIC:
                    - Mobile: h-80 (Fixed height for carousel-like feel)
                    - Desktop: h-auto (Matches the text column height exactly) + min-h (prevents it looking small)
                    - Image: absolute inset-0 (Fills the wrapper perfectly)
                */}
                <div className="w-full md:w-[55%] relative overflow-hidden h-80 md:h-auto md:min-h-[500px]">
                  <div className="absolute inset-0 z-10 bg-black/5 group-hover:bg-transparent transition-colors duration-700" />

                  <img
                    src={study.imageUrl}
                    alt={study.title}
                    // 'absolute inset-0' ensures the image strictly follows the parent div size
                    className="absolute inset-0 w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-[1.5s] ease-[cubic-bezier(0.25,1,0.5,1)]"
                  />

                  {/* Status Badge */}
                  <div className="absolute top-6 left-6 z-20">
                    <span
                      className={`inline-block px-4 py-2 text-xs font-bold uppercase tracking-wider shadow-sm ${study.status === "Completed" ? "bg-stone-900 text-white" : "bg-white text-stone-900"}`}
                    >
                      {study.status}
                    </span>
                  </div>
                </div>

                {/* --- CONTENT SECTION --- */}
                <div className="w-full md:w-[45%] p-8 md:p-12 flex flex-col justify-between border-b border-r border-stone-200 md:border-t-0 md:border-l-0 md:border-r-0 border-l border-stone-200 bg-white">
                  <div>
                    {/* Header */}
                    <div className="mb-8">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="h-px w-8 bg-stone-900"></div>
                        <span className="text-xs font-bold uppercase tracking-widest text-stone-600">
                          {study.category} • Ref {study.id}
                        </span>
                      </div>

                      <h2 className="text-3xl md:text-4xl font-serif text-stone-900 mb-3 group-hover:text-stone-600 transition-colors">
                        {study.title}
                      </h2>

                      <div className="flex items-center text-stone-600 text-base font-medium">
                        <MapPin className="w-4 h-4 mr-2 text-stone-800" />
                        {study.location}
                      </div>
                    </div>

                    {/* Data Points */}
                    <div className="grid grid-cols-2 gap-8 mb-8 border-t border-b border-stone-100 py-6">
                      <div>
                        <p className="text-xs text-stone-500 font-bold uppercase tracking-widest mb-1">
                          Total Area
                        </p>
                        <p className="text-2xl font-serif text-stone-900">
                          12,500{" "}
                          <span className="text-sm font-sans text-stone-500">
                            Sq Ft
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-stone-500 font-bold uppercase tracking-widest mb-1">
                          Completion
                        </p>
                        <p className="text-2xl font-serif text-stone-900">
                          {study.year}
                        </p>
                      </div>
                    </div>

                    <p className="text-stone-600 text-base leading-7 mb-8">
                      {study.description}
                    </p>

                    {/* Amenities Strip */}
                    <div className="flex gap-8 mb-8">
                      {AMENITIES.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-stone-500 group/icon"
                          title={item.label}
                        >
                          <item.icon className="w-5 h-5 stroke-[1.5] text-stone-800" />
                          <span className="text-xs font-medium hidden lg:block">
                            {item.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-4 mt-auto">
                    <button className="h-14 border border-stone-900 bg-stone-900 text-white text-xs font-bold uppercase tracking-widest hover:bg-stone-700 transition-all duration-300 flex items-center justify-center gap-3">
                      <Phone className="w-4 h-4" />
                      Inquire
                    </button>
                    <button className="h-14 border border-stone-300 text-stone-900 text-xs font-bold uppercase tracking-widest hover:border-stone-900 hover:bg-stone-50 transition-colors flex items-center justify-center gap-3">
                      <Download className="w-4 h-4" />
                      Brochure
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}

        {/* --- CONFIDENCE / BRAND STATEMENT --- */}
        <div className="py-24 text-center max-w-3xl mx-auto">
          <div className="w-px h-16 bg-stone-900 mx-auto mb-8"></div>
          <h3 className="text-3xl md:text-4xl font-serif text-stone-900 italic mb-4">
            "Building legacies, not just structures."
          </h3>
          <p className="text-sm text-stone-600 uppercase tracking-widest font-bold">
            Trusted by over 500 premium investors
          </p>
        </div>

        {/* --- PAGINATION --- */}
        {pagination && pagination.totalPages > 1 && (
          <div className="flex justify-center border-t border-stone-300 pt-12">
            <div className="flex items-center gap-12">
              <button
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page === 1}
                className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 disabled:opacity-30 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Previous
              </button>

              <div className="font-serif text-xl text-stone-900">
                <span className="text-stone-400 mr-2 italic">Page</span>
                {pagination.page}
              </div>

              <button
                onClick={() => handlePageChange(pagination.page + 1)}
                disabled={pagination.page === pagination.totalPages}
                className="group flex items-center gap-3 text-sm font-bold uppercase tracking-widest text-stone-500 hover:text-stone-900 disabled:opacity-30 transition-colors"
              >
                Next
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        )}

        {/* Back Link */}
        <div className="mt-16 text-center">
          <a
            href="/"
            className="text-xs text-stone-500 hover:text-stone-900 uppercase tracking-[0.2em] transition-colors border-b border-transparent hover:border-stone-900 pb-1"
          >
            Return to Dashboard
          </a>
        </div>
      </div>
    </main>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-xs font-bold uppercase tracking-widest text-stone-500">
          Loading Property Data...
        </div>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
