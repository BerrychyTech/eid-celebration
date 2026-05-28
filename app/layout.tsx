// app/layout.tsx
import type { ReactNode } from "react";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

export const metadata = {
  title: "What's in here? 🤔",
  description: "One click = personalized Eid message + a robot that randomly guesses your resumption week. Spoiler: It's wrong 99% of the time. 😂",
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
