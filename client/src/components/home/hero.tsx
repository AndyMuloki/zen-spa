import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";
import { ArrowDown } from "lucide-react";

export default function Hero() {
  const contentRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(contentRef, { threshold: 0.1 });

  return (
    <section 
      className="relative h-screen bg-cover bg-center" 
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200')" }}
    >
      <div className="absolute inset-0 bg-gray-800 bg-opacity-30"></div>
      <div className="container mx-auto px-4 h-full flex items-center relative z-10">
        <div 
          className={`max-w-2xl transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          ref={contentRef}
          data-animate
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl text-white font-serif font-medium leading-tight">
            Find Balance & Renewal at Mimi Spa
          </h1>
          <p className="text-white text-lg mt-6 md:pr-12">
            Experience the perfect harmony of skilled therapists and tranquil surroundings. Our massage services are designed to restore your body and calm your mind.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a 
              href="#booking" 
              className="bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-md text-center transition-colors"
            >
              Book Appointment
            </a>
            <a 
              href="#services" 
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border border-white border-opacity-40 px-8 py-3 rounded-md text-center transition-colors"
            >
              Explore Services
            </a>
          </div>
        </div>
      </div>
      <div className="absolute bottom-10 left-0 right-0 flex justify-center">
        <a href="#services" className="text-white animate-bounce">
          <ArrowDown className="h-8 w-8" />
        </a>
      </div>
    </section>
  );
}
