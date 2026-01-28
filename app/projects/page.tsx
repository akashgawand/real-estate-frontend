"use client";

import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import Button from "@/components/ui/Button";

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

function ProjectsContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [caseStudies, setCaseStudies] = useState<CaseStudy[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Get page from URL query param, default to 1
  const currentPage = Number(searchParams.get("page")) || 1;
  const LIMIT = 6; // Items per page

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
    <main className="min-h-screen bg-gray-50 pt-24 pb-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-light text-gray-900 mb-6">
            Our Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light">
            Explore our comprehensive portfolio of residential, commercial, and
            land developments.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <>
            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {caseStudies.map((study, index) => (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="group bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={study.imageUrl}
                      alt={study.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-bold uppercase tracking-wider text-gray-900">
                      {study.category}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-serif font-light text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
                          {study.title}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {study.location}
                        </p>
                      </div>
                      <span className="text-sm font-medium text-gray-400 border border-gray-200 px-2 py-1 rounded">
                        {study.year}
                      </span>
                    </div>

                    <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">
                      {study.description}
                    </p>

                    <div className="flex items-center gap-4 text-sm text-gray-500 pt-6 border-t border-gray-100">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                          study.status === "Completed"
                            ? "bg-green-100 text-green-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {study.status}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            {pagination && pagination.totalPages > 1 && (
              <div className="flex justify-center items-center gap-4">
                <button
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page === 1}
                  className={`p-4 rounded-full border border-gray-200 transition-all ${
                    pagination.page === 1
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900"
                  }`}
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="font-serif text-lg text-gray-500">
                  Page{" "}
                  <span className="text-gray-900 font-medium">
                    {pagination.page}
                  </span>{" "}
                  of {pagination.totalPages}
                </div>

                <button
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page === pagination.totalPages}
                  className={`p-4 rounded-full border border-gray-200 transition-all ${
                    pagination.page === pagination.totalPages
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-900 hover:bg-gray-900 hover:text-white hover:border-gray-900"
                  }`}
                >
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            )}

            {/* Empty State */}
            {caseStudies.length === 0 && (
              <div className="text-center py-24 text-gray-500">
                No projects found.
              </div>
            )}
          </>
        )}

        {/* Back to Home CTA */}
        <div className="text-center mt-24">
          <a
            href="/"
            className="inline-flex items-center text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProjectsContent />
    </Suspense>
  );
}
