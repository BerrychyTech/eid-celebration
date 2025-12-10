import ContactHero from "@/components/contact_page/ContactHero";
import ContactOptions from "@/components/contact_page/ContactOptions";
import ContactForm from "@/components/contact_page/ContactForm";
import ContactMap from "@/components/contact_page/ContactMap";
import ContactPAQs from "@/components/contact_page/ContactPAQs";
import WhatsAppButton from "@/components/contact_page/WhatsAppButton";
import Header from "@/components/Navbar";
import Footer from "@/components/Footer";
export default function ContactPage() {
  return (
    <main className="bg-background dark:bg-dark-background text-text dark:text-dark-text font-poppins">
      <Header/>
      <ContactHero />
      <ContactOptions />
      <ContactForm />
      <ContactMap />
      <ContactPAQs />
      <WhatsAppButton />
      <Footer/>
    </main>
  );
}
