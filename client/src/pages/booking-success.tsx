import { useEffect } from "react";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function BookingSuccess() {
  useEffect(() => {
    // Set page title and meta description
    document.title = "Booking Confirmed - Zen Spa";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Your spa treatment has been successfully booked at Zen Spa. We look forward to helping you relax and rejuvenate.');
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.setAttribute('name', 'description');
      newMetaDescription.setAttribute('content', 'Your spa treatment has been successfully booked at Zen Spa. We look forward to helping you relax and rejuvenate.');
      document.head.appendChild(newMetaDescription);
    }
  }, []);
  
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center bg-neutral-light">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader className="text-center pb-4">
          <CheckCircle className="h-16 w-16 text-success mx-auto mb-2" />
          <CardTitle className="text-2xl font-serif text-neutral-dark">Booking Confirmed!</CardTitle>
        </CardHeader>
        
        <CardContent className="text-center">
          <p className="text-neutral-dark mb-4">
            Thank you for booking your appointment with Zen Spa. We've sent a confirmation to your email with all the details.
          </p>
          
          <div className="bg-primary bg-opacity-10 p-4 rounded-md text-left mb-4">
            <h3 className="font-medium text-primary mb-2">What's Next?</h3>
            <ul className="text-neutral-dark space-y-2 text-sm">
              <li>• Please arrive 15 minutes before your appointment</li>
              <li>• Wear comfortable clothing</li>
              <li>• Avoid heavy meals before your massage</li>
              <li>• Let your therapist know about any health concerns</li>
            </ul>
          </div>
          
          <p className="text-neutral-dark text-sm">
            If you need to reschedule or have any questions, please call us at (555) 123-4567.
          </p>
        </CardContent>
        
        <CardFooter className="flex justify-center pt-2 pb-6">
          <Link href="/">
            <Button className="bg-primary hover:bg-primary-dark text-white transition-colors">
              Return Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
