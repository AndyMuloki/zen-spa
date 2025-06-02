import { useQuery } from "@tanstack/react-query";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";
import { type Therapist } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";

export default function Therapists() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleVisible = useIntersectionObserver(titleRef, { threshold: 0.1 });

  const { data: therapists, isLoading, error } = useQuery<Therapist[]>({
    queryKey: ["/api/therapists"],
  });

  return (
    <section id="therapists" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          data-animate
        >
          <h2 className="section-title">Meet Our Therapists</h2>
          <div className="section-divider"></div>
          <p className="text-gray-300">
            Our highly skilled and certified massage therapists are dedicated to providing personalized care for your wellness journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading && (
            Array(6).fill(0).map((_, index) => (
              <TherapistCardSkeleton key={index} />
            ))
          )}
          
          {error && (
            <div className="col-span-3 text-center text-destructive">
              <p>Failed to load therapists. Please try again later.</p>
            </div>
          )}
          
          {therapists?.map((therapist, index) => (
            <TherapistCard 
              key={therapist.id} 
              therapist={therapist} 
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface TherapistCardProps {
  therapist: Therapist;
  index: number;
}

function TherapistCard({ therapist, index }: TherapistCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });
  
  // Calculate staggered animation delay based on index
  const animationDelay = `${100 + (index * 100)}ms`;
  
  return (
    <div 
      ref={cardRef}
      className={`bg-gray-800 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: animationDelay }}
      data-animate
    >
      <img 
        src={therapist.image} 
        alt={therapist.name} 
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <h3 className="text-xl font-serif text-gray-100 mb-2">{therapist.name}</h3>
        <p className="text-teal-400 font-medium mb-3">{therapist.title}</p>
        <p className="text-gray-300 text-sm mb-4">
          {therapist.bio}
        </p>
        <div className="flex flex-wrap gap-2">
          {therapist.specialties.map((specialty, i) => (
            <Badge 
              key={i} 
              variant="secondary" 
              className="bg-teal-400 bg-opacity-20 text-teal-400 hover:bg-teal-400 hover:bg-opacity-30"
            >
              {specialty}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

function TherapistCardSkeleton() {
  return (
    <div className="bg-neutral-light rounded-lg overflow-hidden shadow-md">
      <Skeleton className="w-full h-64" />
      <div className="p-6">
        <Skeleton className="h-7 w-40 mb-2" />
        <Skeleton className="h-5 w-36 mb-3" />
        <Skeleton className="h-16 w-full mb-4" />
        <div className="flex gap-2">
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
          <Skeleton className="h-6 w-16" />
        </div>
      </div>
    </div>
  );
}
