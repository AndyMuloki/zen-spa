import { useEffect } from "react";
import { Link } from "wouter";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function BookingSuccess() {
  const { toast } = useToast();

  useEffect(() => {
    // Set page title and meta description
    document.title = "Booking Confirmed - Mimi Spa";
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Your spa treatment has been successfully booked at Mimi Spa. We look forward to helping you relax and rejuvenate.');
    } else {
      const newMetaDescription = document.createElement('meta');
      newMetaDescription.setAttribute('name', 'description');
      newMetaDescription.setAttribute('content', 'Your spa treatment has been successfully booked at Mimi Spa. We look forward to helping you relax and rejuvenate.');
      document.head.appendChild(newMetaDescription);
    }

    // Fetch and show flash message from session
    fetch("/api/flash")
      .then(res => res.json())
      .then(data => {
        if (data.flash) {
          toast({
            title: data.flash.title,
            description: data.flash.description,
            variant: data.flash.type,
          });
        }
      });
  }, [toast]);
  
  return (
    <div className="min-h-screen pt-24 pb-12 px-4 flex flex-col items-center justify-center bg-neutral-light">
      <Card className="w-full max-w-md bg-white shadow-2xl rounded-2xl border-0">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-2">
            <CheckCircle className="h-24 w-24 text-teal-400 drop-shadow-lg" style={{ filter: 'drop-shadow(0 4px 16px rgba(45,212,191,0.3))' }} />
          </div>
          <CardTitle className="text-2xl font-serif text-neutral-dark">Booking Confirmed!</CardTitle>
        </CardHeader>
        
        <CardContent className="text-center">
          <p className="text-neutral-dark mb-4">
            Thank you for booking your appointment with Mimi Spa. We've sent a confirmation to your email with all the details.
          </p>
          
          <div className="bg-teal-50 border border-teal-100 p-4 rounded-lg text-left mb-4">
            <h3 className="font-medium text-teal-700 mb-2">What's Next?</h3>
            <ul className="text-teal-900 space-y-2 text-sm">
              <li>• Please arrive 15 minutes before your appointment</li>
              <li>• Wear comfortable clothing</li>
              <li>• Avoid heavy meals before your massage</li>
              <li>• Let your therapist know about any health concerns</li>
            </ul>
          </div>
          
          <p className="text-neutral-dark text-sm">
            If you need to reschedule or have any questions, please call us at (+254) 743087666.
          </p>
        </CardContent>
        
        <CardFooter className="flex justify-center pt-2 pb-6">
          <Link href="/">
            <Button className="bg-teal-500 hover:bg-teal-600 text-white font-semibold rounded-md px-8 py-2 shadow-md transition-colors">
              Return Home
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
