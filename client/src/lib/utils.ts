import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Waits for gtag to be available and fires a Google Ads conversion event
 * @param conversionId - The conversion ID in format 'AW-XXXXXXXXX/YYYYYYYYY'
 * @param maxRetries - Maximum number of retries (default: 10)
 * @param retryDelay - Delay between retries in ms (default: 100)
 */
export function fireGoogleAdsConversion(
  conversionId: string,
  maxRetries: number = 10,
  retryDelay: number = 100
): void {
  if (typeof window === 'undefined') return;

  const attemptFire = (attempt: number): void => {
    const gtag = (window as any).gtag;
    const dataLayer = (window as any).dataLayer;

    if (gtag && typeof gtag === 'function') {
      // gtag is available, fire the conversion event
      gtag('event', 'conversion', {
        'send_to': conversionId
      });
    } else if (dataLayer && Array.isArray(dataLayer)) {
      // Fallback: push to dataLayer if gtag isn't ready yet
      // This will be processed once gtag loads
      dataLayer.push({
        'event': 'conversion',
        'send_to': conversionId
      });
    } else if (attempt < maxRetries) {
      // Retry after a short delay
      setTimeout(() => attemptFire(attempt + 1), retryDelay);
    }
  };

  // Start attempting to fire the conversion
  attemptFire(0);
}
