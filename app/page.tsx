import HeroSection from "@/sections/HeroSection";
import AboutSection from "@/sections/AboutSection";
import PortfolioSection from "@/sections/PortfolioSection";
import BlogSection from "@/sections/BlogSection";
import ContactSection from "@/sections/ContactSection";

/** Main page composing all portfolio sections. */
export default function HomePage() {
  return (
    <main className="w-full h-full pages overflow-hidden">
      <HeroSection />
      <div className="relative z-10 bg-black">
        <AboutSection />
        <PortfolioSection />
        <BlogSection />
        <ContactSection />
      </div>
    </main>
  );
}
