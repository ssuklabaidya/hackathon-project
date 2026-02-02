"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Mail, Phone, Lock, User } from "lucide-react";

export default function CitizenLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [activeTab, setActiveTab] = useState("email");

  const handleEmailLogin = (e) => {
    e.preventDefault();
    // Mock login - navigate to citizen home
    router.push("/citizen/dashboard");
  };

  const handlePhoneLogin = (e) => {
    e.preventDefault();
    // Mock login - navigate to citizen home
    router.push("/citizen/dashboard");
  };

  const handleGoogleLogin = () => {
    // Mock Google login
    router.push("/citizen/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl mb-2 text-gray-900">Citizen Sign In</h1>
          <p className="text-gray-600">Welcome back! Access your account</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            {/* Tabs */}
            <div className="w-full mb-6">
              <div className="grid w-full grid-cols-2 bg-gray-100 rounded-md p-1">
                <button
                  onClick={() => setActiveTab("email")}
                  className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
                    activeTab === "email"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Email
                </button>
                <button
                  onClick={() => setActiveTab("phone")}
                  className={`px-3 py-2 text-sm font-medium rounded transition-colors ${
                    activeTab === "phone"
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Phone
                </button>
              </div>
            </div>

            {/* Email Login */}
            {activeTab === "email" && (
              <form onSubmit={handleEmailLogin} className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="text-right">
                  <button
                    type="button"
                    className="text-sm text-blue-600 hover:text-blue-700"
                  >
                    Forgot Password?
                  </button>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
                >
                  Sign In
                </button>
              </form>
            )}

            {/* Phone Login */}
            {activeTab === "phone" && (
              <form onSubmit={handlePhoneLogin} className="space-y-4">
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="otp"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    OTP (One-Time Password)
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      maxLength={6}
                      required
                    />
                    <button
                      type="button"
                      className="px-4 py-3 border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-md whitespace-nowrap transition-colors"
                    >
                      Send OTP
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Mock: OTP will be sent to your phone
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-md transition-colors"
                >
                  Verify & Sign In
                </button>
              </form>
            )}

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Login */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full py-3 border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-md flex items-center justify-center transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Sign in with Google
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <p className="text-center mt-6 text-gray-600">
          Dont have an account?{" "}
          <button
            onClick={() => router.push("/auth/citizen/signup")}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}
