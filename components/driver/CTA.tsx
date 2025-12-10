"use client";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="py-20 text-center px-6 bg-primary text-white">
      <h2 className="text-3xl font-bold">Ready to Start Driving?</h2>
      <p className="mt-2">Join hundreds of drivers earning more every week.</p>

      <Link
        href="/apply-driver"
        className="inline-block mt-6 px-6 py-3 bg-white text-primary font-semibold rounded-lg shadow"
      >
        Apply Now
      </Link>
    </section>
  );
}
