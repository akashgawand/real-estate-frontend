"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit2, Trash2, Eye, EyeOff } from "lucide-react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Input from "@/components/ui/Input";
import api from "@/lib/api";
import { Spinner } from "@/components/ui/Loading";

interface Property {
  id: number;
  title: string;
  description?: string;
  price: number;
  location: string;
  imageUrl: string;
  isFeatured: boolean;
  propertyType: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    imageUrl: "",
    propertyType: "Building",
    bedrooms: "",
    bathrooms: "",
    area: "",
    isFeatured: false,
  });

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await api.get("/properties");
      setProperties(response.data);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingProperty(null);
    setFormData({
      title: "",
      description: "",
      price: "",
      location: "",
      imageUrl: "",
      propertyType: "Building",
      bedrooms: "",
      bathrooms: "",
      area: "",
      isFeatured: false,
    });
    setIsModalOpen(true);
  };

  const handleEdit = (property: Property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      description: property.description || "",
      price: property.price.toString(),
      location: property.location,
      imageUrl: property.imageUrl,
      propertyType: property.propertyType,
      bedrooms: property.bedrooms?.toString() || "",
      bathrooms: property.bathrooms?.toString() || "",
      area: property.area?.toString() || "",
      isFeatured: property.isFeatured,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      title: formData.title,
      description: formData.description || null,
      price: parseFloat(formData.price),
      location: formData.location,
      imageUrl: formData.imageUrl,
      propertyType: formData.propertyType,
      bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
      bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
      area: formData.area ? parseFloat(formData.area) : null,
      isFeatured: formData.isFeatured,
    };

    try {
      if (editingProperty) {
        await api.put(`/properties/${editingProperty.id}`, payload);
      } else {
        await api.post("/properties", payload);
      }
      setIsModalOpen(false);
      fetchProperties();
    } catch (error) {
      console.error("Failed to save property:", error);
      alert("Failed to save property");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this property?")) return;

    try {
      await api.delete(`/properties/${id}`);
      fetchProperties();
    } catch (error) {
      console.error("Failed to delete property:", error);
      alert("Failed to delete property");
    }
  };

  const toggleFeatured = async (property: Property) => {
    try {
      await api.put(`/properties/${property.id}`, {
        ...property,
        isFeatured: !property.isFeatured,
      });
      fetchProperties();
    } catch (error) {
      console.error("Failed to toggle featured:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
          <p className="text-gray-600 mt-2">Manage your property listings</p>
        </div>
        <Button onClick={handleCreate}>
          <Plus className="w-5 h-5 mr-2" />
          Add Property
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <Card key={property.id} className="overflow-hidden">
            <div className="relative h-48">
              <img
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              {property.isFeatured && (
                <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-semibold">
                  Featured
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2">{property.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{property.location}</p>
              <p className="text-blue-600 font-bold text-xl mb-4">
                ${property.price.toLocaleString()}
              </p>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toggleFeatured(property)}
                  className="flex-1"
                >
                  {property.isFeatured ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => handleEdit(property)}
                  className="flex-1"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(property.id)}
                  className="flex-1 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProperty ? "Edit Property" : "Add Property"}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Title"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            required
          />
          <Input
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
          />
          <Input
            label="Price"
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            required
          />
          <Input
            label="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            required
          />
          <Input
            label="Image URL"
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            helperText="Use image upload feature or paste URL"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Bedrooms"
              type="number"
              value={formData.bedrooms}
              onChange={(e) =>
                setFormData({ ...formData, bedrooms: e.target.value })
              }
            />
            <Input
              label="Bathrooms"
              type="number"
              value={formData.bathrooms}
              onChange={(e) =>
                setFormData({ ...formData, bathrooms: e.target.value })
              }
            />
          </div>
          <Input
            label="Area (sq ft)"
            type="number"
            value={formData.area}
            onChange={(e) => setFormData({ ...formData, area: e.target.value })}
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              id="featured"
              checked={formData.isFeatured}
              onChange={(e) =>
                setFormData({ ...formData, isFeatured: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 rounded"
            />
            <label htmlFor="featured" className="ml-2 text-sm text-gray-700">
              Feature this property on landing page
            </label>
          </div>
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              {editingProperty ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
