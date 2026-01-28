"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Building2, Eye, Settings as SettingsIcon } from "lucide-react";
import Card from "@/components/ui/Card";
import api from "@/lib/api";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalProperties: 0,
    featuredProperties: 0,
    visibleSections: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [propertiesRes, sectionsRes] = await Promise.all([
        api.get("/properties"),
        api.get("/sections/visible"),
      ]);

      const properties = propertiesRes.data;
      setStats({
        totalProperties: properties.length,
        featuredProperties: properties.filter((p: any) => p.isFeatured).length,
        visibleSections: sectionsRes.data.length,
      });
    } catch (error) {
      console.error("Failed to fetch dashboard stats:", error);
    }
  };

  const statCards = [
    {
      title: "Total Properties",
      value: stats.totalProperties,
      icon: Building2,
      color: "bg-blue-500",
    },
    {
      title: "Featured Properties",
      value: stats.featuredProperties,
      icon: Eye,
      color: "bg-green-500",
    },
    {
      title: "Visible Sections",
      value: stats.visibleSections,
      icon: SettingsIcon,
      color: "bg-purple-500",
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your admin panel</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <Card className="p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a
            href="/admin/properties"
            className="p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors"
          >
            <Building2 className="w-6 h-6 text-blue-600 mb-2" />
            <h3 className="font-semibold text-gray-900">Manage Properties</h3>
            <p className="text-sm text-gray-600 mt-1">
              Add, edit, or remove properties
            </p>
          </a>
          <a
            href="/"
            target="_blank"
            className="p-4 border border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors"
          >
            <Eye className="w-6 h-6 text-green-600 mb-2" />
            <h3 className="font-semibold text-gray-900">View Landing Page</h3>
            <p className="text-sm text-gray-600 mt-1">See your live website</p>
          </a>
        </div>
      </Card>
    </div>
  );
}
