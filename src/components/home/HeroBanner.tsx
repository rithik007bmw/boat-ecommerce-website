import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Volume2, BatteryCharging, ShieldCheck } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#EFE9DF] via-[#F5EFE7] to-[#FBF8F3] border border-[#E6E1D8] shadow-sm mb-10">
      {/* Decorative background shapes */}
      <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 rounded-full bg-[#D99A9E]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -mb-12 w-64 h-64 rounded-full bg-[#A94F55]/10 blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-10 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            {/* Tag chip */}
            <div className="inline-flex items-center gap-2 bg-[#A94F55]/10 border border-[#A94F55]/20 text-[#A94F55] text-xs font-bold px-3.5 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-[#A94F55] animate-ping" />
              <span>Flagship Acoustic Series</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-[#292929] tracking-tight leading-[1.15]">
              Less noise.<br />
              <span className="text-[#A94F55]">More you.</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base text-[#706B65] max-w-xl mx-auto lg:mx-0 leading-relaxed font-normal">
              Introducing boAt Nirvana 751 ANC. Crafted with 33dB Hybrid Active Noise Cancellation, custom 40mm titanium drivers, and an astonishing 65 hours of non-stop playback.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-1">
              <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-xl border border-[#E6E1D8] text-xs font-semibold text-[#292929]">
                <Volume2 className="w-4 h-4 text-[#A94F55]" />
                <span>33dB Hybrid ANC</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-xl border border-[#E6E1D8] text-xs font-semibold text-[#292929]">
                <BatteryCharging className="w-4 h-4 text-[#A94F55]" />
                <span>65H Battery Life</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-xl border border-[#E6E1D8] text-xs font-semibold text-[#292929]">
                <ShieldCheck className="w-4 h-4 text-[#A94F55]" />
                <span>ASAP Fast Charge</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 pt-3">
              <Link
                to="/category/headphones"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#A94F55] text-white font-bold px-7 py-3.5 rounded-full hover:bg-[#8E3E43] transition-all transform active:scale-95 shadow-md shadow-[#A94F55]/20 group"
              >
                <span>Shop Headphones</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/product/boat-nirvana-751-anc"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/90 text-[#292929] font-bold px-6 py-3.5 rounded-full hover:bg-white border border-[#E6E1D8] transition-colors"
              >
                Explore Nirvana 751
              </Link>
            </div>
          </div>

          {/* Right Product Image Presentation */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            {/* Visual halo disc */}
            <div className="w-72 sm:w-88 h-72 sm:h-88 rounded-full bg-white/70 shadow-inner flex items-center justify-center p-6 border border-[#E6E1D8]">
              <img
                src="https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=900&auto=format&fit=crop&q=80"
                alt="boAt Nirvana 751 ANC Headphones"
                className="w-full h-full object-contain filter drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Floating Price Tag */}
            <div className="absolute -bottom-3 right-4 sm:right-8 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-[#E6E1D8] shadow-lg flex items-center gap-3">
              <div>
                <p className="text-[10px] uppercase font-bold text-[#8E8983]">Starting At</p>
                <p className="text-base font-extrabold text-[#292929]">₹3,499</p>
              </div>
              <span className="text-[10px] font-bold text-[#2E7D32] bg-[#E8F5E9] px-2 py-0.5 rounded-full">
                56% OFF
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
