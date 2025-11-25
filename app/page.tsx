// /app/page.tsx
// ---------------
// Server Component (default in Next.js)
// Individual sections can be client components if needed.

import Header from "@/components/Navbar";
import Hero from "@/components/home_page/Hero";
import WhyBerryGo from "@/components/home_page/WhyBerryGo";
import HowItWorks from "@/components/home_page/HowItWorks";
import BookingPreview from "@/components/home_page/BokingPreview";
import WhoItsFor from "@/components/home_page/WhoItsFor";
import LaunchPromos from "@/components/home_page/LaunchPromos";
import NewsletterSignup from "@/components/home_page/NewsletterSignup";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      {/* TOP NAVBAR / HEADER */}
      <Header />

      {/* MAIN CONTENT */}
      <main className="min-h-screen w-full">
        <Hero />
        <WhyBerryGo />
        <HowItWorks />
        <BookingPreview />
        <WhoItsFor />
        <LaunchPromos />
        <NewsletterSignup />
      </main>

      {/* FOOTER */}
      <Footer />
    </>
  );
}
