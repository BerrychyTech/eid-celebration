import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

import "./globals.css";
import { poppins } from "@/styles/fonts";

export const metadata = {
  title: "BerryGo — Move Better, Live Better",
  description: "Transportation made smart and seamless.",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning className={poppins.variable}>
      <body className="bg-background text-text dark:bg-dark-background dark:text-dark-text transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
