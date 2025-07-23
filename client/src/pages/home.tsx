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
import { Helmet } from "react-helmet-async";

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
      <Helmet>
        {/* <title>Mimi Spa - Modern Massage & Wellness</title> */}
        <title>Mimi Spa - Relaxing Massages, Wellness & Holistic Therapies in Lavington</title> 
        <meta name="viewport" content="width=device-width, initial-scale=1.0" /> 
        <meta name="description" content="Discover tranquility and renewal at Mimi Spa in Lavington. We offer expert massage services (deep tissue, Swedish, hot stone, ) and skilled therapists provide relaxation and healing in a peaceful environment." />
        <meta name="keywords" content="Mimi Spa, massage Lavington, spa Lavington, wellness Lavington, deep tissue massage, Swedish massage, hot stone massage, relaxation, healing, holistic therapy, spa services, best spa Lavington" />    
        <meta property="og:title" content="Mimi Spa - Modern Massage & Wellness in Lavington" />
        <meta property="og:description" content="Experience tranquility and renewal at Mimi Spa in Lavington. Our massage services and skilled therapists provide relaxation and healing in a peaceful environment. Book your serene escape today!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mimispa.spa" />
        <meta property="og:image" content="https://res.cloudinary.com/dlihqzf9t/image/upload/c_fill,h_630,w_1200,q_auto,f_auto/v1753257416/home_page_kyp1zp.jpg" />
        <meta property="og:image:width" content="1200" /> 
        <meta property="og:image:height" content="630" /> 
        <meta property="og:image:alt" content="Interior of Mimi Spa with serene massage room" /> 
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "HealthAndBeautyBusiness",
              "name": "Mimi Spa",
              "image": "https://mimispa.spa/logo.png",
              "url": "https://mimispa.spa",
              "telephone": "+254743087666",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Gitanga Road",
                "addressLocality": "Nairobi",
                "addressRegion": "Nairobi County",
                "addressCountry": "KE"
              },
              "openingHours": "Mo-Su 09:00-00:00",
              "priceRange": "$$",
              "description": "Experience tranquility and renewal at Mimi Spa in Lavington. Our massage services and skilled therapists provide relaxation and healing in a peaceful environment.",
              "servesCuisine": "Spa Services",
            }
          `}
        </script>
      </Helmet>
      <Hero />
      <Services />
      <ValueProposition />
      <Therapists />
      <Packages />
      {/* <Testimonials /> */}
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
