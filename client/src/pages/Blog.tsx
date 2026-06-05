import { Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { TbCategory } from "react-icons/tb";

interface Post {
  _id: string;
  title: string;
  category?: string;
  createdAt: string;
  previewImage?: string | null;
  previewText?: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

interface ApiResponse {
  success: boolean;
  posts: Post[];
  pagination: Pagination;
}

interface CardItemProps {
  post: Post;
}

const FALLBACK_IMAGE = "https://picsum.photos/400/200";

const CardItem = ({ post }: CardItemProps) => {
  const imageSrc = post.previewImage || FALLBACK_IMAGE;
  const previewText = post.previewText || "No preview available.";

  return (
    <motion.div whileHover={{ scale: 1.03 }} className="w-full">
      <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-md transition hover:shadow-xl">
        <img src={imageSrc} alt={post.title} className="h-64 w-full object-cover" />

        <div className="flex flex-1 flex-col justify-between p-6">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-pink-500">
                <TbCategory />
              </span>
              <span className="text-sm font-semibold text-gray-700">
                {post.category || "General"}
              </span>
            </div>

            <h3 className="-mt-2 text-lg font-bold text-gray-800">{post.title || "Untitled"}</h3>

            <p className="line-clamp-3 text-sm text-gray-600">{previewText}</p>
          </div>

          <div className="mt-4">
            <div className="mb-3 flex items-center gap-1 text-xs text-gray-500">
              <Calendar size={14} />
              {new Date(post.createdAt).toLocaleDateString()}
            </div>

            <Link to={`/blog/detail/${post._id}`}>
              <button className="w-full cursor-pointer rounded-full border-2 border-greensage py-2 font-bold text-greensage transition hover:bg-greensage hover:text-white">
                See more
              </button>
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 8,
    total: 0,
    totalPages: 1,
  });

  const [loading, setLoading] = useState(true);
  const [changingPage, setChangingPage] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = async (page: number, initial = false) => {
    try {
      if (initial) setLoading(true);
      else setChangingPage(true);

      setError("");

      const res = await axios.get<ApiResponse>("http://localhost:3000/posts", {
        params: { page, limit: pagination.limit },
      });

      if (!res.data.success) throw new Error("Failed to fetch posts");

      setPosts(res.data.posts || []);
      setPagination(res.data.pagination);
    } catch (err: any) {
      setError(err?.message || "Something went wrong");
    } finally {
      if (initial) setLoading(false);
      else setChangingPage(false);
    }
  };

  useEffect(() => {
    fetchPosts(1, true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const goPrev = () => {
    if (pagination.page > 1 && !changingPage) {
      fetchPosts(pagination.page - 1);
    }
  };

  const goNext = () => {
    if (pagination.page < pagination.totalPages && !changingPage) {
      fetchPosts(pagination.page + 1);
    }
  };

  if (loading) {
    return <div className="py-20 text-center text-gray-500">Loading posts...</div>;
  }

  return (
    <section className="px-4 py-12 sm:px-8">
      <h2 className="mb-10 text-center text-3xl font-bold">Latest</h2>

      {error ? (
        <div className="mx-auto mb-6 max-w-3xl rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      ) : null}

      {posts.length === 0 ? (
        <div className="py-20 text-center text-gray-500">No posts available.</div>
      ) : (
        <>
          <div className="m-5 grid gap-6 p-5 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {posts.map((post) => (
              <CardItem key={post._id} post={post} />
            ))}
          </div>

          <div className="mx-auto mt-6 flex max-w-4xl items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-3">
            <p className="text-sm text-gray-600">
              Page <span className="font-medium">{pagination.page}</span> of{" "}
              <span className="font-medium">{pagination.totalPages}</span> (
              {pagination.total} posts)
            </p>

            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                disabled={pagination.page <= 1 || changingPage}
                className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <ChevronLeft size={16} />
                Prev
              </button>

              <button
                onClick={goNext}
                disabled={pagination.page >= pagination.totalPages || changingPage}
                className="inline-flex items-center gap-1 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </>
      )}
    </section>
  );
}