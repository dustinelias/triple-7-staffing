"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const productionTypes = [
  "Creative Production",
  "Immersive / Experiential",
  "Photo Shoots & Motion",
  "Fabrication",
  "Events",
  "Pop Ups",
  "Runway Shows",
  "Brand Activations",
  "Corporate",
  "Film & Television",
  "Music Videos",
  "Commercials",
];

const workerPositions = {
  id: "02",
  title: "Crew Positions",
  description: "Our network includes experienced professionals across every department and role.",
  items: [
    "Production Assistants",
    "Coordinators",
    "Project Managers",
    "Producers",
    "Graphic Designers",
    "Photographers",
    "Photo Assistants",
    "Stylists",
    "H&M",
    "Grips",
    "Muralists",
    "And More",
  ],
};

export default function Services() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Animate service cards on scroll
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll(".service-card");
      
      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
            delay: index * 0.08,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 100%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }

    // Animate CTA section
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <Navigation />
      <PageTransition>
        {/* Hero Section */}
        <section className="relative w-full min-h-screen px-6 sm:px-8 md:px-16 pt-24 sm:pt-32 pb-20 flex flex-col justify-center">
          <div className="max-w-7xl mx-auto w-full">
            <p className="text-[#5f5f5f] text-base sm:text-lg mb-4 tracking-wide">What we do</p>
            <h1 className="text-[clamp(2rem,7vw,6rem)] font-medium tracking-tight lg:tracking-[-0.15rem] leading-[1]">
              Production crews<br />
              <span className="text-[#5f5f5f]">without the hassle</span>
            </h1>
            
            {/* Abstract decorative element */}
            <div className="absolute top-1/2 right-16 max-lg:hidden -translate-y-1/2 w-px h-[40vh] bg-gradient-to-b from-transparent via-[#5f5f5f] to-transparent" />
          </div>
        </section>

        {/* Services Grid */}
        <section ref={cardsRef} className="relative w-full px-6 sm:px-8 md:px-16 py-12 sm:py-20">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
            {/* Production Types Card */}
            <div className="service-card group relative p-6 sm:p-8 md:p-12 border border-[#2a2a2a] rounded-sm bg-[#0f0f0f]/50 hover:bg-[#1a1a1a] hover:border-[#3a3a3a] transition-all duration-500">
              {/* Card number */}
              <span className="absolute top-6 right-6 sm:top-8 sm:right-8 md:top-12 md:right-12 text-[3rem] sm:text-[5rem] md:text-[7rem] font-bold text-[#1f1f1f] group-hover:text-[#2a2a2a] transition-colors duration-500 leading-none select-none">
                01
              </span>
              
              {/* Content */}
              <div className="relative z-10">
                <p className="text-[#5f5f5f] text-xs sm:text-sm uppercase tracking-[0.2em] mb-4 sm:mb-6">What We Do</p>
                
                {/* Production types as prominent list */}
                <div className="flex flex-col gap-2 sm:gap-3">
                  {productionTypes.map((item, index) => (
                    <div
                      key={item}
                      className="group/item flex items-center gap-3 sm:gap-4 py-1.5 sm:py-2 border-b border-[#2a2a2a] last:border-b-0 hover:border-[#3a3a3a] transition-all duration-300"
                    >
                      <span className="text-[#3a3a3a] text-xs sm:text-sm font-medium w-5 sm:w-6">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-base sm:text-xl md:text-2xl font-medium text-white/80 group-hover/item:text-white group-hover/item:translate-x-2 transition-all duration-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Crew Positions Card */}
            <div className="service-card group relative p-6 sm:p-8 md:p-12 border border-[#2a2a2a] rounded-sm bg-[#0f0f0f]/50 hover:bg-[#1a1a1a] hover:border-[#3a3a3a] transition-all duration-500">
              {/* Card number */}
              <span className="absolute top-6 right-6 sm:top-8 sm:right-8 md:top-12 md:right-12 text-[3rem] sm:text-[5rem] md:text-[7rem] font-bold text-[#1f1f1f] group-hover:text-[#2a2a2a] transition-colors duration-500 leading-none select-none">
                {workerPositions.id}
              </span>
              
              {/* Content */}
              <div className="relative z-10">
                <p className="text-[#5f5f5f] text-xs sm:text-sm uppercase tracking-[0.2em] mb-4 sm:mb-6">Who We Place</p>
                
                {/* Crew positions as prominent list */}
                <div className="flex flex-col gap-2 sm:gap-3">
                  {workerPositions.items.map((item, index) => (
                    <div
                      key={item}
                      className="group/item flex items-center gap-3 sm:gap-4 py-1.5 sm:py-2 border-b border-[#2a2a2a] last:border-b-0 hover:border-[#3a3a3a] transition-all duration-300"
                    >
                      <span className="text-[#3a3a3a] text-xs sm:text-sm font-medium w-5 sm:w-6">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-base sm:text-xl md:text-2xl font-medium text-white/80 group-hover/item:text-white group-hover/item:translate-x-2 transition-all duration-300">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Abstract divider */}
        <div className="w-full px-8 md:px-16 py-8">
          <div className="max-w-7xl mx-auto flex items-center gap-8">
            <div className="flex-1 h-px bg-gradient-to-r from-[#2a2a2a] to-transparent" />
            <span className="text-[#3a3a3a] text-sm tracking-widest">777</span>
            <div className="flex-1 h-px bg-gradient-to-l from-[#2a2a2a] to-transparent" />
          </div>
        </div>

        {/* CTA Section */}
        <section ref={ctaRef} className="relative w-full min-h-[70vh] px-6 sm:px-8 md:px-16 py-20 flex items-center justify-center">
          <div className="text-center max-w-3xl">
            <p className="text-[#5f5f5f] text-base sm:text-lg mb-6 tracking-wide">Ready to staff your next production?</p>
            <h2 className="text-[clamp(1.75rem,5vw,4rem)] font-medium tracking-tight lg:tracking-[-0.1rem] leading-[1.1] mb-12">
              Let&apos;s build your<br />
              <span className="text-[#5f5f5f]">dream crew</span>
            </h2>
            
            <Link
              href="/contact"
              className="group inline-flex items-center gap-4 px-8 py-4 bg-white text-[#0f0f0f] font-medium text-lg rounded-full hover:bg-[#e0e0e0] transition-all duration-300"
            >
              <span>Book a Call</span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Background abstract circles */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] rounded-full border border-[#1a1a1a] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full border border-[#1a1a1a] pointer-events-none" />
        </section>

        {/* Footer spacer */}
        <div className="h-32" />
      </PageTransition>
    </>
  );
}
