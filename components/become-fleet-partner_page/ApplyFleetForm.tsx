import { sendFleetForm } from "@/app/actions/sendFleetForm";
import { FaWhatsapp } from "react-icons/fa";

export default function ApplyForm() {
  return (
    <section id="apply" className="py-20 px-6">
      <h2 className="text-2xl font-semibold text-center mb-10">
        Apply Now
      </h2>

      <form
        action={sendFleetForm}
        className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto bg-cardBg dark:bg-dark-cardBg p-8 rounded-xl shadow"
      >
        <input name="name" required placeholder="Full name" className="w-full px-3 py-2 rounded-md border bg-card dark:bg-dark-card border-gray-300 dark:border-gray-600 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
        <input name="email" required placeholder="Email" className="w-full px-3 py-2 rounded-md border bg-card dark:bg-dark-card border-gray-300 dark:border-gray-600 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
        <input name="phone" required placeholder="Phone number" className="w-full px-3 py-2 rounded-md border bg-card dark:bg-dark-card border-gray-300 dark:border-gray-600 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary" />

        <input name="vehicles" required placeholder="Number of vehicles" className="w-full px-3 py-2 rounded-md border bg-card dark:bg-dark-card border-gray-300 dark:border-gray-600 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary" />
        <input name="vehicles Name(s)" required placeholder="vehicle name(s)" className="w-full px-3 py-2 rounded-md border bg-card dark:bg-dark-card border-gray-300 dark:border-gray-600 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary" />

        <select name="driver" className="w-full px-3 py-2 rounded-md border bg-card dark:bg-dark-card border-gray-300 dark:border-gray-600 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary">
          <option>Do you already have a driver?</option>
          <option>Yes</option>
          <option>No</option>
        </select>

        <textarea
          name="message"
          rows={4}
          placeholder="Message (optional)"
          className="w-full px-3 py-2 rounded-md border bg-card dark:bg-dark-card border-gray-300 dark:border-gray-600 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary md:col-span-2"
        />

        <button
          type="submit"
          className="bg-primary dark:bg-dark-primary text-white py-3 rounded-lg md:col-span-2"
        >
          Submit Application
        </button>

        <a
          href="https://wa.me/2340000000000"
          className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-lg md:col-span-2"
        >
          <FaWhatsapp /> Chat on WhatsApp
        </a>

        <p className="text-xs text-muted dark:text-dark-muted md:col-span-2 text-center">
          Your information is safe with us — no spam.
        </p>
      </form>
    </section>
  );
}
