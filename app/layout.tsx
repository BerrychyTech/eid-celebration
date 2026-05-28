// app/layout.tsx
import type { ReactNode } from "react";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: "BerryGo — Move Better, Live Better",
  description: "Transportation made smart and seamless.",
  icons: {
    icon: '/favicon.ico', 
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background text-text dark:bg-dark-background dark:text-dark-text transition-colors duration-300 pt-[2px]">
          {children}
          <Toaster position="top-right" />
      </body>
    </html>
  );
}
