import { useRouteError, isRouteErrorResponse, useNavigate } from "react-router";
import { AlertTriangle, Home, RefreshCw, HelpCircle } from "lucide-react";

export default function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  // Determine if it's a 404 or a general application crash
  const is404 = isRouteErrorResponse(error) && error.status === 404;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-stone-50 via-emerald-50/20 to-stone-100 p-6">
      <div className="max-w-md w-full text-center bg-white rounded-2xl border border-emerald-100 p-8 shadow-[0_18px_45px_rgba(16,24,40,0.06)]">
        
        {/* Animated Icon Container */}
        <div className="w-16 h-16 mx-auto mb-6 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
          {is404 ? <HelpCircle size={32} /> : <AlertTriangle size={32} className="text-red-500 animate-pulse" />}
        </div>

        {/* Dynamic Typography */}
        <h1 className="text-4xl font-bold text-stone-900 tracking-tight">
          {is404 ? "404" : "Oops!"}
        </h1>
        <h2 className="text-xl font-semibold text-stone-800 mt-2">
          {is404 ? "Page Not Found" : "Something went wrong"}
        </h2>
        <p className="mt-3 text-sm text-stone-600 leading-relaxed">
          {is404
            ? "The lesson or page you are looking for doesn't exist, has been moved, or is under construction."
            : "An unexpected application error occurred. Our team has been notified."}
        </p>

  
        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 text-sm font-medium transition shadow-sm"
          >
            <Home size={16} />
            Go back home
          </button>
          
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 px-5 py-2.5 text-sm font-medium transition shadow-sm"
          >
            <RefreshCw size={16} />
            Try again
          </button>
        </div>
      </div>
    </div>
  );
}