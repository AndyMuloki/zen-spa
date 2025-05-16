import { useEffect } from "react";

interface UseScrollAnimationOptions {
  selector?: string;
  threshold?: number;
  rootMargin?: string;
}

export function useScrollAnimation({
  selector = "[data-animate]",
  threshold = 0.1,
  rootMargin = "0px",
}: UseScrollAnimationOptions = {}) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    
    if (elements.length === 0) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            // Once the animation is done, we can unobserve the element
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin }
    );
    
    elements.forEach((element) => {
      observer.observe(element);
    });
    
    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
    };
  }, [selector, threshold, rootMargin]);
}
