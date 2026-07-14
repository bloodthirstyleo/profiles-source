import type { Metadata } from "next";
import ContactSection from "@/sections/ContactSection";

export const metadata: Metadata = {
  title: "Contact Me - Vo Manh Khanh | Full Stack Developer",
  description: "Get in touch with me. I am open to discussing new projects, opportunities, or suggestions.",
};

/** Contact page with contact form/info. */
export default function ContactPage() {
  return (
    <main className="w-full min-h-screen">
      <ContactSection />
    </main>
  );
}
