import { useQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef, useState, useEffect } from "react";
import { type Testimonial } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft, ArrowRight, Star, StarHalf } from "lucide-react";

export default function Testimonials() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleVisible = useIntersectionObserver(titleRef, { threshold: 0.1 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ["/api/testimonials"],
  });
  
  // Auto rotate testimonials
  useEffect(() => {
    if (!testimonials || testimonials.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);
    
    return () => clearInterval(interval);
  }, [testimonials]);
  
  const handlePrev = () => {
    if (!testimonials) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    if (!testimonials) return;
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const sliderRef = useRef<HTMLDivElement>(null);
  const isSliderVisible = useIntersectionObserver(sliderRef, { threshold: 0.1 });

  return (
    <section id="testimonials" className="py-20 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-cover bg-center opacity-10" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&h=1200')" }}></div>
      
      <div className="container mx-auto px-4 relative">
        <div 
          ref={titleRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          data-animate
        >
          <h2 className="section-title">Client Experiences</h2>
          <div className="section-divider"></div>
          <p className="text-neutral-dark opacity-80">
            Read what our clients have to say about their experiences at Zen Spa.
          </p>
        </div>
        
        <div 
          ref={sliderRef}
          className={`testimonial-slider relative max-w-4xl mx-auto transition-all duration-1000 ${
            isSliderVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          data-animate
        >
          {isLoading ? (
            <TestimonialSkeleton />
          ) : error ? (
            <div className="text-center text-destructive p-8">
              <p>Failed to load testimonials. Please try again later.</p>
            </div>
          ) : testimonials && testimonials.length > 0 ? (
            <>
              <div className="overflow-hidden">
                <div 
                  ref={containerRef}
                  className="flex transition-transform duration-500"
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {testimonials.map((testimonial) => (
                    <TestimonialCard 
                      key={testimonial.id} 
                      testimonial={testimonial}
                    />
                  ))}
                </div>
              </div>
              
              {testimonials.length > 1 && (
                <>
                  <button 
                    className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors z-10"
                    onClick={handlePrev}
                    aria-label="Previous testimonial"
                  >
                    <ArrowLeft className="h-5 w-5" />
                  </button>
                  
                  <button 
                    className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors z-10"
                    onClick={handleNext}
                    aria-label="Next testimonial"
                  >
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  
                  <div className="flex justify-center mt-8 space-x-2">
                    {testimonials.map((_, index) => (
                      <button 
                        key={index} 
                        className={`w-3 h-3 rounded-full transition-colors ${
                          index === currentIndex ? 'bg-primary' : 'bg-neutral opacity-30'
                        }`}
                        onClick={() => setCurrentIndex(index)}
                        aria-label={`Go to testimonial ${index + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="text-center p-8">
              <p>No testimonials available yet.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  // Function to render rating stars
  const renderRatingStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`star-${i}`} className="fill-primary text-primary" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half-star" className="fill-primary text-primary" />);
    }
    
    return stars;
  };
  
  return (
    <div className="w-full min-w-full px-4">
      <div className="bg-neutral-light p-8 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <div className="flex text-primary">
            {renderRatingStars(testimonial.rating)}
          </div>
        </div>
        <p className="text-neutral-dark italic mb-6">{testimonial.testimonial}</p>
        <div className="flex items-center">
          <div className="mr-4">
            <img 
              src={testimonial.image} 
              alt={testimonial.name} 
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <div>
            <h4 className="font-medium text-neutral-dark">{testimonial.name}</h4>
            <p className="text-neutral-dark opacity-70 text-sm">{testimonial.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TestimonialSkeleton() {
  return (
    <div className="px-4">
      <div className="bg-neutral-light p-8 rounded-lg shadow-md">
        <div className="flex items-center mb-6">
          <Skeleton className="h-5 w-28" />
        </div>
        <Skeleton className="h-24 w-full mb-6" />
        <div className="flex items-center">
          <div className="mr-4">
            <Skeleton className="w-12 h-12 rounded-full" />
          </div>
          <div>
            <Skeleton className="h-5 w-32 mb-1" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
