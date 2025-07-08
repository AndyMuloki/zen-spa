import { useEffect } from "react";
import Hero from "@/components/home/hero";
import Services from "@/components/home/services";
import ValueProposition from "@/components/home/value-proposition";
import Therapists from "@/components/home/therapists";
import Packages from "@/components/home/packages";
import Testimonials from "@/components/home/testimonials";
import Contact from "@/components/home/contact";
import BookingForm from "@/components/booking/booking-form";
import { Calendar } from "lucide-react";
import { animateOnScroll } from "@/lib/animations";

export default function Home() {
  useEffect(() => {
    // Set page title and meta description
    document.title = "Mimi Spa - Modern Massage & Wellness";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Experience tranquility and renewal at Mimi Spa. Our massage services and skilled therapists provide relaxation and healing in a peaceful environment.');
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.setAttribute('name', 'description');
      newMetaDescription.setAttribute('content', 'Experience tranquility and renewal at Mimi Spa. Our massage services and skilled therapists provide relaxation and healing in a peaceful environment.');
      document.head.appendChild(newMetaDescription);
    }
    
    // Initialize animations
    animateOnScroll();
    
    // Cleanup function
    return () => {
      // Cleanup code if needed
    };
  }, []);
  
  return (
    <>
      <Hero />
      <Services />
      <ValueProposition />
      <Therapists />
      <Packages />
      <Testimonials />
      <BookingForm />
      <Contact />
      
      {/* Fixed Booking Button (Mobile) */}
      {/**
      <div className="fixed bottom-4 right-4 md:hidden z-40">
        <a 
          href="#booking" 
          className="bg-primary hover:bg-primary-dark text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center transition-colors"
          aria-label="Book now"
        >
          <Calendar className="h-5 w-5" />
        </a>
      </div>
      */}
    </>
  );
}
