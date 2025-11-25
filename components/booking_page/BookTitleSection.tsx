// File: src/components/BookTitleSection.tsx
import * as React from "react";

export default function BookTitleSection() {
  return (
<section className="bg-background dark:bg-dark-background text-text dark:text-dark-text py-16 px-4">
  <div className="max-w-3xl mx-auto text-center">
    <h1 className="text-2xl md:text-4xl font-heading font-bold mb-4">
      Book a Clean, Comfortable Inter-Town Ride
    </h1>

    <p className="text-base md:text-lg text-muted dark:text-dark-muted">
      Pick your route, select seats, and confirm your ride instantly.
    </p>
  </div>
</section>

  );
}
