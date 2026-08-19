import { Link } from "react-router-dom";
import {
  FiAlertTriangle,
  FiArrowLeft,
  FiBarChart2,
  FiLink,
  FiGrid,
} from "react-icons/fi";
import Footer from "../components/Footer";
import { MdLinkOff } from "react-icons/md";

const PageNotFound = () => {
  return (
    <>
      <div className="min-h-screen bg-linear-to-br from-slate-50 to-blue-50 flex flex-col items-center justify-center px-4 py-20">
        {/* Icon */}
        <div className="relative mb-8">
          <div className="w-32 h-32 rounded-full bg-slate-100 flex items-center justify-center">
            <MdLinkOff className="w-12 h-12 text-slate-300" />
          </div>
          <div className="absolute -top-2 -right-2 w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
            <FiAlertTriangle className="w-5 h-5 text-white" />
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-extrabold text-blue-600 mb-3">404</h1>
        <h2 className="text-2xl font-bold text-slate-900 mb-3">
          Page Not Found
        </h2>
        <p className="text-slate-500 text-center max-w-md mb-8">
          The page you're looking for doesn't exist. It may have been moved,
          deleted, or the link might be broken.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-center mb-16">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-3 rounded-lg transition-colors"
          >
            <FiArrowLeft className="w-4 h-4" />
            Go to Dashboard
          </Link>
          <Link
            to="/page-not-found"
            className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold px-5 py-3 rounded-lg border border-slate-200 transition-colors"
          >
            Report an Issue
          </Link>
        </div>

        {/* Quick links cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl w-full">
          <Link
            to="/dashboard"
            className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow"
          >
            <FiBarChart2 className="w-5 h-5 text-blue-600 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-1">
              Check Analytics
            </h3>
            <p className="text-sm text-slate-500">
              Track your active links and traffic sources in real-time.
            </p>
          </Link>

          <Link
            to="/create-link"
            className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow"
          >
            <FiLink className="w-5 h-5 text-blue-600 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-1">New ShortLink</h3>
            <p className="text-sm text-slate-500">
              Create a brand new architected URL in seconds.
            </p>
          </Link>

          <Link
            to="/links"
            className="bg-white rounded-xl border border-slate-100 shadow-sm p-5 hover:shadow-md transition-shadow"
          >
            <FiGrid className="w-5 h-5 text-blue-600 mb-3" />
            <h3 className="font-semibold text-slate-900 mb-1">Developer API</h3>
            <p className="text-sm text-slate-500">
              Integrate our link infrastructure into your apps.
            </p>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PageNotFound;
