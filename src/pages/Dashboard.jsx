import { useEffect, useState } from "react";
import { FiLink, FiCopy, FiExternalLink } from "react-icons/fi";
import Footer from "../components/Footer";
import Header from "../components/Header";
import api from "../lib/axios";

const Dashboard = () => {
  const [stats, setStats] = useState({ totalLinks: 0, recentLinks: [] });
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState(null);

  const getDashboardStats = async () => {
    const res = await api.get("/api/dashboard");
    return res.data;
  };
  useEffect(() => {
    async function fetchStats() {
      try {
        setLoading(true);
        const res = await getDashboardStats();
        setStats(res.results);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);
  const handleCopy = (shortUrl, id) => {
    navigator.clipboard.writeText(shortUrl);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen px-6 py-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <>
            <div className="bg-white rounded-lg shadow p-6 mb-8 flex items-center gap-4">
              <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
                <FiLink size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Total Links</p>
                <p className="text-3xl font-bold">{stats.totalLinks}</p>
              </div>
            </div>

            <h2 className="text-lg font-medium mb-4">Link Terbaru</h2>

            {stats.recentLinks.length === 0 ? (
              <p className="text-gray-500">Belum ada link yang dibuat.</p>
            ) : (
              <div className="space-y-3">
                {stats.recentLinks.map((link) => (
                  <div
                    key={link.id}
                    className="bg-white rounded-lg shadow p-4 flex items-center justify-between"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-gray-500 truncate">
                        {link.original_url}
                      </p>
                      <p className="font-medium text-blue-600">
                        {link.short_url}
                      </p>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <button
                        onClick={() => handleCopy(link.short_url, link.id)}
                        className="p-2 rounded hover:bg-gray-100"
                        title="Copy"
                      >
                        <FiCopy size={16} />
                      </button>
                      <a
                        href={link.short_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded hover:bg-gray-100"
                        title="Open"
                      >
                        <FiExternalLink size={16} />
                      </a>
                    </div>
                    {copiedId === link.id && (
                      <span className="text-xs text-green-600 ml-2">
                        Copied!
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Dashboard;
