"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Upload,
  Link as LinkIcon,
  X,
  Loader2,
  AlertCircle,
  CheckCircle,
  ImageOff,
} from "lucide-react";

export interface GalleryItemData {
  id: string;
  title: string;
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  category: string;
  programmeId?: string;
  createdAt?: string;
}

const CATEGORIES = [
  "Education",
  "Healthcare",
  "Food Assistance",
  "Children's Welfare",
  "Community",
  "Livelihood & Skills",
  "Emergency Relief",
  "General",
];

const PROGRAMMES = [
  { id: "education-for-all", label: "Education for All" },
  { id: "healthcare-and-wellbeing", label: "Healthcare & Wellbeing" },
  { id: "food-and-essential-assistance", label: "Food & Essential Assistance" },
  { id: "childrens-welfare", label: "Children's Welfare" },
  { id: "community-development", label: "Community Development" },
  { id: "livelihood-and-skills-development", label: "Livelihood & Skills Development" },
  { id: "emergency-and-disaster-relief", label: "Emergency & Disaster Relief" },
];

export function GalleryManager({ onStatsChange }: { onStatsChange?: () => void }) {
  const [items, setItems] = useState<GalleryItemData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  // Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<GalleryItemData | null>(null);
  const [deleteConfirmItem, setDeleteConfirmItem] = useState<GalleryItemData | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Community");
  const [caption, setCaption] = useState("");
  const [alt, setAlt] = useState("");
  const [programmeId, setProgrammeId] = useState("");
  const [src, setSrc] = useState("");
  const [width, setWidth] = useState(1200);
  const [height, setHeight] = useState(800);
  const [uploadSourceType, setUploadSourceType] = useState<"upload" | "url">("upload");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const fetchItems = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/gallery");
      const data = await res.json();
      if (data.success && Array.isArray(data.items)) {
        setItems(data.items);
      }
    } catch (err) {
      console.error("Failed to fetch gallery:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  const openAddModal = () => {
    setEditingItem(null);
    setTitle("");
    setCategory("Community");
    setCaption("");
    setAlt("");
    setProgrammeId("");
    setSrc("");
    setWidth(1200);
    setHeight(800);
    setSelectedFile(null);
    setFormError(null);
    setUploadSourceType("upload");
    setIsModalOpen(true);
  };

  const openEditModal = (item: GalleryItemData) => {
    setEditingItem(item);
    setTitle(item.title);
    setCategory(item.category);
    setCaption(item.caption);
    setAlt(item.alt);
    setProgrammeId(item.programmeId || "");
    setSrc(item.src);
    setWidth(item.width || 1200);
    setHeight(item.height || 800);
    setSelectedFile(null);
    setFormError(null);
    setUploadSourceType("url");
    setIsModalOpen(true);
  };

  const handleFileUpload = async (file: File) => {
    try {
      setUploadingImage(true);
      setFormError(null);
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Upload failed");
      }

      setSrc(data.url);
      if (data.width) setWidth(data.width);
      if (data.height) setHeight(data.height);
    } catch (err) {
      setFormError(
        err instanceof Error
          ? err.message
          : "Failed to upload image. Please try entering an image URL instead."
      );
    } finally {
      setUploadingImage(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    let finalSrc = src.trim();

    if (uploadSourceType === "upload" && selectedFile && !finalSrc) {
      try {
        setUploadingImage(true);
        const formData = new FormData();
        formData.append("file", selectedFile);
        const uploadRes = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        });
        const uploadData = await uploadRes.json();
        if (!uploadRes.ok || !uploadData.success) {
          throw new Error(uploadData.message || "Failed to upload file");
        }
        finalSrc = uploadData.url;
        setSrc(finalSrc);
      } catch (err) {
        setFormError(
          err instanceof Error ? err.message : "Image upload failed."
        );
        setUploadingImage(false);
        return;
      } finally {
        setUploadingImage(false);
      }
    }

    if (!finalSrc) {
      setFormError("Please upload an image file or provide an image URL.");
      return;
    }

    setSubmitting(true);

    try {
      const payload = {
        title,
        category,
        caption: caption || title,
        alt: alt || title,
        programmeId: programmeId || undefined,
        src: finalSrc,
        width: Number(width) || 1200,
        height: Number(height) || 800,
      };

      const url = editingItem
        ? `/api/gallery/${editingItem.id}`
        : "/api/gallery";
      const method = editingItem ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to save gallery item.");
      }

      setIsModalOpen(false);
      fetchItems();
      onStatsChange?.();
    } catch (err) {
      setFormError(
        err instanceof Error ? err.message : "An unexpected error occurred."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteItem = async () => {
    if (!deleteConfirmItem) return;

    try {
      setSubmitting(true);
      const res = await fetch(`/api/gallery/${deleteConfirmItem.id}`, {
        method: "DELETE",
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to delete item.");
      }

      setDeleteConfirmItem(null);
      fetchItems();
      onStatsChange?.();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Error deleting item.");
    } finally {
      setSubmitting(false);
    }
  };

  // Filtered List
  const filteredItems = items.filter((item) => {
    const matchesCat =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.caption.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Action Toolbar */}
      <div className="bg-white rounded-3xl p-4 sm:p-6 border border-teal-900/10 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="flex flex-1 items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-teal-900/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search gallery photos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-cream/50 border border-teal-900/15 rounded-xl text-ink text-sm placeholder:text-ink/35 focus:outline-none focus:ring-2 focus:ring-sun-500 focus:bg-white transition-all"
            />
          </div>

          <div className="hidden sm:block text-xs font-semibold text-ink/60">
            {filteredItems.length} {filteredItems.length === 1 ? "photo" : "photos"}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openAddModal}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-sun-500 hover:bg-coral-500 text-white text-sm font-semibold rounded-full shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Photo</span>
          </button>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap gap-2 items-center">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
            selectedCategory === "All"
              ? "bg-teal-900 text-white shadow-xs"
              : "bg-white text-ink/70 hover:bg-teal-100/60 border border-teal-900/10"
          }`}
        >
          All Categories ({items.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = items.filter((i) => i.category === cat).length;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-teal-900 text-white shadow-xs"
                  : "bg-white text-ink/70 hover:bg-teal-100/60 border border-teal-900/10"
              }`}
            >
              {cat} {count > 0 && `(${count})`}
            </button>
          );
        })}
      </div>

      {/* Gallery Cards Grid */}
      {loading ? (
        <div className="py-20 text-center flex flex-col items-center justify-center text-teal-900/60">
          <Loader2 className="w-8 h-8 animate-spin mb-3 text-sun-500" />
          <p className="text-sm font-medium">Loading gallery items...</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-teal-900/10">
          <p className="text-ink/70 font-sans text-base mb-4">
            No gallery images found matching your search or filter.
          </p>
          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 bg-teal-900 text-white text-xs font-semibold rounded-full hover:bg-teal-800 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add First Photo</span>
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden border border-teal-900/10 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div className="relative aspect-[4/3] w-full bg-teal-900/5 overflow-hidden">
                {!failedImages[item.id] ? (
                  <Image
                    src={item.src}
                    alt={item.alt || item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={() => {
                      setFailedImages((prev) => ({ ...prev, [item.id]: true }));
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-teal-900/10 text-teal-900/60 p-4">
                    <ImageOff className="w-8 h-8 mb-2 text-teal-600" />
                    <span className="text-xs font-semibold text-center">{item.title}</span>
                  </div>
                )}
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-900/85 backdrop-blur-md text-white shadow-xs">
                    {item.category}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif font-bold text-lg text-ink line-clamp-1 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-ink/75 line-clamp-2 leading-relaxed font-sans mb-3">
                    {item.caption}
                  </p>
                  {item.programmeId && (
                    <span className="text-[11px] font-medium text-teal-600 block line-clamp-1">
                      Programme: {item.programmeId}
                    </span>
                  )}
                </div>

                <div className="pt-4 mt-4 border-t border-teal-900/10 flex items-center justify-between">
                  <span className="text-[11px] text-ink/40 font-sans">
                    {item.width} × {item.height}px
                  </span>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => openEditModal(item)}
                      className="p-2 rounded-xl bg-teal-100 hover:bg-teal-200 text-teal-900 transition-colors cursor-pointer"
                      title="Edit Photo Details"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmItem(item)}
                      className="p-2 rounded-xl bg-coral-500/10 hover:bg-coral-500/20 text-coral-500 transition-colors cursor-pointer"
                      title="Delete Photo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-teal-900/15 max-h-[92vh] overflow-y-auto my-6">
            <div className="flex items-center justify-between pb-4 border-b border-teal-900/10 mb-6">
              <div>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-ink">
                  {editingItem ? "Edit Gallery Photo" : "Add New Gallery Photo"}
                </h3>
                <p className="text-xs text-ink/65 font-sans mt-0.5">
                  Update published photo details on The Share Community website.
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 rounded-full hover:bg-cream text-ink/50 hover:text-ink transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-6 p-4 rounded-2xl bg-coral-500/10 border border-coral-500/20 text-coral-500 text-sm flex items-start gap-3">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-5">
              {/* Image Source Mode Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-teal-900 mb-2">
                  Photo Source
                </label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <button
                    type="button"
                    onClick={() => setUploadSourceType("upload")}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border cursor-pointer transition-all ${
                      uploadSourceType === "upload"
                        ? "bg-teal-900 text-white border-teal-900 shadow-xs"
                        : "bg-cream/40 text-ink/70 border-teal-900/15 hover:bg-cream"
                    }`}
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image (Cloudinary)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setUploadSourceType("url")}
                    className={`py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border cursor-pointer transition-all ${
                      uploadSourceType === "url"
                        ? "bg-teal-900 text-white border-teal-900 shadow-xs"
                        : "bg-cream/40 text-ink/70 border-teal-900/15 hover:bg-cream"
                    }`}
                  >
                    <LinkIcon className="w-3.5 h-3.5" />
                    <span>Direct Image URL / Path</span>
                  </button>
                </div>

                {uploadSourceType === "upload" ? (
                  <div className="space-y-3">
                    <div className="border-2 border-dashed border-teal-900/20 rounded-2xl p-5 text-center hover:border-sun-500 transition-colors bg-cream/30">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            setSelectedFile(file);
                            handleFileUpload(file);
                          }
                        }}
                        className="hidden"
                        id="gallery-file-input"
                      />
                      <label
                        htmlFor="gallery-file-input"
                        className="cursor-pointer flex flex-col items-center justify-center"
                      >
                        {uploadingImage ? (
                          <>
                            <Loader2 className="w-8 h-8 text-sun-500 animate-spin mb-2" />
                            <span className="text-xs font-semibold text-teal-900">
                              Uploading to Cloudinary...
                            </span>
                          </>
                        ) : selectedFile || src ? (
                          <>
                            <CheckCircle className="w-8 h-8 text-leaf-500 mb-2" />
                            <span className="text-xs font-semibold text-ink line-clamp-1">
                              {selectedFile ? selectedFile.name : "Image Ready"}
                            </span>
                            <span className="text-[11px] text-teal-600 mt-1">
                              Click to choose another photo
                            </span>
                          </>
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-teal-900/40 mb-2" />
                            <span className="text-xs font-semibold text-teal-900">
                              Choose a photo from your computer
                            </span>
                            <span className="text-[11px] text-ink/50 mt-1">
                              PNG, JPG, JPEG, WEBP up to 10MB
                            </span>
                          </>
                        )}
                      </label>
                    </div>

                    {src && (
                      <div className="flex items-center gap-3 p-3 bg-cream/50 rounded-xl text-xs text-ink/75 break-all">
                        <span className="font-semibold shrink-0 text-teal-900">
                          URL:
                        </span>
                        <span className="truncate">{src}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="e.g. /images/gallery/Education Support.jpeg or https://res.cloudinary.com/..."
                      value={src}
                      onChange={(e) => setSrc(e.target.value)}
                      className="w-full px-4 py-2.5 bg-cream/50 border border-teal-900/15 rounded-xl text-ink text-sm focus:outline-none focus:ring-2 focus:ring-sun-500 focus:bg-white"
                    />
                  </div>
                )}
              </div>

              {/* Title & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-teal-900 mb-2">
                    Photo Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Medical Care Outreach"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 bg-cream/50 border border-teal-900/15 rounded-xl text-ink text-sm focus:outline-none focus:ring-2 focus:ring-sun-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-teal-900 mb-2">
                    Category *
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 bg-cream/50 border border-teal-900/15 rounded-xl text-ink text-sm focus:outline-none focus:ring-2 focus:ring-sun-500 focus:bg-white"
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Caption */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-teal-900 mb-2">
                  Caption / Description *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe the initiative, beneficiaries, or activity shown in this genuine photograph..."
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-4 py-2.5 bg-cream/50 border border-teal-900/15 rounded-xl text-ink text-sm focus:outline-none focus:ring-2 focus:ring-sun-500 focus:bg-white font-sans"
                />
              </div>

              {/* Alt Text & Programme */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-teal-900 mb-2">
                    Alt Text (Accessibility)
                  </label>
                  <input
                    type="text"
                    placeholder="Descriptive text for screen readers"
                    value={alt}
                    onChange={(e) => setAlt(e.target.value)}
                    className="w-full px-4 py-2.5 bg-cream/50 border border-teal-900/15 rounded-xl text-ink text-sm focus:outline-none focus:ring-2 focus:ring-sun-500 focus:bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-teal-900 mb-2">
                    Associated Programme (Optional)
                  </label>
                  <select
                    value={programmeId}
                    onChange={(e) => setProgrammeId(e.target.value)}
                    className="w-full px-4 py-2.5 bg-cream/50 border border-teal-900/15 rounded-xl text-ink text-sm focus:outline-none focus:ring-2 focus:ring-sun-500 focus:bg-white"
                  >
                    <option value="">None / General</option>
                    {PROGRAMMES.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Modal Buttons */}
              <div className="pt-4 border-t border-teal-900/10 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-full border border-teal-900/20 text-xs font-semibold text-ink/75 hover:bg-cream cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting || uploadingImage}
                  className="px-6 py-2.5 rounded-full bg-sun-500 hover:bg-coral-500 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <span>{editingItem ? "Update Photo" : "Add to Gallery"}</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmItem && (
        <div
          className="fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-teal-900/15">
            <div className="w-12 h-12 rounded-2xl bg-coral-500/15 text-coral-500 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6" />
            </div>

            <h3 className="font-serif text-xl font-bold text-ink mb-2">
              Delete Gallery Photo?
            </h3>
            <p className="text-xs sm:text-sm text-ink/75 leading-relaxed font-sans mb-6">
              Are you sure you want to permanently delete{" "}
              <strong className="text-ink font-semibold">
                &ldquo;{deleteConfirmItem.title}&rdquo;
              </strong>{" "}
              from the website gallery? This action cannot be undone.
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setDeleteConfirmItem(null)}
                className="px-4 py-2 rounded-full border border-teal-900/20 text-xs font-semibold text-ink/75 hover:bg-cream cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={submitting}
                onClick={handleDeleteItem}
                className="px-5 py-2 rounded-full bg-coral-500 hover:bg-coral-600 text-white text-xs font-bold shadow-xs cursor-pointer flex items-center gap-2 disabled:opacity-50"
              >
                {submitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    <span>Deleting...</span>
                  </>
                ) : (
                  <span>Delete Permanently</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
