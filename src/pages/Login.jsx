import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import api from "../lib/axios";

import { PiEyeBold, PiEyeClosed } from "react-icons/pi";
import { FaArrowRight, FaLock } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

const registerSchema = yup.object({
  email: yup
    .string()
    .trim()
    .lowercase()
    .email("Format email tidak valid")
    .required("Email wajib diisi"),

  password: yup
    .string()
    .min(6, "Password minimal 6 karakter")
    .required("Password wajib diisi"),
});
function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "all",
  });

  async function processLogin(data) {
    try {
      const response = await api.post("/api/login", {
        email: data.email,
        password: data.password,
      });

      const user = response.data.result;
      const token = response.data.token;

      localStorage.setItem("auth", token);
      navigate("/dashboard");
      toast.success(`Selamat datang, ${user.email}!`);
    } catch (error) {
      toast.error(error.response?.data?.message || "Email atau password salah");
      console.error(error);
    }
  }

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <>
      <div className="min-w-screen min-h-screen flex justify-center items-center bg-gray-50 ">
        <div className="w-full max-w-sm flex flex-col gap-6">
          {/* Heading */}
          <div className="flex flex-col justify-center items-center mb-1">
            <Link
              to={"/home"}
              className="text-2xl sm:text-3xl lg:text-2xl font-bold mb-1"
            >
              ShortLink
            </Link>
          </div>

          {/* Form */}
          <form
            id="register-form"
            onSubmit={handleSubmit(processLogin)}
            className="flex flex-col gap-3 border border-gray-200 shadow-lg p-8 rounded-2xl"
          >
            <div className="flex flex-col mb-1">
              <h2 className="text-2xl sm:text-3xl lg:text-2xl font-bold mb-1">
                Welcome Back
              </h2>
              <p>Please enter your details to sign in</p>
            </div>
            {/* Email */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-sm font-medium text-text-primary"
              >
                Email
              </label>
              <div className="flex items-center gap-3 border border-border rounded-xl px-3 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-light transition-all">
                <MdOutlineEmail className="w-4 h-4 text-text-secondary shrink-0" />
                <input
                  className="w-full outline-none border-none text-sm bg-transparent"
                  type="email"
                  id="email"
                  placeholder="email@contoh.com"
                  {...register("email")}
                />
              </div>
              {errors.email && (
                <p className="text-xs text-red-500">{errors.email.message}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="password"
                className="text-sm font-medium text-text-primary"
              >
                Kata Sandi
              </label>
              <div className="flex items-center gap-3 border border-border rounded-xl px-3 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-light transition-all">
                <FaLock className="w-4 h-4 text-gray-400 shrink-0" />{" "}
                <input
                  className="w-full outline-none border-none text-sm bg-transparent"
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Minimal 6 karakter"
                  {...register("password")}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="shrink-0"
                >
                  {showPassword ? (
                    <PiEyeBold className="w-4 h-4 text-text-secondary" />
                  ) : (
                    <PiEyeClosed className="w-4 h-4 text-text-secondary" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-xs text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl py-3 font-medium transition-colors mt-1"
            >
              Log In
              <FaArrowRight className="w-4 h-4" />
            </button>

            {/* Footer note */}
            <p className="text-xs text-center text-gray-400 font-bold flex items-center justify-center p-4">
              <span>OUR CONTINUE WITH</span>
            </p>

            {/* Social register */}
            <div className="flex gap-3">
              <button
                type="button"
                className="flex-1 text-sm  rounded-xl border border-gray-200 py-2.5 hover:bg-surface transition-colors"
              >
                Sign in with Google
              </button>
            </div>
          </form>
          {/* Footer note */}
          <p className="text-xs text-center text-text-secondary flex items-center justify-center px-2">
            <span>
              Don't have an account?{" "}
              <Link className="text-blue-700" to="/register">
                Sign Up
              </Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
