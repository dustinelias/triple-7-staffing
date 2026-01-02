"use client";

import Script from "next/script";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";

export default function Contact() {
  return (
    <>
      <Navigation />
      <Script
        src="https://assets.calendly.com/assets/external/widget.js"
        strategy="lazyOnload"
      />
      <PageTransition>
        {/* Hero Section */}
        <section className="relative w-full px-8 md:px-16 pt-32 pb-8 flex flex-col justify-center">
          <div className="max-w-7xl mx-auto w-full">
            <p className="text-[#5f5f5f] text-lg mb-4 tracking-wide">Get in touch</p>
            <h1 className="text-[4.5rem] max-lg:text-5xl max-md:text-4xl font-medium tracking-[-0.15rem] max-lg:tracking-tight leading-[1.05] mb-6">
              Let&apos;s work <span className="text-[#5f5f5f]">together</span>
            </h1>
            <p className="text-[#8f8f8f] text-lg max-w-xl leading-relaxed">
              Book a 30-minute call to discuss your production needs. We&apos;ll match you with the perfect crew.
            </p>
          </div>
        </section>

        {/* Calendly Section */}
        <section className="relative w-full px-8 md:px-16 py-8">
          <div className="max-w-5xl mx-auto">
            <div 
              className="calendly-inline-widget rounded-lg overflow-hidden" 
              data-url="https://calendly.com/triple7staffing/30min?primary_color=00cbff&background_color=171717&text_color=ffffff"
              style={{ minWidth: "320px", height: "700px" }}
            />
          </div>
        </section>

        {/* Contact Info */}
        <section className="relative w-full px-8 md:px-16 py-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <h3 className="text-[#5f5f5f] text-sm tracking-widest uppercase mb-4">Email</h3>
              <a href="mailto:hello@tripleseven.com" className="text-xl hover:text-[#00cbff] transition-colors duration-300">
                dustinelias1@gmail.com
              </a>
            </div>
            <div>
              <h3 className="text-[#5f5f5f] text-sm tracking-widest uppercase mb-4">Phone</h3>
              <a href="tel:+1917 674005" className="text-xl hover:text-[#00cbff] transition-colors duration-300">
                +1 917 767 4005
              </a>
            </div>
            <div>
              <h3 className="text-[#5f5f5f] text-sm tracking-widest uppercase mb-4">Locations</h3>
              <p className="text-xl text-[#8f8f8f]">New York · Los Angeles · San Francisco</p>
            </div>
          </div>
        </section>

        {/* Footer spacer */}
        <div className="h-20" />
      </PageTransition>
    </>
  );
}
