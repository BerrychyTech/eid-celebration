"use client";

import Header from "@/components/Navbar";
import Footer from "@/components/Footer";

import HeroSection from "@/components/about/HeroSection";
import MissionSection from "@/components/about/MissionSection";
import FeaturesSection from "@/components/about/FeaturesSection";
import HowItWorks from "@/components/about/HowItWorks";
import StorySection from "@/components/about/StorySection";
import ValuesSection from "@/components/about/ValuesSection";
import TestimonialsSection from "@/components/about/TestimonialsSection";
import SafetySection from "@/components/about/SafetySection";
import FAQSection from "@/components/about/FAQSection";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="bg-background dark:bg-dark-background text-text dark:text-dark-text font-poppins">

        <HeroSection />
        <MissionSection />
        <FeaturesSection />
        <HowItWorks />
        <StorySection />
        <ValuesSection />
        <TestimonialsSection />
        <SafetySection />
        <FAQSection />

      </main>
      <Footer />
    </>
  );
}
