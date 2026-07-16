"use client";

import { useState } from "react";
import { useTunisContext } from "@/contexts/TunisContext";
import SectionTitle from "@/components/SectionTitle";
import { blogPosts } from "@/data/siteData";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Blog posts section with pagination-like grid display. */
export default function BlogSection() {
  const { dark } = useTunisContext();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(blogPosts.length / itemsPerPage);

  const paginated = blogPosts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <section id="blog" className="relative w-full">
      <div className="w-full">
        <SectionTitle bigTitle="posts" colorTitle="blog" normalTitle="my" />

        <div className="xl:max-w-1140 custom-md-3:max-w-[calc(100%-195px)] lg:max-w-960 md:max-w-720 sm:max-w-540 xs:max-w-full mx-auto">
          <div className="flex flex-wrap -mx-4">
            {paginated.map((post) => (
              <div key={post.id} className="w-1/2 down-sm:w-full px-4 mb-8">
                <div className="blog-list-item cursor-pointer rounded-5 group">
                  <img
                    src={`${basePath}${post.img}`}
                    alt={post.title}
                    className="w-full h-auto rounded-5"
                  />
                  <div className={`blog-overlay absolute inset-0 flex flex-col items-center justify-center p-6 text-center rounded-5 ${dark ? "bg-black/80" : "bg-white/90"}`}>
                    <span className="text-fs-13 text-accent uppercase font-semibold mb-2">
                      {post.tags}
                    </span>
                    <h5 className="text-fs-18 font-semibold mb-3">{post.title}</h5>
                    <span className="text-fs-13 text-light-grey">{post.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`mx-1 w-10 h-10 rounded-full flex items-center justify-center text-fs-14 font-semibold transition ${
                  currentPage === page
                    ? "bg-accent text-white"
                    : dark
                    ? "bg-black-3 text-white hover:bg-accent"
                    : "bg-grey text-black-6 hover:bg-accent hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
