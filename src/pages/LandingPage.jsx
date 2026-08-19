import { useState } from "react";
import { Link } from "react-router-dom";
import { FiLink2 } from "react-icons/fi";
import Header from "../components/Header";

import { RiFlashlightLine } from "react-icons/ri";
import { FaCircleCheck } from "react-icons/fa6";
import Footer from "../components/Footer";

const LandingPage = () => {
  const [url, setUrl] = useState("");

  const handleShorten = (e) => {
    e.preventDefault();
    // TODO: hit shorten endpoint / redirect to login if unauthenticated
    console.log("shorten:", url);
  };

  return (
    <div className="min-h-screen">
      <Header />

      <main>
        <section className="max-w-4xl mx-auto px-4 mb-40">
          {/* Hero */}
          <div className="flex flex-col items-center text-center gap-4 py-16">
            <h1 className="text-5xl font-extrabold tracking-tighter">
              Shorten URLs. <span className="text-blue-500">Share Easily.</span>
            </h1>
            <p className="max-w-md text-gray-600">
              Create short, memorable links for your team communications.
              Transform long, cumbersome URLs into powerful digital assets that
              drive engagement.
            </p>

            <div className="flex flex-row justify-center items-center gap-5 mt-4">
              <Link
                to="/login"
                className="px-8 py-4 rounded-xl bg-blue-700 text-white text-center font-medium hover:bg-blue-800 transition"
              >
                Get Started
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 rounded-xl border border-gray-200 text-blue-700 text-center font-medium hover:bg-gray-50 transition"
              >
                Learn More
              </Link>
            </div>
          </div>

          {/* Shorten form */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
            <form
              onSubmit={handleShorten}
              className="flex flex-row items-center gap-4"
            >
              <FiLink2 className="w-6 h-6 text-gray-400 shrink-0" />
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://very-long-architectural-url.com/asset-id-99238-x1"
                className="w-full border-b border-gray-200 focus:outline-none focus:border-blue-500 py-2"
              />
              <button
                type="submit"
                className="px-8 py-4 rounded-xl bg-blue-600 text-white text-center font-medium hover:bg-blue-700 transition shrink-0"
              >
                Shorten
              </button>
            </form>
          </div>
        </section>

        <section className="bg-gray-100 px-10 py-20">
          {/* Heading */}
          <div className="flex flex-col gap-5 px-5 mb-10">
            <h3 className="text-blue-800 font-bold">ARCHITECTURAL FEATURES</h3>
            <h1 className="font-black text-2xl">
              Built for Enterprise Precision
            </h1>
          </div>
          <div className="grid grid-cols-3 p-5 gap-10">
            <div className="flex flex-col bg-white shadow-lg p-10 gap-7 rounded-xl">
              <div className="w-15 h-15 p-5 flex justify-center items-center bg-[#DBE1FF] rounded-xl">
                <RiFlashlightLine className="w-12 h-12 text-[#004AC6] font-bold " />
              </div>
              <h1 className="text-xl font-extrabold">Easy Create</h1>
              <p className="text-left text-lg">
                Instantly generate high-performance short links with a single
                click or through our surgical API endpoints.
              </p>
              <div className="bg-[#004AC633] w-20 h-1.5 rounded-2xl"></div>
            </div>
            <div className="flex flex-col bg-white shadow-lg p-10 gap-7 rounded-xl">
              <div className="w-15 h-15 p-5 flex justify-center items-center bg-[#DBE1FF] rounded-xl">
                <RiFlashlightLine className="w-12 h-12 text-[#004AC6] font-bold " />
              </div>
              <h1 className="text-xl font-extrabold">Easy Create</h1>
              <p className="text-left text-lg">
                Instantly generate high-performance short links with a single
                click or through our surgical API endpoints.
              </p>
              <div className="bg-[#004AC633] w-20 h-1.5 rounded-2xl"></div>
            </div>
            <div className="flex flex-col bg-white shadow-lg p-10 gap-7 rounded-xl">
              <div className="w-15 h-15 p-5 flex justify-center items-center bg-[#DBE1FF] rounded-xl">
                <RiFlashlightLine className="w-12 h-12 text-[#004AC6] font-bold " />
              </div>
              <h1 className="text-xl font-extrabold">Easy Create</h1>
              <p className="text-left text-lg">
                Instantly generate high-performance short links with a single
                click or through our surgical API endpoints.
              </p>
              <div className="bg-[#004AC633] w-20 h-1.5 rounded-2xl"></div>
            </div>
          </div>
        </section>

        <section className="flex flex-row px-10 py-25 gap-30">
          {/* Left */}
          <img
            className="bg-gray-200 w-xl rounded-xl "
            src="/public/img.png"
            alt="image"
          />

          {/* Right */}
          <div className="flex flex-col justify-center px-20 py-15 gap-4 ">
            <span className="text-gray-600">DATA DRIVEN INSIGHTS</span>
            <h1 className="text-3xl font-extrabold">
              Observe your link architecture in real- time.
            </h1>
            <p className="mb-5 text-gray-700">
              Every click is a data point. Our dashboard provides surgical
              precision into where your traffic originates, who is engaging, and
              how your team communications are performing across the globe.
            </p>
            <li className="list-none flex flex-col gap-5">
              <div className="flex flex-row gap-3 items-center font-medium">
                <FaCircleCheck className="text-blue-800 w-5 h-5" />
                Geographic Distribution Maps
              </div>
              <div className="flex flex-row gap-3 items-center font-medium">
                <FaCircleCheck className="text-blue-800 w-5 h-5" />
                Device & Browser Breakdown
              </div>
              <div className="flex flex-row gap-3 items-center font-medium">
                <FaCircleCheck className="text-blue-800 w-5 h-5" />
                UTM Parameter Tracking
              </div>
            </li>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
