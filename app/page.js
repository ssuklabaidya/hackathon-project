// app/page.jsx   ← put this in your app router root page

"use client";

import { useEffect } from "react";
import {
  Leaf,
  Recycle,
  Droplets,
  Sun,
  Heart,
  Trash2,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";
export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const container = document.getElementById("particles-container");
    if (!container) return;

    // Clear previous particles (useful for hot reload)
    container.innerHTML = "";

    for (let i = 0; i < 45; i++) {
      const particle = document.createElement("div");
      const size = 5 + Math.random() * 9;
      particle.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(167, 243, 208, ${0.25 + Math.random() * 0.45});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 130}%;
        pointer-events: none;
        z-index: 1;
        animation: particleDrift ${14 + Math.random() * 22}s linear infinite;
        animation-delay: ${Math.random() * -25}s;
      `;
      container.appendChild(particle);
    }

    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-emerald-950 via-teal-950 to-cyan-950 text-white">
      <style jsx global>{`
        @keyframes particleDrift {
          0% {
            transform: translate(0, 0) rotate(0deg);
            opacity: 0.2;
          }
          20% {
            transform: translate(70px, -90px) rotate(70deg);
            opacity: 0.55;
          }
          45% {
            transform: translate(-50px, -160px) rotate(150deg);
            opacity: 0.4;
          }
          70% {
            transform: translate(40px, -70px) rotate(260deg);
            opacity: 0.5;
          }
          100% {
            transform: translate(0, 0) rotate(360deg);
            opacity: 0.2;
          }
        }

        @keyframes gentleGlow {
          0%,
          100% {
            opacity: 0.75;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.07);
          }
        }

        @keyframes slowSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>

      {/* Floating particles layer */}
      <div
        id="particles-container"
        className="absolute inset-0 pointer-events-none"
      />

      {/* Soft radial glow overlays */}
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <div className="absolute -left-1/4 -top-1/4 w-3/4 h-3/4 rounded-full bg-emerald-400/10 blur-3xl animate-gentleGlow" />
        <div className="absolute -right-1/4 bottom-0 w-2/3 h-2/3 rounded-full bg-teal-400/10 blur-3xl animate-gentleGlow [animation-delay:5s]" />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-5 py-16 text-center">
        {/* Central animated icon + orbiting accents */}
        <div className="relative mb-12 md:mb-16">
          <div className="mx-auto h-32 w-32 md:h-40 md:w-40 rounded-full bg-gradient-to-br from-emerald-600/95 to-teal-700/90 flex items-center justify-center shadow-2xl shadow-emerald-950/50">
            <Recycle
              size={72}
              className="text-emerald-50 animate-slowSpin"
              strokeWidth={1.5}
            />
          </div>

          <div className="absolute -top-5 -right-5 animate-gentleGlow">
            <Leaf size={36} className="text-emerald-300/90" />
          </div>
          <div className="absolute -bottom-7 -left-7 animate-gentleGlow [animation-delay:2s]">
            <Droplets size={32} className="text-cyan-300/85" />
          </div>
          <div className="absolute top-10 -right-12 animate-gentleGlow [animation-delay:3.5s]">
            <Sun size={28} className="text-amber-300/75" />
          </div>
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-200 via-teal-200 to-cyan-200 bg-clip-text text-transparent mb-6">
          Clean Today,
          <br className="sm:hidden" /> Thriving Tomorrow
        </h1>

        <p className="text-lg sm:text-xl md:text-2xl text-emerald-100/90 max-w-3xl mb-10 md:mb-14 leading-relaxed">
          Intelligent waste tracking • Real incentives • Circular cities
          <br className="hidden sm:block" />
          <span className="opacity-85">Turn waste into worth — together.</span>
        </p>

        <div className="flex flex-col sm:flex-row gap-6 md:gap-8 mb-12">
          <button
            onClick={() => router.push("/login/citizen")}
            className="group relative px-10 py-6 rounded-full bg-white text-emerald-950 font-semibold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 active:translate-y-0 transition-all duration-300"
          >
            Join as Citizen
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-300/20 to-teal-300/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </button>

          <button
            onClick={() => router.push("/login/collector")}
            className="px-10 py-6 rounded-full border-2 border-emerald-400/70 text-emerald-100 font-semibold text-lg hover:bg-emerald-900/40 hover:border-emerald-300 transition-all duration-300"
          >
            Become a Collector
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-10 text-sm sm:text-base opacity-75">
          <div className="flex items-center gap-2">
            <Trash2 size={18} />
            <span>Smart Sorting</span>
          </div>
          <div className="flex items-center gap-2">
            <Leaf size={18} />
            <span>Zero Waste Goal</span>
          </div>
          <div className="flex items-center gap-2">
            <Heart size={18} />
            <span>Eco Impact</span>
          </div>
        </div>
      </div>
    </div>
  );
}
