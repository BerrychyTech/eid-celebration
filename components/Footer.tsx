// File: /components/Footer.tsx
"use client";

import {
  FaPhoneAlt,
  FaEnvelope,
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaLinkedin,
  FaFileAlt,
  FaGasPump,
  FaHandshake,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-cardBg dark:bg-dark-cardBg text-text dark:text-dark-text mt-16 border-t border-muted/20 dark:border-dark-muted/20 font-poppins">
      <div className="max-w-7xl mx-auto px-4 py-10">
        
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">

          {/* Contact */}
          <section>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <FaPhoneAlt className="text-primary dark:text-dark-primary" />
              Contact
            </h4>
            <p className="flex items-center gap-2">
              <FaEnvelope className="text-xs" /> hello@berrygo.africa
            </p>
            <p className="flex items-center gap-2 mt-1">
              <FaPhoneAlt className="text-xs" /> +234 800 000 0000
            </p>
          </section>

          {/* Socials */}
          <section>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <FaInstagram className="text-primary dark:text-dark-primary" />
              Follow us
            </h4>
            <div className="flex gap-4 text-lg">
              <a href="#" className="hover:text-primary dark:hover:text-dark-primary transition">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-primary dark:hover:text-dark-primary transition">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-primary dark:hover:text-dark-primary transition">
                <FaTiktok />
              </a>
              <a href="#" className="hover:text-primary dark:hover:text-dark-primary transition">
                <FaLinkedin />
              </a>
            </div>
          </section>

          {/* Legal */}
          <section>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <FaFileAlt className="text-primary dark:text-dark-primary" />
              Legal
            </h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="hover:text-primary dark:hover:text-dark-primary transition">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary dark:hover:text-dark-primary transition">
                Privacy Policy
              </a>
            </div>
          </section>

          {/* Operational */}
          <section>
            <h4 className="font-semibold mb-3 flex items-center gap-2">
              <FaGasPump className="text-primary dark:text-dark-primary" />
              Now Serving
            </h4>
            <p>Dutse • Hadejia • Gumel</p>

            <div className="mt-4">
              <h4 className="font-semibold mb-1 flex items-center gap-2">
                <FaHandshake className="text-primary dark:text-dark-primary" />
                Partner With Us
              </h4>
              <a
                href="#"
                className="inline-block mt-1 text-link dark:text-dark-link hover:underline transition"
              >
                Learn about fleet & driver partnerships →
              </a>
            </div>
          </section>

        </div>

        {/* Bottom */}
        <div className="pt-8 mt-10 border-t border-muted/20 dark:border-dark-muted/20 text-xs text-muted dark:text-dark-muted text-center">
          &copy; {new Date().getFullYear()} BerryGo Africa. All rights reserved.
        </div>

      </div>
    </footer>
  );
}
