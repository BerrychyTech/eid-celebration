import { DriverHero } from "@/components/driver/Hero";
import { DriverBenefits } from "@/components/driver/Benefits";
import { DriverTestimonials } from "@/components/driver/Testimonials";
import { ApplyForm } from "@/components/driver/ApplyForm";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
import Earnings from "@/components/driver/Earnings";
import Requirements from "@/components/driver/Requirements";
import Steps from "@/components/driver/Steps";
import AppPreview from "@/components/driver/AppPreview";
import FAQ from "@/components/driver/FAQ";
import CTA from "@/components/driver/CTA";

export default function BecomeDriverPage() {
return (
<main>
<Header />    
<DriverHero />
<DriverBenefits />
<Requirements />
<Earnings />
<Steps />
<AppPreview />
<ApplyForm />
<FAQ />
<DriverTestimonials />
<CTA />
<Footer />
</main>
);
}