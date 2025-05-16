import { useQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";
import { type Package } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Check } from "lucide-react";

export default function Packages() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleVisible = useIntersectionObserver(titleRef, { threshold: 0.1 });

  const { data: packages, isLoading, error } = useQuery<Package[]>({
    queryKey: ["/api/packages"],
  });

  return (
    <section id="packages" className="py-20 bg-neutral-light">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          data-animate
        >
          <h2 className="section-title">Spa Packages</h2>
          <div className="section-divider"></div>
          <p className="text-neutral-dark opacity-80">
            Enhance your wellness journey with our curated spa packages designed for complete rejuvenation.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {isLoading && (
            Array(3).fill(0).map((_, index) => (
              <PackageCardSkeleton key={index} />
            ))
          )}
          
          {error && (
            <div className="col-span-3 text-center text-destructive">
              <p>Failed to load packages. Please try again later.</p>
            </div>
          )}
          
          {packages?.map((pkg, index) => (
            <PackageCard 
              key={pkg.id} 
              pkg={pkg} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface PackageCardProps {
  pkg: Package;
  index: number;
}

function PackageCard({ pkg, index }: PackageCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });
  
  // Calculate staggered animation delay based on index
  const animationDelay = `${100 + (index * 150)}ms`;
  
  const isPopular = pkg.popular;
  
  return (
    <div 
      ref={cardRef}
      className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow flex flex-col h-full ${
        isPopular ? 'border-2 border-primary relative transform scale-105 md:scale-105 shadow-lg' : ''
      } ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: animationDelay }}
      data-animate
    >
      {isPopular && (
        <div className="absolute top-0 left-0 right-0 bg-primary text-white text-center py-2 text-sm">
          Most Popular
        </div>
      )}
      
      <div className={`p-8 flex-grow ${isPopular ? 'pt-12' : ''}`}>
        <h3 className="text-2xl font-serif text-neutral-dark text-center mb-4">{pkg.name}</h3>
        <div className="text-center mb-6">
          <span className="text-3xl font-semibold text-primary">${pkg.price}</span>
          <span className="text-neutral-dark opacity-70 ml-2">per person</span>
        </div>
        <ul className="space-y-3 mb-8">
          {pkg.features.map((feature, i) => (
            <li key={i} className="flex items-start">
              <Check className="h-5 w-5 text-success mr-2 mt-1 flex-shrink-0" />
              <span className="text-neutral-dark">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="p-6 border-t border-neutral mt-auto">
        <a 
          href="#booking" 
          className="block bg-primary hover:bg-primary-dark text-white text-center py-3 rounded-md transition-colors"
        >
          Book Package
        </a>
      </div>
    </div>
  );
}

function PackageCardSkeleton() {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md flex flex-col h-full">
      <div className="p-8 flex-grow">
        <Skeleton className="h-8 w-48 mx-auto mb-4" />
        <Skeleton className="h-8 w-32 mx-auto mb-6" />
        <div className="space-y-3 mb-8">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="flex items-start">
              <Skeleton className="h-5 w-5 mr-2 mt-1" />
              <Skeleton className="h-6 w-full" />
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 border-t border-neutral mt-auto">
        <Skeleton className="h-12 w-full rounded-md" />
      </div>
    </div>
  );
}
