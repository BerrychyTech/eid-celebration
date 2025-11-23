// /app/page.tsx
// ---------------
// Server Component (default in Next.js)
// Individual sections can be client components if needed.

import Header from "@/componenets/Navbar";
import Hero from "@/componenets/home_page/Hero";
import WhyBerryGo from "@/componenets/home_page/WhyBerryGo";
import HowItWorks from "@/componenets/home_page/HowItWorks";
import BookingPreview from "@/componenets/home_page/BokingPreview";
import WhoItsFor from "@/componenets/home_page/WhoItsFor";
import LaunchPromos from "@/componenets/home_page/LaunchPromos";
import NewsletterSignup from "@/componenets/home_page/NewsletterSignup";
import Footer from "@/componenets/Footer";

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
