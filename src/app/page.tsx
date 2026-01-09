"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import SmoothScroll from "@/components/SmoothScroll";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

export default function Home() {
  useEffect(() => {
    console.log("🏠 [Home] Component mounted");
    gsap.registerPlugin(CustomEase, SplitText);
    CustomEase.create("hop", ".87,0,.13,1");

    const container = document.querySelector(".container");
    console.log("📦 [Home] Container found:", !!container);
    
    // Fade in container
    gsap.set(container, { opacity: 0 });
    console.log("👻 [Home] Container set to opacity: 0");
    
    gsap.to(container, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out",
      onStart: () => console.log("✨ [Home] Container fade-in START"),
      onComplete: () => console.log("✅ [Home] Container fade-in COMPLETE"),
    });

    // Animate hero text on load
    const heroTitle = document.querySelector(".hero h1");
    if (heroTitle) {
      const titleText = heroTitle.textContent;
      console.log("📝 [Home] Found hero title:", titleText?.substring(0, 30) + "...");
      
      const heroSplit = SplitText.create(heroTitle as HTMLElement, {
        type: "lines,words",
        linesClass: "line-parent",
      });
      
      gsap.set(heroTitle, { perspective: 400 });
      gsap.set(heroSplit.words, { 
        opacity: 0,
        y: 100,
        rotateX: -90,
      });
      console.log("🔤 [Home] Split words prepared:", heroSplit.words.length);

      gsap.to(heroSplit.words, {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        ease: "hop",
        stagger: 0.02,
        delay: 0.3,
        onStart: () => console.log("🎨 [Home] Text animation START"),
        onComplete: () => console.log("✅ [Home] Text animation COMPLETE"),
      });
    }
  }, []);

  return (
    <>
      <SmoothScroll />
      <Navigation />
      <div className="container relative translate-y-0 bg-[#171717] text-white w-full min-w-full opacity-0" data-page-content>
        <section className="hero relative w-full min-w-full h-screen px-6 sm:px-12 py-8 md:px-16 flex flex-col justify-center items-center overflow-hidden -z-10">
          <h1 className="w-full lg:w-3/4 text-[clamp(4rem,8vw,7.5rem)] font-medium tracking-tight lg:tracking-[-0.2rem] leading-[1.1] mb-8 sm:mb-12">
            Premium crews for ambitious productions
          </h1>
          
          {/* CTA Buttons */}
          <div className="w-full lg:w-3/4 flex flex-wrap gap-4 sm:gap-6 pb-32 lg:pb-40">
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 bg-white text-[#0f0f0f] font-medium text-base sm:text-lg rounded-full hover:bg-[#e0e0e0] transition-all duration-300"
            >
              <span>Book a Call</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="group-hover:translate-x-1 transition-transform duration-300"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="/services"
              className="group inline-flex items-center gap-3 px-6 sm:px-8 py-3 sm:py-4 border border-white/30 text-white font-medium text-base sm:text-lg rounded-full hover:bg-white/10 hover:border-white/50 transition-all duration-300"
            >
              <span>Learn More</span>
              <svg
                width="18"
                height="18"
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
          
          {/* Client Logos Marquee */}
          <div className="absolute bottom-[90px] sm:bottom-20 left-0 w-full flex flex-col items-center gap-4 sm:gap-8">
            <p className="text-white/50 text-sm uppercase tracking-[0.2em]">Proudly trusted by</p>
            <div className="logo-marquee-container relative w-full overflow-hidden">
              {/* Fade masks - aligned with hero text edges (22.5% + padding for 55% content) */}
              <div className="absolute left-0 top-0 h-full w-[calc(28.5%+48px)] md:w-[calc(28.5%+64px)] z-10 bg-gradient-to-r from-[#171717] via-[#171717] to-transparent pointer-events-none" />
              <div className="absolute right-0 top-0 h-full w-[calc(28.5%+48px)] md:w-[calc(28.5%+64px)] z-10 bg-gradient-to-l from-[#171717] via-[#171717] to-transparent pointer-events-none" />
              
              {/* Scrolling logos - duplicated for seamless loop */}
              <div className="logo-marquee flex items-center gap-10 sm:gap-20">
                {/* First set of logos */}
                <div className="logo-marquee-content flex items-center gap-10 sm:gap-20 shrink-0">
                  <Image src="/client-logos.png" alt="Client logos" width={1200} height={72} className="h-[40px] sm:h-[56px] md:h-[72px] w-auto object-contain opacity-70" />
                </div>
                {/* Duplicate for seamless infinite scroll */}
                <div className="logo-marquee-content flex items-center gap-10 sm:gap-20 shrink-0">
                  <Image src="/client-logos.png" alt="Client logos" width={1200} height={72} className="h-[40px] sm:h-[56px] md:h-[72px] w-auto object-contain opacity-70" />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="banner relative w-full min-w-full h-[35vh] px-12 py-8 md:px-16 flex justify-center items-center overflow-hidden -z-10">
          <Image src="/hero.jpg" alt="Hero background" fill className="object-cover opacity-50" />
        </section>
        {/* Footer */}
        <footer className="relative w-full bg-[#0f0f0f] px-6 sm:px-12 md:px-16 pt-20 sm:pt-32 pb-8">
          <div className="max-w-7xl mx-auto">
            {/* Main Footer Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16 sm:mb-24">
              {/* Left - Tagline */}
              <div>
                <h2 className="text-[clamp(1.5rem,4vw,3rem)] font-medium tracking-tight leading-[1.2] mb-6">
                  Where talent meets<br />
                  <span className="text-[#5f5f5f]">opportunity</span>
                </h2>
                <Link
                  href="/contact"
                  className="group inline-flex items-center gap-3 px-6 py-3 bg-white text-[#0f0f0f] font-medium text-base rounded-full hover:bg-[#e0e0e0] transition-all duration-300"
                >
                  <span>Get Started</span>
                  <svg
                    width="16"
                    height="16"
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
              
              {/* Right - Links & Info */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-8">
                <div>
                  <h4 className="text-[#5f5f5f] text-xs sm:text-sm uppercase tracking-widest mb-4">Navigate</h4>
                  <ul className="space-y-2">
                    <li><Link href="/" className="text-white/70 hover:text-white transition-colors">Home</Link></li>
                    <li><Link href="/services" className="text-white/70 hover:text-white transition-colors">Services</Link></li>
                    <li><Link href="/about" className="text-white/70 hover:text-white transition-colors">About</Link></li>
                    <li><Link href="/contact" className="text-white/70 hover:text-white transition-colors">Contact</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-[#5f5f5f] text-xs sm:text-sm uppercase tracking-widest mb-4">Locations</h4>
                  <ul className="space-y-2 text-white/50">
                    <li>New York</li>
                    <li>Miami</li>
                    <li>Tampa</li>
                    <li>Austin</li>
                    <li>Chicago</li>
                    <li>Los Angeles</li>
                    <li>San Francisco</li>
                  </ul>
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <h4 className="text-[#5f5f5f] text-xs sm:text-sm uppercase tracking-widest mb-4">Contact</h4>
                  <ul className="space-y-2">
                    <li><a href="mailto:dustinelias1@gmail.com" className="text-white/70 hover:text-white transition-colors text-sm sm:text-base">dustinelias1@gmail.com</a></li>
                    <li><a href="tel:+19177674005" className="text-white/70 hover:text-white transition-colors">+1 917 767 4005</a></li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Bottom Bar */}
            <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
              <p className="text-white/30 text-sm">© 2026 Triple Seven Staffing. All rights reserved.</p>
              <div className="flex items-center gap-2">
                <Image src="/logo.png" alt="Triple Seven" width={24} height={24} className="opacity-50" />
                <span className="text-white/30 text-sm">777</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
