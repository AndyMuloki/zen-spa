import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef } from "react";
import { MapPin, Clock, Phone, Mail, Instagram, Facebook } from "lucide-react";
import { FaWhatsapp } from 'react-icons/fa';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export default function Contact() {
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleVisible = useIntersectionObserver(titleRef, { threshold: 0.1 });
  const leftCardRef = useRef<HTMLDivElement>(null);
  const isLeftCardVisible = useIntersectionObserver(leftCardRef, { threshold: 0.1 });
  const rightCardRef = useRef<HTMLDivElement>(null);
  const isRightCardVisible = useIntersectionObserver(rightCardRef, { threshold: 0.1 });
  
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });
  
  const onSubmit = (data: ContactFormValues) => {
    toast({
      title: "Message Sent",
      description: "Thank you for your message. We'll get back to you soon!",
    });
    form.reset();
  };

  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          data-animate
        >
          <h2 className="section-title">Visit Our Spa</h2>
          <div className="section-divider"></div>
          <p className="text-gray-300">
            We're conveniently located in the heart of the city. Stop by or contact us for more information.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div 
            ref={leftCardRef}
            className={`bg-gray-700 rounded-lg overflow-hidden shadow-md transition-all duration-1000 ${
              isLeftCardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            data-animate
          >
            <div className="h-64 bg-neutral-light relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7977.611856227106!2d36.76434693850682!3d-1.2907574947878866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f1a11b9fc68ad%3A0x6576c117231844b2!2sValley%20Arcade%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1752840061438!5m2!1sen!2ske"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Valley Arcade, Nairobi Map"
                className="w-full h-full rounded-t-lg"
              ></iframe>
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="bg-white bg-opacity-90 p-4 rounded-md text-center shadow-md">
                  <p className="font-medium text-primary">Interactive Map</p>
                </div>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-serif text-gray-100 mb-4">Mimi Spa Location</h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <MapPin className="text-teal-400 mr-3 mt-1 h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">Valley Arcade</p>
                    <p className="text-gray-300">Lavington, Nairobi</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Clock className="text-teal-400 mr-3 h-5 w-5 flex-shrink-0" />
                  <div>
                    <p className="text-gray-300">Monday - Friday: 8am - 9pm</p>
                    <p className="text-gray-300">Saturday - Sunday: 9am - 8pm</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            ref={rightCardRef}
            className={`bg-gray-700 rounded-lg overflow-hidden shadow-md transition-all duration-1000 ${
              isRightCardVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            data-animate
          >
            <div className="p-6">
              <h3 className="text-xl font-serif text-gray-100 mb-4">Contact Information</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  {/* Icon goes here... */}
                  <FaWhatsapp className="text-teal-400 mr-3 h-5 w-5 flex-shrink-0 transition duration-300 hover:scale-125 hover:text-teal-300 hover:drop-shadow-lg" />
                  <p className="text-gray-300">(+254) 743-087-666</p>
                </div>
                <div className="flex items-center">
                  <Mail className="text-teal-400 mr-3 h-5 w-5 flex-shrink-0" />
                  <p className="text-gray-300">info@mimispa.spa</p>
                </div>
                <div className="flex items-center">
                  <Instagram className="text-teal-400 mr-3 h-5 w-5 flex-shrink-0" />
                  <p className="text-gray-300">@mimispa</p>
                </div>
                <div className="flex items-center">
                  <Facebook className="text-teal-400 mr-3 h-5 w-5 flex-shrink-0" />
                  <p className="text-gray-300">/mimispaofficial</p>
                </div>
              </div>
              
              <h3 className="text-xl font-serif text-gray-100 mb-4">Send us a Message</h3>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Your Name" 
                            className="w-full p-3 border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input 
                            placeholder="Your Email" 
                            type="email"
                            className="w-full p-3 border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Textarea 
                            placeholder="Your Message" 
                            rows={3}
                            className="w-full p-3 border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit"
                    className="bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-md transition-colors"
                  >
                    Send Message
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
