import React from "react";
import Link from "next/link";

// Fetch posts with pagination parameters
async function fetchPosts(page = 1, limit = 10) {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=${limit}`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) {
    throw new Error("Failed to fetch posts");
  }
  const posts = await res.json();
  // Read total count from headers (JSONPlaceholder returns x-total-count when _limit is used)
  const totalCount = res.headers.get("x-total-count");
  return { posts, totalCount: Number(totalCount) };
}

const Page = async ({ searchParams }) => {
  // Get current page from URL search params; default to page 1 if not provided
  const currentPage = Number(searchParams.page) || 1;
  const limit = 10;
  const { posts, totalCount } = await fetchPosts(currentPage, limit);
  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="container my-5">
      <div className="row">
        {posts?.map((post) => (
          <div key={post.id} className="col-sm-12 col-md-4 mb-4">
            <div className="card p-3 h-100">
              <div className="card-body">
                <h2>{post.id}</h2>
                <h5 className="card-title">{post.title}</h5>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="d-flex justify-content-center align-items-center mt-4">
        {currentPage > 1 && (
          <Link
            href={`/posts/?page=${currentPage - 1}`}
            className="btn btn-outline-primary me-2"
          >
            Previous
          </Link>
        )}
        {Array.from({ length: totalPages }, (_, i) => (
          <Link
            key={i + 1}
            href={`/posts/?page=${i + 1}`}
            className={`btn me-2 ${
              currentPage === i + 1 ? "btn-primary" : "btn-outline-primary"
            }`}
          >
            {i + 1}
          </Link>
        ))}
        {currentPage < totalPages && (
          <Link
            href={`/posts/?page=${currentPage + 1}`}
            className="btn btn-outline-primary"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  );
};

export default Page;
export const revalidate = 60;
