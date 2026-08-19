import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FiLink, FiZap, FiArrowLeft } from "react-icons/fi";
import api from "../lib/axios";
import Header from "../components/Header";
import toast from "react-hot-toast";
import Footer from "../components/Footer";

const CreateLinks = () => {
  const navigate = useNavigate();
  const [originalUrl, setOriginalUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const previewSlug = customSlug || "your-custom-slug";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!originalUrl) {
      setError("The destination URL is required.");
      toast.error("The destination URL is required!");
      return;
    }

    try {
      setLoading(true);
      await api.post("/api/links", {
        originalUrl,
        customSlug: customSlug || undefined,
      });
      navigate("/links");
    } catch (err) {
      const message =
        err.response?.data?.message || "Failed to create link, try again";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto p-6">
        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1 text-sm text-blue-600 hover:underline mb-4"
        >
          <FiArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Link>

        <h1 className="text-2xl font-bold text-gray-900">
          Create New Short Link
        </h1>
        <p className="text-sm text-gray-500 mt-1 mb-6">
          Transform your long URLs into clean, manageable assets.
        </p>

        <form
          onSubmit={handleSubmit}
          className="border border-gray-200 rounded-xl p-6"
        >
          {/* Destination URL */}
          <label className="block text-xs font-bold text-gray-700 tracking-wide mb-2">
            DESTINATION URL <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 mb-1">
            <FiLink className="w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={originalUrl}
              onChange={(e) => setOriginalUrl(e.target.value)}
              placeholder="https://example.com/your-long-url-here"
              className="w-full bg-transparent text-sm focus:outline-none"
            />
          </div>
          <p className="text-xs text-gray-400 mb-5">
            Ensure your URL starts with http:// or https://
          </p>

          {/* Custom slug */}
          <label className="block text-xs font-bold text-gray-700 tracking-wide mb-2">
            CUSTOM SLUG (OPTIONAL)
          </label>
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden mb-1">
            <span className="bg-gray-100 text-sm text-gray-500 px-3 py-2 border-r border-gray-200">
              short.link/
            </span>
            <input
              type="text"
              value={customSlug}
              onChange={(e) => setCustomSlug(e.target.value)}
              placeholder="my-custom-slug"
              className="w-full px-3 py-2 text-sm focus:outline-none"
            />
          </div>
          <p className="text-xs text-gray-400 mb-5">
            Leave blank to generate a random unique identifier.
          </p>

          {/* Live preview */}
          <div className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-3 mb-6">
            <p className="flex items-center gap-1 text-xs font-bold text-blue-600 tracking-wide">
              LIVE PREVIEW
            </p>
            <p className="text-sm text-gray-800 mt-1">
              Your short link will be:{" "}
              <span className="text-blue-600 font-medium">
                https://short.link/{previewSlug}
              </span>
            </p>
          </div>

          {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 bg-blue-600 text-white font-medium px-5 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Link"}
              <FiZap className="w-4 h-4" />
            </button>
            <Link
              to="/dashboard"
              className="text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateLinks;
