"use client";

import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";

export default function About() {
  return (
    <>
      <Navigation />
      <PageTransition>
        <section className="relative w-full min-w-full h-screen px-6 sm:px-12 py-8 md:px-16 flex justify-center items-center">
          <h1 className="w-full lg:w-3/4 text-[clamp(2rem,8vw,7.5rem)] font-medium tracking-tight lg:tracking-[-0.2rem] leading-[1.1]">
            About
          </h1>
        </section>
      </PageTransition>
    </>
  );
}

