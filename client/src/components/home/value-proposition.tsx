import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { Heart, Leaf, HandHeart } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Experienced Therapists",
    description: "Our certified massage therapists have years of experience and specialized training."
  },
  {
    icon: Leaf,
    title: "Peaceful Environment",
    description: "Our spa is designed to create a tranquil atmosphere that promotes deep relaxation."
  },
  {
    icon: HandHeart,
    title: "Personalized Care",
    description: "Each session is tailored to your unique needs and preferences for optimal results."
  }
];

export default function ValueProposition() {
  return (
    <section className="py-16 bg-primary bg-opacity-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <ValueCard 
              key={index}
              icon={value.icon}
              title={value.title}
              description={value.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ValueCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  index: number;
}

function ValueCard({ icon: Icon, title, description, index }: ValueCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(cardRef, { threshold: 0.1 });
  
  // Calculate staggered animation delay based on index
  const animationDelay = `${100 + (index * 150)}ms`;
  
  return (
    <div 
      ref={cardRef}
      className={`text-center transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: animationDelay }}
      data-animate
    >
      <div className="w-16 h-16 bg-primary bg-opacity-20 rounded-full flex items-center justify-center mx-auto mb-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-xl font-serif text-neutral-dark mb-3">{title}</h3>
      <p className="text-neutral-dark opacity-80">{description}</p>
    </div>
  );
}
