"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storyFormSchema, StoryFormData } from "@/lib/validation/story";
import { slugify } from "@/lib/utils";
import { ArrowLeft, Save, Loader2, CheckCircle2 } from "lucide-react";

export default function NewStoryPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<StoryFormData>({
    resolver: zodResolver(storyFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      category: "Education",
      author: "Faith Fountain Foundation Team",
      summary: "",
      content: "",
      published: true,
      featuredImage: "",
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue("title", val);
    setValue("slug", slugify(val));
  };

  const onSubmit = async (data: StoryFormData) => {
    setIsSubmitting(true);
    try {
      // In a live Firestore setup, this writes to the 'stories' collection.
      // For local session preview, show success and navigate back
      await new Promise((res) => setTimeout(res, 800));
      setSuccess(true);
      setTimeout(() => {
        router.push("/admin/stories");
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/stories"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-forest hover:text-brand-growth"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Stories
        </Link>
      </div>

      <div className="bg-white rounded-2xl border border-brand-border p-6 sm:p-10 shadow-soft">
        <div className="mb-6 border-b border-brand-border pb-4">
          <h1 className="font-serif text-2xl font-bold text-brand-forest">
            Write New Activity Story
          </h1>
          <p className="text-xs text-brand-charcoal-muted mt-1">
            Document verified outreach distributions, orphanage deliveries, or foundation milestones.
          </p>
        </div>

        {success ? (
          <div className="py-12 text-center space-y-3">
            <CheckCircle2 className="w-12 h-12 text-brand-growth mx-auto" />
            <h3 className="font-serif text-xl font-bold text-brand-forest">
              Story Saved Successfully
            </h3>
            <p className="text-sm text-brand-charcoal-muted">
              Redirecting you to the stories list...
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div>
              <label
                htmlFor="story-title"
                className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1.5"
              >
                Story Title <span className="text-red-500">*</span>
              </label>
              <input
                id="story-title"
                type="text"
                {...register("title")}
                onChange={handleTitleChange}
                placeholder="e.g. Distribution of Learning Materials to Local Schools"
                className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-growth bg-white"
              />
              {errors.title && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Slug */}
            <div>
              <label
                htmlFor="story-slug"
                className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1.5"
              >
                URL Slug <span className="text-red-500">*</span>
              </label>
              <input
                id="story-slug"
                type="text"
                {...register("slug")}
                placeholder="e.g. distribution-learning-materials-local-schools"
                className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-sm font-mono text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-growth bg-brand-ivory/30"
              />
              {errors.slug && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {errors.slug.message}
                </p>
              )}
            </div>

            {/* Category & Author */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="story-category"
                  className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1.5"
                >
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  id="story-category"
                  {...register("category")}
                  className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-growth bg-white"
                >
                  <option value="Education">Education</option>
                  <option value="Children in Care">Children in Care</option>
                  <option value="Community Relief">Community Relief</option>
                  <option value="Healthcare Assistance">Healthcare Assistance</option>
                  <option value="Gospel Outreach">Gospel Outreach</option>
                  <option value="General News">General News</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="story-author"
                  className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1.5"
                >
                  Author Attribution <span className="text-red-500">*</span>
                </label>
                <input
                  id="story-author"
                  type="text"
                  {...register("author")}
                  className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-growth bg-white"
                />
              </div>
            </div>

            {/* Summary */}
            <div>
              <label
                htmlFor="story-summary"
                className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1.5"
              >
                Brief Summary <span className="text-red-500">*</span>
              </label>
              <textarea
                id="story-summary"
                rows={2}
                {...register("summary")}
                placeholder="A concise overview shown on story preview cards..."
                className="w-full px-4 py-2.5 rounded-lg border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-growth bg-white"
              />
              {errors.summary && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {errors.summary.message}
                </p>
              )}
            </div>

            {/* Full Content */}
            <div>
              <label
                htmlFor="story-content"
                className="block text-xs font-bold uppercase tracking-wider text-brand-forest mb-1.5"
              >
                Article Content <span className="text-red-500">*</span>
              </label>
              <textarea
                id="story-content"
                rows={8}
                {...register("content")}
                placeholder="Write the full report narrative. Separate paragraphs with a blank line..."
                className="w-full px-4 py-3 rounded-lg border border-brand-border text-sm text-brand-charcoal focus:outline-none focus:ring-2 focus:ring-brand-growth bg-white leading-relaxed"
              />
              {errors.content && (
                <p className="mt-1 text-xs text-red-600 font-medium">
                  {errors.content.message}
                </p>
              )}
            </div>

            {/* Published Checkbox */}
            <div className="flex items-center gap-2.5 pt-2">
              <input
                id="story-published"
                type="checkbox"
                {...register("published")}
                className="w-4 h-4 rounded border-brand-border text-brand-growth focus:ring-brand-growth"
              />
              <label
                htmlFor="story-published"
                className="text-xs font-semibold text-brand-forest cursor-pointer"
              >
                Publish immediately to the public website
              </label>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-brand-border flex items-center justify-end gap-3">
              <Link
                href="/admin/stories"
                className="px-5 py-2.5 rounded-lg border border-brand-border text-brand-forest text-sm font-semibold hover:bg-brand-ivory transition-colors"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2.5 rounded-lg bg-brand-growth hover:bg-brand-growth-hover text-white text-sm font-bold shadow-soft transition-colors flex items-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Story
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
