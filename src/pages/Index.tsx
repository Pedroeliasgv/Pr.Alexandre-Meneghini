import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import BooksSection from "@/components/BooksSection";
import EventsSection from "@/components/EventsSection";
import VideosSection from "@/components/VideosSection";
import TestimonialSection from "@/components/TestimonialSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import SupportSection from "@/components/SupportSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SupportSection />
      <BooksSection />
      <VideosSection />
      <EventsSection />
      <TestimonialSection />
      <Footer />
    </div>
  );
};

export default Index;
