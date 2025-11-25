// app/layout.tsx
import type { ReactNode } from "react";
import "./globals.css";
import { poppins } from "@/styles/fonts";
import { ThemeProvider } from "@/provider/ThemeProvider";

export const metadata = {
  title: "BerryGo — Move Better, Live Better",
  description: "Transportation made smart and seamless.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={poppins.variable} suppressHydrationWarning>
      <body className="bg-background text-text dark:bg-dark-background dark:text-dark-text transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
