"use client";

import React, { useState } from "react";
import Link from "next/link";
import { initialStories } from "@/config/initial-stories";
import { Story } from "@/types";
import { formatDate } from "@/lib/utils";
import {
  PlusCircle,
  Edit,
  Eye,
  CheckCircle,
  XCircle,
  FileText,
  Search,
} from "lucide-react";

export default function AdminStoriesPage() {
  const [stories, setStories] = useState<Story[]>(initialStories);
  const [searchTerm, setSearchTerm] = useState("");

  const togglePublish = (id: string) => {
    setStories((prev) =>
      prev.map((s) => (s.id === id ? { ...s, published: !s.published } : s))
    );
  };

  const filteredStories = stories.filter(
    (s) =>
      s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-forest">
            News &amp; Field Stories
          </h1>
          <p className="text-xs text-brand-charcoal-muted mt-1">
            Create, edit, and publish verified updates and community reports.
          </p>
        </div>

        <Link
          href="/admin/stories/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand-growth hover:bg-brand-growth-hover text-white font-semibold text-sm shadow-soft transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          Write New Story
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-brand-charcoal-muted">
          <Search className="w-4 h-4" />
        </span>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by title or category..."
          className="w-full pl-9 pr-4 py-2 rounded-lg border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-growth bg-white"
        />
      </div>

      {/* Stories Table */}
      <div className="bg-white rounded-2xl border border-brand-border shadow-soft overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-brand-charcoal">
            <thead className="bg-brand-ivory text-brand-forest text-xs uppercase font-bold border-b border-brand-border">
              <tr>
                <th className="py-3.5 px-4 sm:px-6">Title &amp; Summary</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Published Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-brand-border/60">
              {filteredStories.map((story) => (
                <tr key={story.id} className="hover:bg-brand-ivory/30 transition-colors">
                  <td className="py-4 px-4 sm:px-6 max-w-xs sm:max-w-md">
                    <p className="font-semibold text-brand-forest hover:text-brand-growth line-clamp-1">
                      {story.title}
                    </p>
                    <p className="text-xs text-brand-charcoal-muted line-clamp-1 mt-0.5">
                      {story.summary}
                    </p>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-brand-ivory border border-brand-border text-brand-forest">
                      {story.category}
                    </span>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap text-xs text-brand-charcoal-muted">
                    {formatDate(story.publishedAt)}
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => togglePublish(story.id)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-colors ${
                        story.published
                          ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {story.published ? (
                        <>
                          <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                          Published
                        </>
                      ) : (
                        <>
                          <XCircle className="w-3.5 h-3.5 text-gray-500" />
                          Draft
                        </>
                      )}
                    </button>
                  </td>
                  <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/news/${story.slug}`}
                        target="_blank"
                        className="p-1.5 text-brand-charcoal-muted hover:text-brand-growth transition-colors"
                        title="View Public Story"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
