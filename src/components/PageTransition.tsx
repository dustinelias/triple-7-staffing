"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    console.log("🎬 [PageTransition] Component mounted");
    gsap.registerPlugin(CustomEase, SplitText);
    CustomEase.create("hop", ".87,0,.13,1");

    if (containerRef.current) {
      console.log("📦 [PageTransition] Container ref found");
      
      // Keep container hidden initially
      gsap.set(containerRef.current, { opacity: 0 });
      console.log("👻 [PageTransition] Container set to opacity: 0");
      
      // Start fading in immediately - menu is already closed by the time this mounts
      gsap.to(containerRef.current, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
        delay: 0, // No delay - start immediately
        onStart: () => console.log("✨ [PageTransition] Container fade-in START"),
        onComplete: () => console.log("✅ [PageTransition] Container fade-in COMPLETE"),
      });

      // Animate text if present
      const pageTitle = containerRef.current.querySelector("h1");
      if (pageTitle) {
        const titleText = pageTitle.textContent;
        console.log("📝 [PageTransition] Found title:", titleText);
        
        const split = SplitText.create(pageTitle as HTMLElement, {
          type: "lines,words",
          linesClass: "line-parent",
        });

        gsap.set(pageTitle, { perspective: 400 });
        gsap.set(split.words, {
          opacity: 0,
          y: 100,
          rotateX: -90,
        });
        console.log("🔤 [PageTransition] Split words prepared:", split.words.length);

        gsap.to(split.words, {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.2,
          ease: "hop",
          stagger: 0.02,
          delay: 0.2, // Start shortly after container begins fading
          onStart: () => console.log("🎨 [PageTransition] Text animation START for:", titleText),
          onComplete: () => console.log("✅ [PageTransition] Text animation COMPLETE for:", titleText),
        });
      } else {
        console.log("⚠️ [PageTransition] No h1 title found");
      }
    }
  }, []);

  return (
    <div ref={containerRef} data-page-content className="relative w-full min-w-full min-h-screen bg-[#171717] text-white opacity-0">
      {children}
    </div>
  );
}

