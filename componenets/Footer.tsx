// File: /components/Footer.tsx
"use client";

export default function Footer() {
  return (
    <footer className="bg-cardBg dark:bg-dark-cardBg text-text dark:text-dark-text mt-16 border-t border-muted/20 dark:border-dark-muted/20 font-poppins">
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-8 text-sm">
        
        {/* Contact */}
        <div>
          <h4 className="font-semibold mb-1">📞 Contact</h4>
          <p>Email: hello@berrygo.africa</p>
          <p>Phone: +234 800 000 0000</p>
        </div>

        {/* Socials */}
        <div>
          <h4 className="font-semibold mb-1">🌐 Follow us</h4>
          <div className="flex gap-4">
            <a href="#" className="hover:text-primary dark:hover:text-dark-primary">Instagram</a>
            <a href="#" className="hover:text-primary dark:hover:text-dark-primary">Twitter</a>
            <a href="#" className="hover:text-primary dark:hover:text-dark-primary">TikTok</a>
            <a href="#" className="hover:text-primary dark:hover:text-dark-primary">LinkedIn</a>
          </div>
        </div>

        {/* Legal Links */}
        <div>
          <h4 className="font-semibold mb-1">🧾 Legal</h4>
          <div className="flex gap-6">
            <a href="#" className="hover:text-primary dark:hover:text-dark-primary">Terms of Service</a>
            <a href="#" className="hover:text-primary dark:hover:text-dark-primary">Privacy Policy</a>
          </div>
        </div>

        {/* Operational Info */}
        <div>
          <h4 className="font-semibold mb-1">⛽ Now Serving</h4>
          <p>Dutse • Hadejia • Gumel</p>
        </div>

        {/* Partner CTA */}
        <div>
          <h4 className="font-semibold mb-1">💼 Partner With Us</h4>
          <a
            href="#"
            className="inline-block mt-1 text-link dark:text-dark-link hover:underline"
          >
            Learn more about fleet or driver partnerships →
          </a>
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-muted/20 dark:border-dark-muted/20 text-xs text-muted dark:text-dark-muted">
          &copy; {new Date().getFullYear()} BerryGo Africa. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
