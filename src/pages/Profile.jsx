import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FiLink2, FiBell, FiShield, FiEdit2, FiLogOut } from "react-icons/fi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [emailNotif, setEmailNotif] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    toast.success("Berhasil logout");
    navigate("/login", { replace: true });
  };
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50">
        <div className="max-w-4xl flex flex-col m-auto p-20">
          <h3 className="text-xs text-gray-600 font-bold mb-4 tracking-wider">
            ACCOUNT MANAGEMENT
          </h3>

          <div className="w-full flex flex-col p-8 bg-white rounded-lg gap-8 shadow-sm">
            {/* Heading */}
            <div className="flex flex-row justify-between items-center">
              <h1 className="text-2xl font-semibold">Profile</h1>
              <div className="bg-[#DBE1FF] py-1 px-3 flex justify-center items-center rounded-2xl">
                <span className="text-xs font-bold text-blue-800">
                  PRO MEMBER
                </span>
              </div>
            </div>

            {/* Image Profile */}
            <div className="w-full flex flex-row items-center gap-5">
              <div className="relative w-24 h-24">
                <img
                  src="/profile.jpg"
                  alt="Profile"
                  className="w-24 h-24 object-cover rounded-2xl"
                />
                <button
                  type="button"
                  className="absolute -bottom-2 -right-2 bg-white border border-gray-200 shadow p-2 rounded-lg cursor-pointer"
                >
                  <FiEdit2 className="w-4 h-4 text-blue-700" />
                </button>
              </div>
              <div>
                <h1 className="text-lg font-semibold">Alex Thompson</h1>
                <span className="text-sm text-gray-600">
                  Product Architect at Digital Flow
                </span>
              </div>
            </div>

            {/* Email & Tenure Cards */}
            <div className="w-full grid grid-cols-2 gap-5">
              <div className="flex flex-col justify-center bg-gray-100 p-5 rounded-lg gap-1">
                <h1 className="font-bold text-gray-400 text-xs tracking-wider">
                  EMAIL ADDRESS
                </h1>
                <span className="text-sm">user@example.com</span>
              </div>
              <div className="flex flex-col justify-center bg-gray-100 p-5 rounded-lg gap-1">
                <h1 className="font-bold text-gray-400 text-xs tracking-wider">
                  ACCOUNT TENURE
                </h1>
                <span className="text-sm">Member since: January 1, 2026</span>
              </div>
            </div>

            {/* Active Assets */}
            <div className="w-full flex items-center justify-between bg-[#004AC6] p-6 rounded-xl">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-white/10">
                  <FiLink2 className="text-white w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <h3 className="text-white text-xs tracking-wider font-bold">
                    ACTIVE ASSETS
                  </h3>
                  <span className="text-3xl font-extrabold text-white">12</span>
                </div>
              </div>
              <button className="border border-white/20 px-5 py-2 text-white text-sm font-medium rounded-xl bg-white/10 hover:bg-white/20 transition cursor-pointer">
                VIEW LINKS
              </button>
            </div>

            {/* Settings toggles */}
            <div className="w-full flex flex-col gap-5">
              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FiBell className="text-gray-500 w-5 h-5" />
                  <span className="font-medium text-sm">
                    Email Notifications
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setEmailNotif((prev) => !prev)}
                  className={`w-11 h-6 flex items-center rounded-full px-1 transition-colors ${
                    emailNotif
                      ? "bg-[#004AC6] justify-end"
                      : "bg-gray-300 justify-start"
                  }`}
                >
                  <span className="w-4 h-4 bg-white rounded-full shadow" />
                </button>
              </div>

              <div className="w-full flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <FiShield className="text-gray-500 w-5 h-5" />
                  <span className="font-medium text-sm">
                    Two-Factor Authentication
                  </span>
                </div>
                {twoFactor ? (
                  <button
                    type="button"
                    onClick={() => setTwoFactor(false)}
                    className="w-11 h-6 flex items-center rounded-full px-1 bg-[#004AC6] justify-end"
                  >
                    <span className="w-4 h-4 bg-white rounded-full shadow" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setTwoFactor(true)}
                    className="text-xs font-bold text-red-600 tracking-wider"
                  >
                    DISABLED
                  </button>
                )}
              </div>
            </div>

            <hr className="border-gray-200" />

            {/* Logout Session */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 border border-gray-200 py-3 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition cursor-pointer"
            >
              <FiLogOut className="w-4 h-4" />
              Logout Session
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            Your data is encrypted using AES-256 standards.{" "}
            <span className="text-blue-700 hover:underline">
              Privacy Policy
            </span>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
