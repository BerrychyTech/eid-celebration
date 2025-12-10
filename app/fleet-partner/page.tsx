"use client";

import React from "react";
import Hero from "@/components/become-fleet-partner_page/Hero";
import WhoCanRegister from "@/components/become-fleet-partner_page/WhoCanRegister";
import Benefits from "@/components/become-fleet-partner_page/Benefits";
import Earnings from "@/components/become-fleet-partner_page/Earnings";
import StepsToJoin from "@/components/become-fleet-partner_page/StepsToJoin";
import Requirements from "@/components/become-fleet-partner_page/Requirements";
import AppPreview from "@/components/become-fleet-partner_page/AppPreview";
import FAQ from "@/components/become-fleet-partner_page/FAQ";
import Testimonials from "@/components/become-fleet-partner_page/Testimonials";
import ApplyForm from "@/components/become-fleet-partner_page/ApplyFleetForm";
import FinalCTA from "@/components/become-fleet-partner_page/FinalCTA";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function FleetPartnerPage() {
  return (
    <main className="font-poppins">
      <Header/>  
      <Hero />
      <WhoCanRegister />
      <Benefits />
      <Earnings />
      <StepsToJoin />
      <Requirements />
      <AppPreview />
      <FAQ />
      <Testimonials />
      <ApplyForm />
      <FinalCTA />
      <Footer/>
    </main>
  );
}
