"use client";

import Navigation from "@/components/Navigation";
import PageTransition from "@/components/PageTransition";

export default function About() {
  return (
    <>
      <Navigation />
      <PageTransition>
        <section className="relative w-full min-w-full h-screen px-12 py-8 md:px-16 flex justify-center items-center">
          <h1 className="w-3/4 max-lg:w-full text-[7.5rem] max-lg:text-5xl font-medium tracking-[-0.2rem] max-lg:tracking-tight leading-none">
            About
          </h1>
        </section>
      </PageTransition>
    </>
  );
}

