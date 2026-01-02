"use client";

import { useEffect } from "react";
import Image from "next/image";
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
          <h1 className="w-full lg:w-3/4 text-[clamp(2rem,8vw,7.5rem)] font-medium tracking-tight lg:tracking-[-0.2rem] leading-[1.1] pb-32 lg:pb-40">
            Exceptional crew for exceptional production
          </h1>
          
          {/* Client Logos Marquee */}
          <div className="absolute bottom-12 sm:bottom-20 left-0 w-full flex flex-col items-center gap-4 sm:gap-8">
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
        <section className="banner relative w-full min-w-full h-screen px-12 py-8 md:px-16 flex justify-center items-center overflow-hidden -z-10">
          <Image src="/hero.jpg" alt="Hero background" fill className="object-cover opacity-50" />
        </section>
        <section className="outro relative w-full min-w-full h-screen px-6 sm:px-12 py-8 md:px-16 flex justify-center items-center overflow-hidden -z-10">
          <h1 className="w-full lg:w-3/4 text-[clamp(2rem,8vw,7.5rem)] font-medium tracking-tight lg:tracking-[-0.2rem] leading-[1.1]">
            Where talent meets opportunity
          </h1>
        </section>
      </div>
    </>
  );
}
