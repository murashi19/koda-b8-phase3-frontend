import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";

import * as yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import api from "../lib/axios";

import { PiEyeBold, PiEyeClosed } from "react-icons/pi";
import { FaArrowRight, FaLock } from "react-icons/fa";
import { MdLink, MdOutlineEmail } from "react-icons/md";

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

  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Konfirmasi password tidak cocok")
    .required("Konfirmasi password wajib diisi"),
});

function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "all",
  });

  async function processRegister(data) {
    try {
      await api.post("/api/register", {
        email: data.email,
        password: data.password,
      });
      reset();

      navigate("/login");
      toast.success(`Register Success, ${data.name || data.email}!`);
    } catch (error) {
      if (error.response?.status === 409) {
        toast.error("Email sudah terdaftar");
        return;
      }

      toast.error(error.response?.data?.message || "Register gagal");
      console.error(error);
    }
  }

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);
  const toggleConfirmPasswordVisibility = () =>
    setShowConfirmPassword((prev) => !prev);
  return (
    <>
      <div className="min-w-screen min-h-screen flex justify-center items-center">
        <div className="w-full max-w-sm flex flex-col gap-6">
          {/* Heading */}
          <div className="flex flex-col justify-center items-center mb-1">
            <div className="rounded-full bg-[#DBE1FF] flex items-center justify-center py-1 px-2 mb-5">
              <MdLink className="w-6 h-6 text-[#004AC6]" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-2xl font-bold mb-1">
              Create Account
            </h2>
            <p>Join the elite architects of the web</p>
          </div>

          {/* Form */}
          <form
            id="register-form"
            onSubmit={handleSubmit(processRegister)}
            className="flex flex-col gap-3 bg-gray-50 border border-gray-200 shadow-lg p-5 rounded-2xl"
          >
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

            {/* Confirm Password */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-text-primary"
              >
                Konfirmasi Kata Sandi
              </label>
              <div className="flex items-center gap-3 border border-border rounded-xl px-3 py-2.5 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary-light transition-all">
                <FaLock className="w-4 h-4 text-gray-400 shrink-0" />
                <input
                  className="w-full outline-none border-none text-sm bg-transparent"
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  placeholder="Ulangi kata sandi"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="shrink-0"
                >
                  {showConfirmPassword ? (
                    <PiEyeBold className="w-4 h-4 text-text-secondary" />
                  ) : (
                    <PiEyeClosed className="w-4 h-4 text-text-secondary" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white rounded-xl py-2 font-medium transition-colors mt-1"
            >
              Sign Up
              <FaArrowRight className="w-4 h-4" />
            </button>

            {/* Footer note */}
            <p className="text-xs text-center text-text-secondary flex items-center justify-center px-2">
              <span>
                By signing up, you agree to our{" "}
                <span className="text-blue-700">Terms of Service </span> and{" "}
                <span className="text-blue-700">Privacy Policy</span>
              </span>
            </p>
          </form>
          {/* Footer note */}
          <p className="text-xs text-center text-text-secondary flex items-center justify-center px-2">
            <span>
              Already have an account?{" "}
              <Link className="text-blue-700" to="/login">
                Log in
              </Link>
            </span>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;
