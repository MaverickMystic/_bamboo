import { Calendar, Users, Briefcase, Heart } from "lucide-react";
import { motion } from "framer-motion";
import type { JSX } from "react";
import { Link } from "react-router";

interface CardItemProps {
  image: string;
  title: string;
  description: string;
  date: string;
  tag?: string;
  icon?: JSX.Element;
}

const CardItem: React.FC<CardItemProps> = ({ image, title, description, date, tag, icon }) => {
  return (
    <motion.div whileHover={{ scale: 1.03 }} className="w-full">
      <div className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition bg-white border border-gray-200 flex flex-col h-full">
        <img src={image} alt={title} className="w-full h-44 object-cover" />
        <div className="p-6 flex flex-col flex-1 justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              {icon && <span className="text-pink-500">{icon}</span>}
              {tag && <span className="text-sm font-semibold text-gray-700">{tag}</span>}
            </div>
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
          </div>
          <div className="mt-4">
            <div className="flex items-center text-xs text-gray-500 gap-1 mb-3">
              <Calendar size={14} /> {date}
            </div>
            <Link to={"/blog/detail"}>
            <button className="w-full cursor-pointer py-2 rounded-full border border-pink-400 text-pink-500 hover:bg-pink-50 transition">
              詳しく見る →
            </button></Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Blog() {
  const posts: CardItemProps[] = [
    {
      image: "https://picsum.photos/400/200?random=1",
      title: "自然にタッチ",
      description: "自然の中で遊びながら感覚を磨き、身近にあるものにふれあう体験を大切にしています。",
      date: "2025-08-20",
      tag: "Nature",
      icon: <Heart size={18} />,
    },
    {
      image: "https://picsum.photos/400/200?random=2",
      title: "7つの特色",
      description: "園で大切にしている7つの特色をご紹介します。",
      date: "2025-08-18",
      tag: "Culture",
      icon: <Users size={18} />,
    },
    {
      image: "https://picsum.photos/400/200?random=3",
      title: "牛深町のこと",
      description: "地域と共に歩む取り組みについてご紹介しています。",
      date: "2025-08-15",
      tag: "Community",
      icon: <Briefcase size={18} />,
    },
    {
      image: "https://picsum.photos/400/200?random=1",
      title: "自然にタッチ",
      description: "自然の中で遊びながら感覚を磨き、身近にあるものにふれあう体験を大切にしています。",
      date: "2025-08-20",
      tag: "Nature",
      icon: <Heart size={18} />,
    },
    {
      image: "https://picsum.photos/400/200?random=2",
      title: "7つの特色",
      description: "園で大切にしている7つの特色をご紹介します。",
      date: "2025-08-18",
      tag: "Culture",
      icon: <Users size={18} />,
    },
    {
      image: "https://picsum.photos/400/200?random=3",
      title: "牛深町のこと",
      description: "地域と共に歩む取り組みについてご紹介しています。",
      date: "2025-08-15",
      tag: "Community",
      icon: <Briefcase size={18} />,
    },
    {
      image: "https://picsum.photos/400/200?random=2",
      title: "7つの特色",
      description: "園で大切にしている7つの特色をご紹介します。",
      date: "2025-08-18",
      tag: "Culture",
      icon: <Users size={18} />,
    },
    {
      image: "https://picsum.photos/400/200?random=3",
      title: "牛深町のこと",
      description: "地域と共に歩む取り組みについてご紹介しています。",
      date: "2025-08-15",
      tag: "Community",
      icon: <Briefcase size={18} />,
    },
  ];

  return (
    <section className="py-12 px-4 sm:px-8">
      <h2 className="text-3xl font-bold text-center mb-10">Latest</h2>
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 m-5 p-5 lg:grid-cols-4">
        {posts.map((post, index) => (
          <CardItem key={index} {...post} />
        ))}
      </div>
    </section>
  );
}

