import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { useRef, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { insertBookingSchema } from "@shared/schema";
import { useLocation } from "wouter";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import DatePicker from "./date-picker";
import TimePicker from "./time-picker";

// Define custom booking form schema
const bookingFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  serviceId: z.number().nullable().optional(),
  packageId: z.number().nullable().optional(),
  therapistId: z.number().nullable().optional(),
  date: z.string().min(1, "Please select a date"),
  time: z.string().min(1, "Please select a time"),
  notes: z.string().optional(),
  serviceOrPackage: z.enum(["service", "package"], {
    required_error: "Please select either a service or package",
  })
})
.refine(
  (data) => {
    if (data.serviceOrPackage === "service") {
      return !!data.serviceId;
    } else {
      return !!data.packageId;
    }
  },
  {
    message: "Please select a service or package",
    path: ["serviceId"],
  }
)
.refine(
  (data) => {
    return !!data.therapistId;
  },
  {
    message: "Please select a therapist",
    path: ["therapistId"],
  }
);

type BookingFormValues = z.infer<typeof bookingFormSchema>;

// Add types for API data
type Service = { id: number; name: string; price: number };
type Package = { id: number; name: string; price: number };
type Therapist = { id: number; name: string; specialties: string[] };

export default function BookingForm() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(undefined);
  const [selectedType, setSelectedType] = useState<"service" | "package">("service");
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  
  const formRef = useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionObserver(formRef, { threshold: 0.1 });
  const titleRef = useRef<HTMLDivElement>(null);
  const isTitleVisible = useIntersectionObserver(titleRef, { threshold: 0.1 });
  
  const queryClient = useQueryClient();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const form = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      serviceId: undefined,
      packageId: undefined,
      therapistId: undefined,
      date: "",
      time: "",
      notes: "",
      serviceOrPackage: "service",
    },
  });
  
  const { data: services = [], isLoading: isServicesLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });
  
  const { data: packages = [], isLoading: isPackagesLoading } = useQuery<Package[]>({
    queryKey: ["/api/packages"],
  });
  
  const { data: therapists = [], isLoading: isTherapistsLoading } = useQuery<Therapist[]>({
    queryKey: ["/api/therapists"],
  });
  
  // Get available time slots when date and therapist are selected
  const therapistId = form.watch("therapistId");
  const serviceId = form.watch("serviceId");
  const packageId = form.watch("packageId");
  
  useEffect(() => {
    if (selectedDate && therapistId && (serviceId || packageId)) {
      const formattedDate = selectedDate.toISOString().split('T')[0];
      
      const fetchAvailability = async () => {
        try {
          const queryParams = new URLSearchParams();
          queryParams.append("date", formattedDate);
          queryParams.append("therapistId", therapistId.toString());
          
          if (serviceId) {
            queryParams.append("serviceId", serviceId.toString());
          } else if (packageId) {
            queryParams.append("packageId", packageId.toString());
          }
          
          const availabilityResponse = await fetch(`/api/availability?${queryParams.toString()}`);
          if (!availabilityResponse.ok) {
            throw new Error("Failed to fetch availability");
          }
          
          const availableSlots = await availabilityResponse.json();
          setAvailableTimes(availableSlots);
        } catch (error) {
          console.error("Error fetching availability:", error);
          setAvailableTimes([]);
        }
      };
      
      fetchAvailability();
    } else {
      setAvailableTimes([]);
    }
  }, [selectedDate, therapistId, serviceId, packageId]);
  
  // Update form values when date or time changes
  useEffect(() => {
    if (selectedDate) {
      form.setValue("date", selectedDate.toISOString().split('T')[0]);
    }
  }, [selectedDate, form]);
  
  useEffect(() => {
    if (selectedTime) {
      form.setValue("time", selectedTime);
    }
  }, [selectedTime, form]);
  
  // Handle service or package type switch
  useEffect(() => {
    if (selectedType === "service") {
      form.setValue("packageId", undefined);
    } else {
      form.setValue("serviceId", undefined);
    }
    form.setValue("serviceOrPackage", selectedType);
  }, [selectedType, form]);
  
  const bookingMutation = useMutation({
    mutationFn: async (data: Omit<BookingFormValues, "serviceOrPackage">) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Booking Successful",
        description: "Your appointment has been booked!",
      });
      setLocation("/booking-success");
    },
    onError: (error) => {
      console.error("Booking error:", error);
      toast({
        title: "Booking Failed",
        description: "There was a problem booking your appointment. Please try again.",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: BookingFormValues) => {
    // Remove serviceOrPackage as it's not part of the backend schema
    const { serviceOrPackage, ...submitData } = data;
    bookingMutation.mutate(submitData);
  };

  // Some standard time slots for demonstration purposes
  const allTimes = [
    "9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", 
    "3:00 PM", "4:30 PM", "6:00 PM", "7:30 PM", 
    "9:00 PM", "10:30 PM", "12:00 AM", "1:30 AM",
    "Other"
  ];

  return (
    <section id="booking" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div 
          ref={titleRef}
          className={`text-center max-w-3xl mx-auto mb-16 transition-all duration-1000 ${
            isTitleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          data-animate
        >
          <h2 className="section-title">Book Your Appointment</h2>
          <div className="section-divider"></div>
          <p className="text-gray-300 opacity-80">
            Schedule your massage session with our expert therapists and begin your wellness journey.
          </p>
        </div>
        
        <div 
          ref={formRef}
          className={`max-w-4xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          data-animate
        >
          <div className="grid grid-cols-1 md:grid-cols-5">
            {/* Booking Image */}
            <div className="md:col-span-2 h-full">
              <img 
                src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=1200" 
                alt="Zen Spa Massage Room" 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Booking Form */}
            <div className="md:col-span-3 p-8 bg-gray-800 text-gray-100">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  {/* Service or Package Selection */}
                  <div>
                    <div className="flex gap-4 mb-4">
                      <Button
                        type="button"
                        variant={selectedType === "service" ? "default" : "outline"}
                        className={selectedType === "service" ? "bg-teal-600 text-white hover:bg-teal-700" : "border-teal-600 bg-gray-700 text-white hover:bg-teal-600/20"}
                        onClick={() => setSelectedType("service")}
                      >
                        Service
                      </Button>
                      <Button
                        type="button"
                        variant={selectedType === "package" ? "default" : "outline"}
                        className={selectedType === "package" ? "bg-teal-600 text-white hover:bg-teal-700" : "border-teal-600 bg-gray-700 text-white hover:bg-teal-600/20"}
                        onClick={() => setSelectedType("package")}
                      >
                        Package
                      </Button>
                    </div>
                    
                    {selectedType === "service" ? (
                      <FormField
                        control={form.control}
                        name="serviceId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-gray-200 font-medium mb-2">Select Services</FormLabel>
                            <Select
                              value={field.value?.toString()}
                              onValueChange={(value) => field.onChange(parseInt(value))}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full p-3 border border-gray-600 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500">
                                  <SelectValue placeholder="Choose a service" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {isServicesLoading ? (
                                  <SelectItem value="loading" disabled>
                                    Loading services...
                                  </SelectItem>
                                ) : services.length ? (
                                  services.map((service: Service) => (
                                    <SelectItem key={service.id} value={service.id.toString()}>
                                      {service.name} (${service.price})
                                    </SelectItem>
                                  ))
                                ) : (
                                  <SelectItem value="none" disabled>
                                    No services available
                                  </SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : (
                      <FormField
                        control={form.control}
                        name="packageId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="block text-gray-200 font-medium mb-2">Select Package</FormLabel>
                            <Select
                              value={field.value?.toString()}
                              onValueChange={(value) => field.onChange(parseInt(value))}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full p-3 border border-gray-600 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500">
                                  <SelectValue placeholder="Choose a package" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {isPackagesLoading ? (
                                  <SelectItem value="loading" disabled>
                                    Loading packages...
                                  </SelectItem>
                                ) : packages.length ? (
                                  packages.map((pkg: Package) => (
                                    <SelectItem key={pkg.id} value={pkg.id.toString()}>
                                      {pkg.name} (${pkg.price})
                                    </SelectItem>
                                  ))
                                ) : (
                                  <SelectItem value="none" disabled>
                                    No packages available
                                  </SelectItem>
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}
                  </div>
                  
                  {/* Therapist Selection */}
                  <FormField
                    control={form.control}
                    name="therapistId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-gray-200 font-medium mb-2">Select Therapist</FormLabel>
                        <Select
                          value={field.value?.toString()}
                          onValueChange={(value) => field.onChange(parseInt(value))}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full p-3 border border-gray-600 bg-gray-700 text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500">
                              <SelectValue placeholder="Choose a therapist" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent side="bottom">
                            {isTherapistsLoading ? (
                              <SelectItem value="loading" disabled>
                                Loading therapists...
                              </SelectItem>
                            ) : therapists.length ? (
                              <>
                                {therapists.map((therapist: Therapist) => (
                                  <SelectItem key={therapist.id} value={therapist.id.toString()}>
                                    {therapist.name} - {therapist.specialties.join(", ")}
                                  </SelectItem>
                                ))}
                                <SelectItem value="0">No Preference</SelectItem>
                              </>
                            ) : (
                              <SelectItem value="none" disabled>
                                No therapists available
                              </SelectItem>
                            )}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Date Selection */}
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-gray-200 font-medium mb-2">Select Date</FormLabel>
                        <FormControl>
                          <DatePicker
                            selectedDate={selectedDate}
                            onDateChange={setSelectedDate}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Time Selection */}
                  <FormField
                    control={form.control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-gray-200 font-medium mb-2">Select Time</FormLabel>
                        <FormControl>
                          <TimePicker
                            availableTimes={allTimes}
                            selectedTime={selectedTime}
                            onTimeSelect={setSelectedTime}
                            isLoading={!!(selectedDate && therapistId && (serviceId || packageId) && availableTimes.length === 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-gray-200 font-medium mb-2">First Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your first name"
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
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-gray-200 font-medium mb-2">Last Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter your last name"
                              className="w-full p-3 border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-gray-200 font-medium mb-2">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Enter your email"
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
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="block text-gray-200 font-medium mb-2">Phone</FormLabel>
                          <FormControl>
                            <Input
                              type="tel"
                              placeholder="Enter your phone number"
                              className="w-full p-3 border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  {/* Special Requests */}
                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="block text-gray-200 font-medium mb-2">Special Requests</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any special requests or health concerns"
                            rows={3}
                            className="w-full p-3 border border-neutral rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-medium py-3 rounded-md transition-colors"
                    disabled={bookingMutation.isPending}
                  >
                    {bookingMutation.isPending ? "Processing..." : "Confirm Booking"}
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
