import { useQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { type Service } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function Services() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleVisible = useIntersectionObserver(titleRef, { threshold: 0.1 });

  const { data: services, isLoading, error } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-500 ${
            isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          data-animate
        >
          <h2 className="section-title">Our Massage Services</h2>
          <div className="section-divider"></div>
          <p className="text-neutral-dark opacity-80">
            Discover our range of therapeutic treatments designed to address your unique needs and preferences.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading && (
            Array(6).fill(0).map((_, index) => (
              <ServiceCardSkeleton key={index} />
            ))
          )}
          
          {error && (
            <div className="col-span-3 text-center text-destructive">
              <p>Failed to load services. Please try again later.</p>
            </div>
          )}
          
          {services?.map((service, index) => (
            <ServiceCard 
              key={service.id} 
              service={service} 
              index={index}
            />
          ))}
        </div>
        
        <div 
          className="text-center mt-12"
          data-animate
        >
          <a 
            href="#booking" 
            className="inline-block bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-md transition-colors"
          >
            Book Your Session
          </a>
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: Service;
  index: number;
}

function ServiceCard({ service, index }: ServiceCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });
  
  // Calculate staggered animation delay based on index
  const animationDelay = `${100 + (index * 100)}ms`;
  
  return (
    <div 
      ref={cardRef}
      className={`bg-neutral-light rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: animationDelay }}
      data-animate
    >
      <img 
        src={service.image} 
        alt={service.name} 
        className="w-full h-60 object-cover"
      />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-serif text-neutral-dark">{service.name}</h3>
          <span className="text-primary font-medium">${service.price}</span>
        </div>
        <p className="text-neutral-dark opacity-80 text-sm mb-4">
          {service.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-neutral-dark opacity-70">
            {service.duration} minutes
          </span>
          <a 
            href="#booking" 
            className="text-primary hover:text-primary-dark font-medium flex items-center"
          >
            Book Now <ArrowRight className="ml-1 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function ServiceCardSkeleton() {
  return (
    <div className="bg-neutral-light rounded-lg overflow-hidden shadow-md">
      <Skeleton className="w-full h-60" />
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-6 w-16" />
        </div>
        <Skeleton className="h-16 w-full mb-4" />
        <div className="flex justify-between items-center">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-24" />
        </div>
      </div>
    </div>
  );
}
