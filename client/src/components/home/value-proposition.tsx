import { useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { GiLotus, GiCandlebright, GiHerbsBundle } from "react-icons/gi";

const values = [
  {
    icon: GiLotus,
    title: "Zen Atmosphere",
    description: "A tranquil space designed for deep relaxation and peace of mind."
  },
  {
    icon: GiCandlebright,
    title: "Healing Touch",
    description: "Expert therapists using time-honored techniques for your well-being."
  },
  {
    icon: GiHerbsBundle,
    title: "Natural Harmony",
    description: "Premium natural ingredients and aromatherapy for holistic rejuvenation."
  }
];

export default function ValueProposition() {
  return (
    <section className="py-16 bg-gray-800">
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
      <div className="flex flex-col items-center">
        <div className="w-20 h-20 flex items-center justify-center rounded-full mb-6 bg-white/10 border border-white/20 backdrop-blur-md shadow-lg">
          <Icon className="text-teal-300 text-4xl" />
        </div>
        <div className="bg-white/10 border border-white/20 backdrop-blur-md shadow-lg rounded-2xl p-8 w-full">
          <h3 className="text-2xl font-serif text-gray-100 mb-3">{title}</h3>
          <p className="text-gray-200 opacity-90">{description}</p>
        </div>
      </div>
    </div>
  );
}
