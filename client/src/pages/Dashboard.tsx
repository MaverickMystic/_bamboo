
import { Pencil, Trash2 } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-4xl -translate-y-30 rounded-2xl shadow-sm p-6 space-y-8">
        
        {/* Header */}
        <div>
          <h2 className="text-lg font-semibold text-neutral-800">
            Create a new post
          </h2>
          <p className="text-sm text-neutral-500">
            Fill out the form to add a new post.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Title"
              className="px-4 py-2 rounded-xl bg-neutral-100 focus:ring-1 focus:ring-neutral-400 outline-none text-neutral-800"
            />
             <input
              type="text"
              placeholder="Tags"
              className="px-4 py-2 rounded-xl bg-neutral-100 focus:ring-1 focus:ring-neutral-400 outline-none text-neutral-800"
            />
          </div>
          <textarea
            placeholder="Description"
            rows={3}
            className="w-full px-4 py-2 rounded-xl bg-neutral-100 focus:ring-1 focus:ring-neutral-400 outline-none text-neutral-800"
          />

          <button
            type="button"
            className="px-6 py-2 rounded-xl flex justify-end bg-neutral-800 text-neutral-50 font-medium hover:bg-neutral-700 transition"
          >
            Save Post
          </button>
        </form>

        {/* Posts List */}
        <div>
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">
            Post List
          </h3>
          <div className="space-y-3">
            {/* Example Post Card */}
            <div className="flex items-center justify-between bg-neutral-50 rounded-xl p-3 border border-neutral-200">
              <div className="flex items-center space-x-4">
                {/* <img
                  src="https://via.placeholder.com/80"
                  alt="Example Post"
                  className="w-14 h-14 rounded-lg object-cover"
                /> */}
                <div>
                  <h4 className="font-medium text-neutral-800">
                    Example Post Title
                  </h4>
                  <p className="text-sm text-neutral-500">
                    Short description goes here
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 rounded-lg hover:bg-neutral-200 text-neutral-600">
                  <Pencil size={16} />
                </button>
                <button className="p-2 rounded-lg hover:bg-neutral-200 text-neutral-600">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>

            {/* Empty State */}
            {/* <p className="text-sm text-neutral-500">No posts yet.</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}