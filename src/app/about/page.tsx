"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const topRowImages = ["/1.png", "/2.png", "/3.png", "/4.png", "/5.png", "/6.png"];
const bottomRowImages = ["/7.png", "/8.png", "/9.png", "/10.png", "/11.png", "/12.png"];

export default function About() {
  const topRowRef = useRef<HTMLDivElement>(null);
  const bottomRowRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Top row: moves from left to right on scroll
    if (topRowRef.current && sectionRef.current) {
      gsap.fromTo(
        topRowRef.current,
        { x: "-20%" },
        {
          x: "10%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        }
      );
    }

    // Bottom row: moves from right to left on scroll
    if (bottomRowRef.current && sectionRef.current) {
      gsap.fromTo(
        bottomRowRef.current,
        { x: "10%" },
        {
          x: "-20%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
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
        <section className="relative w-full min-h-[85vh] sm:min-h-[90vh] px-6 sm:px-12 md:px-16 pt-24 sm:pt-32 pb-32 sm:pb-40 flex flex-col justify-center">
          <div className="max-w-5xl mx-auto w-full">
            <p className="text-[#5f5f5f] text-base sm:text-lg mb-4 sm:mb-6 tracking-wide">About Us</p>
            <h1 className="text-[clamp(2rem,6vw,5rem)] font-medium tracking-tight lg:tracking-[-0.15rem] leading-[1.1] mb-8 sm:mb-12">
              Experience meets<br />
              <span className="text-[#5f5f5f]">excellence</span>
            </h1>
            <p className="text-[#a0a0a0] text-lg sm:text-xl md:text-2xl leading-relaxed max-w-3xl">
              Backed by more than a decade of experience in production, we curate dedicated teams designed around your unique goals and requirements. Our commitment to a positive, professional working environment carries through every stage of the process.
            </p>
          </div>
        </section>

        {/* Scrolling Image Rows - pulled up to overlap hero */}
        <section ref={sectionRef} className="relative w-full py-12 sm:py-20 overflow-hidden -mt-[15vh] sm:-mt-[20vh]">
          {/* Top Row - Left to Right */}
          <div 
            ref={topRowRef}
            className="flex gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8"
          >
            {topRowImages.map((src, index) => (
              <div 
                key={src} 
                className="relative flex-shrink-0 w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px] aspect-[4/3] rounded-lg overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`Production image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Bottom Row - Right to Left */}
          <div 
            ref={bottomRowRef}
            className="flex gap-4 sm:gap-6 md:gap-8"
          >
            {bottomRowImages.map((src, index) => (
              <div 
                key={src} 
                className="relative flex-shrink-0 w-[250px] sm:w-[300px] md:w-[400px] lg:w-[500px] aspect-[4/3] rounded-lg overflow-hidden"
              >
                <Image
                  src={src}
                  alt={`Production image ${index + 7}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="relative w-full px-6 sm:px-12 md:px-16 py-20 sm:py-32">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
              <div>
                <span className="text-[#3a3a3a] text-sm font-medium mb-4 block">01</span>
                <h3 className="text-xl sm:text-2xl font-medium mb-4">Curated Teams</h3>
                <p className="text-[#8f8f8f] leading-relaxed">
                  Every crew member is hand-selected to match your project&apos;s specific needs and creative vision.
                </p>
              </div>
              <div>
                <span className="text-[#3a3a3a] text-sm font-medium mb-4 block">02</span>
                <h3 className="text-xl sm:text-2xl font-medium mb-4">Industry Veterans</h3>
                <p className="text-[#8f8f8f] leading-relaxed">
                  Our network includes seasoned professionals with experience across major brands and productions.
                </p>
              </div>
              <div>
                <span className="text-[#3a3a3a] text-sm font-medium mb-4 block">03</span>
                <h3 className="text-xl sm:text-2xl font-medium mb-4">Seamless Process</h3>
                <p className="text-[#8f8f8f] leading-relaxed">
                  From initial brief to wrap, we handle the logistics so you can focus on creating.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative w-full px-6 sm:px-12 md:px-16 py-20 sm:py-32 flex items-center justify-center">
          <div className="text-center max-w-3xl">
            <p className="text-[#5f5f5f] text-base sm:text-lg mb-6 tracking-wide">Ready to get started?</p>
            <h2 className="text-[clamp(1.75rem,5vw,4rem)] font-medium tracking-tight lg:tracking-[-0.1rem] leading-[1.1] mb-12">
              Let&apos;s bring your<br />
              <span className="text-[#5f5f5f]">vision to life</span>
            </h2>
            
            <a
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
            </a>
          </div>
        </section>

        {/* Footer spacer */}
        <div className="h-20 sm:h-32" />
      </PageTransition>
    </>
  );
}
