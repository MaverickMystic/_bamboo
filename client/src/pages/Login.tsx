// We've updated the icon imports to use a library that works correctly.
import { FaUser, FaLock } from "react-icons/fa";

export default function Login() {
  
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white -translate-y-30 rounded-2xl -mt-10 shadow-md p-10 w-full max-w-md">
        {/* Logo & Heading */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 mx-auto mb-2 bg-green-700 rounded-full flex items-center justify-center">
            <img className="rounded-full w-12 h-12" src="https://i.pinimg.com/1200x/27/8a/45/278a455cfe2c0a6b809887675f706f91.jpg" alt="" />
          </div>
          <h2 className="text-lg font-semibold text-gray-800">
            Welcome back!
          </h2>
          <p className="text-sm text-gray-500">Log in to your account</p>
        </div>

        {/* Form */}
        <form className="space-y-3">
          <div className="relative">
            {/* Using FaUser icon for the username field */}
            <FaUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Username"
              className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2"
            />
          </div>
          <div className="relative">
            {/* Using FaLock icon for the password field */}
            <FaLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              placeholder="Password"
              className="w-full pl-12 pr-4 py-2 rounded-lg bg-gray-100 focus:outline-none focus:ring-2"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-greensage hover:bg-green-900 text-white font-semibold rounded-lg transition"
          >
            Log in
          </button>
        </form>

      </div>
    </div>
  );
}