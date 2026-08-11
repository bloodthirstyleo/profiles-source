"use client";

import { useState } from "react";
import Image from "next/image";
import SectionTitle from "@/components/SectionTitle";
import Reveal from "@/components/Reveal";
import AuroraBackdrop from "@/components/AuroraBackdrop";
import { blogPosts } from "@/data/siteData";
import { prefixAssetPath } from "@/lib/utils";

/** Blog posts section with pagination-like grid display. */
export default function BlogSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(blogPosts.length / itemsPerPage);

  const paginated = blogPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section id="blog" className="relative w-full pt-20 md:pt-28 pb-16 md:pb-20 px-4 sm:px-6 md:px-8 overflow-hidden">
      <AuroraBackdrop />
      <div className="max-w-6xl w-full mx-auto">
        <SectionTitle bigTitle="posts" colorTitle="blog" normalTitle="my" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {paginated.map((post, index) => {
            const tags = post.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
            return (
              <Reveal
                key={post.id}
                as="article"
                delay={(index % 3) * 90}
                className="group relative glass-panel glass-panel-hover rounded-2xl p-4 flex flex-col cursor-pointer overflow-hidden hover:shadow-skin-glow will-change-transform"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden mb-4 bg-zinc-900/50 border border-white/5">
                  <Image
                    src={prefixAssetPath(post.img)}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                <div className="px-1 flex flex-col flex-1">
                  {tags[0] && (
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-400 block mb-2">
                      {tags[0]}
                    </span>
                  )}
                  <h5 className="text-fs-16 font-bold text-zinc-100 group-hover:text-blue-400 transition-colors duration-300 leading-snug">
                    {post.title}
                  </h5>
                  <p className="mt-2 text-fs-12 text-zinc-500 font-Open-sans leading-relaxed line-clamp-2">
                    {post.desc}
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-fs-12 font-Open-sans text-zinc-500">
                    <span>{post.date}</span>
                    <span className="inline-flex items-center gap-1.5 text-blue-400 opacity-0 group-hover:opacity-100 -translate-x-1 group-hover:translate-x-0 transition-all duration-300">
                      Read
                      <i className="fa-solid fa-arrow-right text-[10px]" />
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-12">
            <div className="glass-panel p-1.5 rounded-full flex gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-fs-13 font-semibold transition-all duration-300 ${
                    currentPage === page
                      ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
