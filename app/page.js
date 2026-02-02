"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col bg-white overflow-hidden">
      {/* Navbar */}

      {/* Hero Section */}
      <main className="flex flex-1 overflow-hidden md:flex-row items-center justify-between px-10 lg:px-20 py-16">
        {/* Left Content */}
        <div className="max-w-lg space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
            Secure your files
            <br /> Access anywhere.
          </h1>
          <p className="text-lg text-gray-600">
            End-to-end encrypted storage for peace of mind, with instant access
            across all your devices.
          </p>
          <div className="flex space-x-4">
            <button onClick={()=>{router.push('/login')}} className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-[#1556ec] cursor-pointer">
              Sign In
            </button>
            <button className="px-6 py-3 border rounded-md hover:outline hover:outline-gray-500 cursor-pointer">
              Get Started
            </button>
          </div>
        </div>

        {/* Right Content (Mock UI Preview) */}
        <div className="mt-12 md:mt-0 md:ml-10">
          <Image
            src="/upload.png"
            alt="Landscape picture"
            width={550}
            height={500}
          />
        </div>
      </main>

    </div>
  );
}