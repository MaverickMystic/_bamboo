import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import type { ResponsiveType } from "react-multi-carousel";
import { Link } from "react-router"; // Adjust mapping if you use react-router-dom
import { api } from "../utils/api"; 
import "react-multi-carousel/lib/styles.css";

const responsive: ResponsiveType = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4, // Changed slightly so titles have more breathing room
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

// Define the shape of the backend's formatted post
interface CarouselPost {
  _id: string;
  title: string;
  category: string;
  createdAt: string;
  previewImage: string;
  previewText: string;
}

interface Props {
  deviceType?: string;
}

const MyCarousel: React.FC<Props> = ({ deviceType }) => {
  const [posts, setPosts] = useState<CarouselPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchCarouselImages = async () => {
      try {
        // Fetch posts from your backend route. 
        // We pass a limit parameter to avoid loading hundreds of items into a small slider.
        const res = await api.get<{ success: boolean; posts: CarouselPost[] }>(
          "/posts?page=1&limit=10"
        );
        
        if (res.data.success) {
          setPosts(res.data.posts);
        }
      } catch (error) {
        console.error("Failed to load carousel images from DB:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarouselImages();
  }, []);

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-10 text-center text-stone-500 text-sm">
        Loading latest articles...
      </div>
    );
  }

  if (posts.length === 0) {
    return null; // Don't show an empty slider shell if there are zero posts
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <Carousel
        swipeable={true}
        draggable={true}
        showDots={true}    
        arrows={true}  
        responsive={responsive}
        ssr={true}
        infinite={posts.length > 4} // Only infinite loop if we have enough items to slide
        autoPlay={true}  
        keyBoardControl={true}
        containerClass="carousel-container pb-8" // Added spacing at bottom for dots indicators
        itemClass="px-2" // Cleaned up styling framework padding setup
        deviceType={deviceType}
      >
        {posts.map((post) => (
          <Link 
            to={`/blog/detail/${post._id}`} 
            key={post._id} 
            className="block group"
          >
            <div className="overflow-hidden rounded-xl bg-white border border-stone-100 shadow-sm transition hover:shadow-md">
              {/* Image Container */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-100">
                <img 
                  draggable={false}
                  src={post.previewImage} 
                  alt={post.title}
                  className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                />
                <span className="absolute top-2 left-2 rounded-md bg-emerald-600 px-2 py-0.5 text-[11px] font-medium text-white shadow-sm uppercase">
                  {post.category}
                </span>
              </div>

              {/* Text Meta Container */}
              <div className="p-3">
                <h3 className="line-clamp-2 text-sm font-semibold text-stone-800 transition group-hover:text-emerald-700 min-h-[40px]">
                  {post.title}
                </h3>
                <p className="mt-1 text-[11px] text-stone-400">
                  {new Date(post.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </Carousel>
    </div>
  );
};

export default MyCarousel;