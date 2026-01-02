"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";

interface SplitTextInstance {
  lines: Element[];
}

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const isAnimating = useRef(false);
  const splitTextByContainer = useRef<SplitTextInstance[][]>([]);
  const router = useRouter();

  useEffect(() => {
    gsap.registerPlugin(CustomEase, SplitText);
    CustomEase.create("hop", ".87,0,.13,1");

    const textContainers = document.querySelectorAll(".menu-col");
    splitTextByContainer.current = [];

    textContainers.forEach((container) => {
      const textElements = container.querySelectorAll("a, p");
      const containerSplits: SplitTextInstance[] = [];

      textElements.forEach((element) => {
        const split = SplitText.create(element as HTMLElement, {
          type: "lines",
          linesClass: "line",
        }) as SplitTextInstance;
        containerSplits.push(split);
        gsap.set(split.lines, { y: "-110%" });
      });

      splitTextByContainer.current.push(containerSplits);
    });
  }, []);

  // Keep page content hidden during navigation
  useEffect(() => {
    if (isNavigating) {
      console.log("🔄 [Navigation useEffect] isNavigating is TRUE, hiding all page content");
      const allContent = document.querySelectorAll(".container, [data-page-content]");
      console.log("📦 [Navigation useEffect] Found page elements:", allContent.length);
      allContent.forEach(el => {
        gsap.set(el, { opacity: 0 });
      });
    }
  }, [isNavigating]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (isAnimating.current) return;
    
    console.log("🔗 [Navigation] Link clicked:", href);
    
    // Set navigating state
    setIsNavigating(true);
    console.log("🚀 [Navigation] isNavigating set to TRUE");
    
    // Hide ALL page content immediately
    const allContainers = document.querySelectorAll(".container, [data-page-content]");
    console.log("📦 [Navigation] Found page elements:", allContainers.length);
    allContainers.forEach(el => {
      gsap.set(el, { opacity: 0 });
    });
    console.log("👻 [Navigation] All page content set to opacity: 0");
    
    // Close menu animation, then navigate after delay
    closeMenu(() => {
      console.log("✅ [Navigation] Close animation complete");
      // Wait a small moment before navigating to ensure animation is truly done
      setTimeout(() => {
        console.log("🚀 [Navigation] Navigating to:", href);
        router.push(href);
        // Reset after new page has had time to mount
        setTimeout(() => {
          setIsNavigating(false);
          console.log("🏁 [Navigation] isNavigating set to FALSE");
        }, 200);
      }, 50);
    });
  };

  const closeMenu = (callback?: () => void) => {
    if (!isMenuOpen) return;

    const menuToggleLabel = document.querySelector(".menu-toggle-label p");
    const menuOverlay = document.querySelector(".menu-overlay");
    const menuOverlayContainer = document.querySelector(".menu-overlay-content");
    const menuMediaWrapper = document.querySelector(".menu-media-wrapper");
    const copyContainers = document.querySelectorAll(".menu-col");
    const hamburgerIcon = document.querySelector(".menu-hamburger-icon");

    isAnimating.current = true;
    hamburgerIcon?.classList.remove("active");
    const tl = gsap.timeline();

    // Animate menu overlay closing
    tl.to(
        menuOverlay,
        {
          clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          duration: 1,
          ease: "hop",
        }
      )
      .to(
        menuOverlayContainer,
        {
          yPercent: -50,
          duration: 1,
          ease: "hop",
        },
        "<"
      )
      .to(
        menuToggleLabel,
        {
          y: "0%",
          duration: 1,
          ease: "hop",
        },
        "<"
      )
      .to(
        copyContainers,
        {
          opacity: 0.25,
          duration: 1,
          ease: "hop",
        },
        "<"
      );

    tl.call(() => {
      console.log("🎯 [Navigation] Menu close animation finished");
      
      splitTextByContainer.current.forEach((containerSplits) => {
        const copyLines = containerSplits.flatMap((split: SplitTextInstance) => split.lines);
        gsap.set(copyLines, { y: "-110%" });
      });

      gsap.set(copyContainers, { opacity: 1 });
      gsap.set(menuMediaWrapper, { opacity: 0 });

      isAnimating.current = false;
      setIsMenuOpen(false);
      
      // Call callback after animation completes (for navigation)
      if (callback) {
        callback();
      } else {
        // If just closing (X button), make sure all page content is visible
        const allContent = document.querySelectorAll(".container, [data-page-content]");
        allContent.forEach(el => {
          gsap.set(el, { opacity: 1 });
        });
        setIsNavigating(false);
      }
    });
  };

  const handleMenuToggle = () => {
    if (isAnimating.current) return;

    const container = document.querySelector(".container");
    const menuToggleLabel = document.querySelector(".menu-toggle-label p");
    const menuOverlay = document.querySelector(".menu-overlay");
    const menuOverlayContainer = document.querySelector(".menu-overlay-content");
    const menuMediaWrapper = document.querySelector(".menu-media-wrapper");
    const hamburgerIcon = document.querySelector(".menu-hamburger-icon");

    if (!isMenuOpen) {
      isAnimating.current = true;

      const tl = gsap.timeline();

      tl.to(
        menuToggleLabel,
        {
          y: "-110%",
          duration: 1,
          ease: "hop",
        },
        "<"
      )
        .to(
          container,
          {
            y: "100svh",
            duration: 1,
            ease: "hop",
          },
          "<"
        )
        .to(
          menuOverlay,
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1,
            ease: "hop",
          },
          "<"
        )
        .to(
          menuOverlayContainer,
          {
            yPercent: 0,
            duration: 1,
            ease: "hop",
          },
          "<"
        )
        .to(
          menuMediaWrapper,
          {
            opacity: 1,
            duration: 0.75,
            ease: "power2.out",
            delay: 0.5,
          },
          "<"
        );

      splitTextByContainer.current.forEach((containerSplits) => {
        const copyLines = containerSplits.flatMap((split: SplitTextInstance) => split.lines);
        tl.to(
          copyLines,
          {
            y: "0%",
            duration: 2,
            ease: "hop",
            stagger: -0.075,
          },
          -0.15
        );
      });

      hamburgerIcon?.classList.add("active");

      tl.call(() => {
        isAnimating.current = false;
      });

      setIsMenuOpen(true);
    } else {
      closeMenu();
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-[2]">
      <div className="menu-bar fixed top-0 left-0 w-full px-8 py-8 md:px-12 lg:px-16 flex justify-between items-center pointer-events-auto text-[#5f5f5f] z-[2]">
        <div className="menu-logo w-8 h-8">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={32} height={32} className="w-full h-full object-cover" />
          </Link>
        </div>
        <div className="menu-toggle-btn flex items-center gap-4 cursor-pointer" onClick={handleMenuToggle}>
          <div className="menu-toggle-label overflow-hidden">
            <p className="relative text-[0.95rem] font-medium">Menu</p>
          </div>
          <div className="menu-hamburger-icon relative w-12 h-12 flex flex-col justify-center items-center gap-1 border border-[rgba(255,255,255,0.1)] rounded-full">
            <span className="absolute w-[15px] h-[1.25px] bg-white"></span>
            <span className="absolute w-[15px] h-[1.25px] bg-white"></span>
          </div>
        </div>
      </div>
      <div className="menu-overlay fixed top-0 left-0 w-full h-full text-white overflow-hidden z-[1] bg-[#0f0f0f]">
        <div className="menu-overlay-content absolute top-0 left-0 w-full h-full text-white overflow-hidden flex -translate-y-1/2 pointer-events-auto">
          <div className="menu-media-wrapper flex-[2] opacity-0 max-lg:hidden relative">
            <Image src="/menu-media.jpg" alt="Menu background" fill className="object-cover opacity-25" />
          </div>
          <div className="menu-content-wrapper flex-[3] relative flex">
            <div className="menu-content-main absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 max-lg:w-full p-8 flex items-end gap-8 max-lg:flex-col max-lg:items-start max-lg:gap-20">
              <div className="menu-col flex flex-col gap-2 flex-[3]">
                <div className="menu-link">
                  <Link href="/" onClick={(e) => handleLinkClick(e, "/")} className="text-[3.5rem] max-lg:text-5xl font-medium leading-tight no-underline text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 ease-out inline-block">
                    Home
                  </Link>
                </div>
                <div className="menu-link">
                  <Link href="/services" onClick={(e) => handleLinkClick(e, "/services")} className="text-[3.5rem] max-lg:text-5xl font-medium leading-tight no-underline text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 ease-out inline-block">
                    Services
                  </Link>
                </div>
                <div className="menu-link">
                  <Link href="/about" onClick={(e) => handleLinkClick(e, "/about")} className="text-[3.5rem] max-lg:text-5xl font-medium leading-tight no-underline text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 ease-out inline-block">
                    About
                  </Link>
                </div>
                <div className="menu-link">
                  <Link href="/contact" onClick={(e) => handleLinkClick(e, "/contact")} className="text-[3.5rem] max-lg:text-5xl font-medium leading-tight no-underline text-white/70 hover:text-white hover:translate-x-2 transition-all duration-300 ease-out inline-block">
                    Contact
                  </Link>
                </div>
              </div>

              <div className="menu-col flex flex-col gap-2 flex-[2]">
                <div className="menu-tag">
                  <span className="text-2xl max-lg:text-xl font-medium text-[#5f5f5f] ">
                    Creative Production
                  </span>
                </div>
                <div className="menu-tag">
                  <span className="text-2xl max-lg:text-xl font-medium text-[#5f5f5f]">
                    Immersive / Experiential
                  </span>
                </div>
                <div className="menu-tag">
                  <span className="text-2xl max-lg:text-xl font-medium text-[#5f5f5f]">
                    Photo Shoots & Motion
                  </span>
                </div>
                <div className="menu-tag">
                  <span className="text-2xl max-lg:text-xl font-medium text-[#5f5f5f]">
                    Fabrication
                  </span>
                </div>
                <div className="menu-tag">
                  <span className="text-2xl max-lg:text-xl font-medium text-[#5f5f5f]">
                    Events
                  </span>
                </div>
                <div className="menu-tag">
                  <span className="text-2xl max-lg:text-xl font-medium text-[#5f5f5f]">
                    Pop Ups
                  </span>
                </div>
                <div className="menu-tag">
                  <span className="text-2xl max-lg:text-xl font-medium text-[#5f5f5f]">
                    Runway Shows
                  </span>
                </div>
              </div>
            </div>
            <div className="menu-footer mx-auto w-3/4 max-lg:w-full p-8 flex items-end gap-8">
              <div className="menu-col flex flex-col gap-2 flex-[3]">
                <p className="text-[0.95rem] font-medium text-[#5f5f5f]">New York</p>
                <p className="text-[0.95rem] font-medium text-[#5f5f5f]">Los Angeles</p>
                <p className="text-[0.95rem] font-medium text-[#5f5f5f]">San Francisco</p>
              </div>
              <div className="menu-col flex flex-col gap-2 flex-[2]">
                <p className="text-[0.95rem] font-medium text-[#5f5f5f]">+1 917 767 4005</p>
                <p className="text-[0.95rem] font-medium text-[#5f5f5f]">dustinelias1@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

