// app/logistics/page.tsx
import Hero from "@/components/logistics/Hero";
import DeliveryForm from "@/components/logistics/DeliveryForm";
import ActiveDeliveries from "@/components/logistics/ActiveDeliveries";
import DeliveryHistory from "@/components/logistics/DeliveryHistory";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LogisticsPage() {
  return (
    <div className="min-h-screen space-y-10 p-6">
      <Header/>
      <Hero />
      <DeliveryForm />
      <ActiveDeliveries />
      <DeliveryHistory />
      <Footer/>
    </div>
  );
}
