import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function PostDetail() {
  const navigate = useNavigate();

  return (
    <section className=" min-h-screen py-10 px-4 sm:px-8">
      {/* Back Button */}
      <div className="max-w-5xl mx-auto mb-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center cursor-pointer gap-2 text-sm text-gray-600 hover:text-pink-500 transition"
        >
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      {/* Post Banner */}
      <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl shadow-lg">
        <img
          src="https://i.pinimg.com/736x/04/ae/7a/04ae7a8d22d019754da7c761be385232.jpg"
          alt="Post banner"
          className="w-full h-72 md:h-96 object-cover"
        />
      </div>

      <div className="max-w-5xl mx-auto mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-md">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              自然にタッチ
            </h1>
            <div className="flex items-center text-sm text-gray-500 gap-4">
              <span className="flex items-center gap-1">
                <Calendar size={16} /> 2025-08-20
              </span>
              <span className="flex items-center gap-1">
                <User size={16} /> Admin
              </span>
              <span className="flex items-center gap-1">
                <Tag size={16} /> Nature
              </span>
            </div>
          </div>

          <article className="prose max-w-none text-gray-700 leading-relaxed">
            <p>
              自然の中で遊びながら感覚を磨き、身近にあるものにふれあう体験を大切にしています。
              この投稿では、園の取り組みや活動内容について詳しくご紹介します。
            </p>
            <p>
              山や川、公園など身近な自然を活用し、子どもたちが五感を使って学ぶ機会を提供しています。
              こうした体験は成長に大きな影響を与え、思いやりや創造力を育てます。
            </p>
            <p>
              今後も地域と連携しながら、多様な自然体験を提供し続けていきます。
            </p>
          </article>
        </div>

        {/* Sidebar */}
        <aside className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-3">Related Posts</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="hover:text-pink-500 cursor-pointer">7つの特色</li>
              <li className="hover:text-pink-500 cursor-pointer">牛深町のこと</li>
              <li className="hover:text-pink-500 cursor-pointer">地域との連携活動</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md">
            <h3 className="text-lg font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1 text-xs bg-pink-100 text-pink-700 rounded-full">
                Nature
              </span>
              <span className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded-full">
                Culture
              </span>
              <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                Community
              </span>
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}
