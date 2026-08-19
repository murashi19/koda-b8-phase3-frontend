import { useEffect, useState } from "react";
import {
  FiLink,
  FiCopy,
  FiTrash2,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import api from "../lib/axios.js";
import toast from "react-hot-toast";
import Header from "../components/Header";
import Footer from "../components/Footer.jsx";

function Links() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [deletingId, setDeletingId] = useState(null);

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 5;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 400);
    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    async function fetchLinks() {
      try {
        setLoading(true);
        const res = await api.get("/api/links", {
          params: {
            page,
            limit,
            search: debouncedSearch || undefined,
          },
        });
        setLinks(res.data.results);
        setTotalPages(res.data.pagination.totalPages);
        setTotal(res.data.pagination.total);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data links");
      } finally {
        setLoading(false);
      }
    }
    fetchLinks();
  }, [page, debouncedSearch]);

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
      setTotal((prev) => prev - 1);
      toast.success("Link deleted successfully");
    } catch (err) {
      console.error(err);
      toast.error("Failed delete link");
    } finally {
      setDeletingId(null);
    }
  };

  const handlePrevPage = () => {
    setPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <div className="min-w-screen flex justify-center p-10 mb-10">
          <div className="w-full max-w-4xl bg-white rounded-xl border border-gray-200 p-6">
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
                <p className="text-2xl font-bold text-blue-600">{total}</p>
              </div>
            </div>

            {/* Search bar */}
            <div className="relative mb-4">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by slug or origin URL..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Link list */}
            {loading && (
              <p className="text-sm text-gray-400 py-6 text-center">
                Loading...
              </p>
            )}
            {error && (
              <p className="text-sm text-red-500 py-6 text-center">{error}</p>
            )}

            {!loading && !error && (
              <>
                {filteredLinks.length === 0 ? (
                  <p className="text-sm text-gray-400 py-6 text-center">
                    {debouncedSearch
                      ? "Tidak ada link yang cocok."
                      : "Belum ada link."}
                  </p>
                ) : (
                  <div className="grid grid-rows-3 sm:grid-rows-4 gap-4 auto-cols-[minmax(250px,1fr)] overflow-x-auto pb-2">
                    {filteredLinks.map((link) => (
                      <div
                        key={link.id}
                        className="border border-gray-200 rounded-xl p-4 flex flex-col justify-between hover:shadow-sm transition-shadow"
                      >
                        <div>
                          <div className="flex items-center gap-2">
                            <FiLink className="w-4 h-4 text-blue-600 shrink-0" />
                            <a
                              href={link.short_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-600 font-medium text-sm hover:underline truncate"
                            >
                              {link.short_url.replace(/^https?:\/\//, "")}
                            </a>
                          </div>
                          <p className="text-xs text-gray-500 mt-2 truncate">
                            {link.original_url}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {new Date(link.created_at).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </p>
                          <div className="flex items-center justify-end gap-3 my-auto">
                            <button
                              onClick={() => handleCopy(link.short_url)}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <FiCopy className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(link.id)}
                              disabled={deletingId === link.id}
                              className="text-gray-400 hover:text-red-500 disabled:opacity-50"
                            >
                              <FiTrash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Pagination controls */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 mt-6">
                    <button
                      onClick={handlePrevPage}
                      disabled={page <= 1}
                      className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent"
                    >
                      <FiChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="text-sm text-gray-500">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={handleNextPage}
                      disabled={page >= totalPages}
                      className="p-2 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:hover:bg-transparent"
                    >
                      <FiChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Links;
