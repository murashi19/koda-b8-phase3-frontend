import { useEffect, useState } from "react";
import { FiLink, FiCopy, FiTrash2, FiSearch } from "react-icons/fi";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import Header from "../components/Header";

function Links() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    async function fetchLinks() {
      try {
        setLoading(true);
        const res = await api.get("/api/links");
        setLinks(res.data.results);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data links");
      } finally {
        setLoading(false);
      }
    }
    fetchLinks();
  }, []);

  const handleCopy = (shortUrl) => {
    navigator.clipboard.writeText(shortUrl);
    toast.success("Copied Link");
  };

  const filteredLinks = links.filter(
    (link) =>
      link.slug.toLowerCase().includes(search.toLowerCase()) ||
      link.original_url.toLowerCase().includes(search.toLowerCase()),
  );

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Yakin mau hapus link ini?");
    if (!confirmDelete) return;

    try {
      setDeletingId(id);
      await api.delete(`/api/links/${id}`);
      setLinks((prev) => prev.filter((link) => link.id !== id));
      toast.success("Link deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed delete link");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <>
      <Header />
      <div className="min-w-screen flex justify-center p-5">
        <div className="w-full max-w-5xl bg-white rounded-xl border border-gray-200 p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-xl font-bold text-gray-900">My Links</h1>
              <p className="text-sm text-gray-500 mt-1">
                Manage and track your shortened digital assets.
              </p>
            </div>

            <div className="border border-gray-200 rounded-2xl px-4 py-4 text-center">
              <p className="text-xs font-semibold text-gray-500 tracking-wide">
                TOTAL ACTIVE
              </p>
              <p className="text-2xl font-bold text-blue-600">{links.length}</p>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative mb-4">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or URL..."
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Link list */}
          {loading && (
            <p className="text-sm text-gray-400 py-6 text-center">Loading...</p>
          )}
          {error && (
            <p className="text-sm text-red-500 py-6 text-center">{error}</p>
          )}

          {!loading && !error && (
            <div className="divide-y divide-gray-100 border-t border-gray-100">
              {filteredLinks.length === 0 ? (
                <p className="text-sm text-gray-400 py-6 text-center">
                  Belum ada link.
                </p>
              ) : (
                filteredLinks.map((link) => (
                  <div
                    key={link.id}
                    className="flex items-center justify-between py-4"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <FiLink className="w-4 h-4 text-blue-600" />
                        <a
                          href={link.short_url}
                          target="_blank"
                          className="text-blue-600 font-medium text-sm hover:underline"
                        >
                          {link.short_url.replace(/^https?:\/\//, "")}
                        </a>
                      </div>
                      <p className="text-xs text-gray-500 mt-1 truncate max-w-md">
                        {link.original_url}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(link.created_at).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleCopy(link.short_url)}
                        className="text-gray-400 hover:text-gray-600"
                      >
                        <FiCopy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(link.id)}
                        disabled={deletingId === link.id}
                        className="text-gray-400 hover:text-red-500"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Links;
