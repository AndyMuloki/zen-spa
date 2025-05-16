/**
 * Initializes the scroll animation for elements with the data-animate attribute
 */
export function animateOnScroll() {
  const animatedElements = document.querySelectorAll("[data-animate]");
  
  if (animatedElements.length === 0) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animated");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );
  
  animatedElements.forEach((element) => {
    observer.observe(element);
  });
  
  return () => {
    animatedElements.forEach((element) => {
      observer.unobserve(element);
    });
  };
}

/**
 * Adds staggered animation delay to child elements
 */
export function addStaggeredAnimation(
  parentSelector: string,
  childSelector: string,
  baseDelay = 100,
  delayIncrement = 50
) {
  const parentElements = document.querySelectorAll(parentSelector);
  
  parentElements.forEach((parent) => {
    const children = parent.querySelectorAll(childSelector);
    
    children.forEach((child, index) => {
      const delay = baseDelay + index * delayIncrement;
      (child as HTMLElement).style.transitionDelay = `${delay}ms`;
    });
  });
}
