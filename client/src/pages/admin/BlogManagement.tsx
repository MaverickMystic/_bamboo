import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { Trash2, Loader2, AlertCircle, ChevronLeft, ChevronRight, RefreshCw } from "lucide-react";

type Post = {
  _id: string;
  title: string;
  category: string;
  createdAt: string;
  previewText: string;
};

type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};

type DeleteState =
  | { status: "idle" }
  | { status: "confirming"; postId: string }
  | { status: "deleting"; postId: string }
  | { status: "error"; message: string };

const LIMIT = 10;

function BlogManagement() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<Pagination | null>(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState<string | null>(null);
  const [deleteState, setDeleteState] = useState<DeleteState>({ status: "idle" });

  const fetchPosts = useCallback(async (pageNum: number) => {
    setLoading(true);
    setFetchError(null);
    try {
      const res = await axios.get<{
        success: boolean;
        posts: Post[];
        pagination: Pagination;
      }>(`http://localhost:3000/posts?page=${pageNum}&limit=${LIMIT}`);

      if (res.data.success) {
        setPosts(res.data.posts);
        setPagination(res.data.pagination);
      }
    } catch (e: any) {
      setFetchError(e?.response?.data?.message || "Failed to load posts.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts(page);
  }, [page, fetchPosts]);

  const handleDeleteConfirm = (postId: string) => {
    setDeleteState({ status: "confirming", postId });
  };

  const handleDeleteCancel = () => {
    setDeleteState({ status: "idle" });
  };

  const handleDeleteExecute = async (postId: string) => {
    setDeleteState({ status: "deleting", postId });

    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`, {
        withCredentials: true,
      });

      const updatedPosts = posts.filter((p) => p._id !== postId);
      setPosts(updatedPosts);
      setDeleteState({ status: "idle" });

      // If we deleted the last post on a non-first page, go back one page
      // Otherwise just re-fetch to get accurate total count
      if (updatedPosts.length === 0 && page > 1) {
        setPage((p) => p - 1);
      } else {
        // Re-fetch silently to sync pagination totals
        fetchPosts(page);
      }
    } catch (e: any) {
      setDeleteState({
        status: "error",
        message: e?.response?.data?.message || "Delete failed.",
      });
    }
  };

  const handlePageChange = (newPage: number) => {
    // Cancel any pending confirmation when navigating
    setDeleteState({ status: "idle" });
    setPage(newPage);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-10">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-stone-900">Blog Management</h1>
          {pagination && (
            <p className="mt-0.5 text-sm text-stone-500">
              {pagination.total} post{pagination.total !== 1 ? "s" : ""} total
            </p>
          )}
        </div>
        <button
          onClick={() => fetchPosts(page)}
          className="inline-flex items-center gap-1.5 rounded-lg border border-stone-200 px-3 py-1.5 text-sm text-stone-600 hover:bg-stone-50"
        >
          <RefreshCw size={14} />
          Refresh
        </button>
      </div>

      {/* Error banner for delete failures */}
      {deleteState.status === "error" && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <AlertCircle size={16} className="shrink-0" />
          {deleteState.message}
          <button
            className="ml-auto text-red-600 underline"
            onClick={() => setDeleteState({ status: "idle" })}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Content area */}
      {loading ? (
        <div className="flex min-h-[300px] items-center justify-center text-stone-500">
          <Loader2 className="mr-2 animate-spin" size={18} />
          Loading posts…
        </div>
      ) : fetchError ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-3 text-stone-500">
          <div className="flex items-center gap-2 text-red-600">
            <AlertCircle size={18} />
            {fetchError}
          </div>
          <button
            onClick={() => fetchPosts(page)}
            className="text-sm text-emerald-600 underline"
          >
            Try again
          </button>
        </div>
      ) : posts.length === 0 ? (
        <div className="flex min-h-[300px] items-center justify-center text-stone-400">
          No posts found.
        </div>
      ) : (
        <>
          <ul className="divide-y divide-stone-100 rounded-2xl border border-stone-200 bg-white shadow-sm">
            {posts.map((post) => {
              const isConfirming =
                deleteState.status === "confirming" && deleteState.postId === post._id;
              const isDeleting =
                deleteState.status === "deleting" && deleteState.postId === post._id;

              return (
                <li
                  key={post._id}
                  className={[
                    "flex items-center gap-4 px-5 py-4 transition-colors",
                    isConfirming ? "bg-red-50/60" : "",
                  ].join(" ")}
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-stone-900">
                      {post.title}
                    </p>
                    <p className="mt-0.5 text-xs text-stone-400">
                      {post.category} •{" "}
                      {new Date(post.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    {isConfirming ? (
                      <>
                        <span className="text-xs text-stone-500">Are you sure?</span>
                        <button
                          onClick={() => handleDeleteExecute(post._id)}
                          className="rounded-md bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700"
                        >
                          Yes, delete
                        </button>
                        <button
                          onClick={handleDeleteCancel}
                          className="rounded-md border border-stone-200 px-3 py-1.5 text-xs text-stone-600 hover:bg-stone-50"
                        >
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleDeleteConfirm(post._id)}
                        disabled={isDeleting || deleteState.status === "deleting"}
                        className="inline-flex items-center gap-1.5 rounded-md border border-red-200 px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {isDeleting ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : (
                          <Trash2 size={13} />
                        )}
                        Delete
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Pagination */}
          {pagination && pagination.totalPages > 1 && (
            <div className="mt-5 flex items-center justify-between">
              <p className="text-sm text-stone-500">
                Showing{" "}
                <span className="font-medium text-stone-700">
                  {(pagination.page - 1) * pagination.limit + 1}–
                  {Math.min(pagination.page * pagination.limit, pagination.total)}
                </span>{" "}
                of{" "}
                <span className="font-medium text-stone-700">{pagination.total}</span>
              </p>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handlePageChange(page - 1)}
                  disabled={page === 1}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-stone-200 text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Previous page"
                >
                  <ChevronLeft size={15} />
                </button>

                {/* Page number buttons */}
                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1)
                  .filter((p) => {
                    // Always show first, last, current, and neighbors
                    return (
                      p === 1 ||
                      p === pagination.totalPages ||
                      Math.abs(p - page) <= 1
                    );
                  })
                  .reduce<(number | "ellipsis")[]>((acc, p, idx, arr) => {
                    if (idx > 0 && p - (arr[idx - 1] as number) > 1) {
                      acc.push("ellipsis");
                    }
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((item, idx) =>
                    item === "ellipsis" ? (
                      <span
                        key={`ellipsis-${idx}`}
                        className="inline-flex h-8 w-8 items-center justify-center text-sm text-stone-400"
                      >
                        …
                      </span>
                    ) : (
                      <button
                        key={item}
                        onClick={() => handlePageChange(item)}
                        className={[
                          "inline-flex h-8 w-8 items-center justify-center rounded-md text-sm transition-colors",
                          item === page
                            ? "bg-emerald-600 text-white font-medium"
                            : "border border-stone-200 text-stone-600 hover:bg-stone-50",
                        ].join(" ")}
                      >
                        {item}
                      </button>
                    )
                  )}

                <button
                  onClick={() => handlePageChange(page + 1)}
                  disabled={page === pagination.totalPages}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-stone-200 text-stone-600 hover:bg-stone-50 disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Next page"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default BlogManagement;