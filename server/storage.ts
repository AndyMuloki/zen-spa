import { 
  type Service, type InsertService,
  type Therapist, type InsertTherapist,
  type Package, type InsertPackage,
  type Testimonial, type InsertTestimonial,
  type Booking, type InsertBooking,
  type User, type InsertUser
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Service methods
  getAllServices(): Promise<Service[]>;
  getService(id: number): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  
  // Therapist methods
  getAllTherapists(): Promise<Therapist[]>;
  getTherapist(id: number): Promise<Therapist | undefined>;
  createTherapist(therapist: InsertTherapist): Promise<Therapist>;
  
  // Package methods
  getAllPackages(): Promise<Package[]>;
  getPackage(id: number): Promise<Package | undefined>;
  createPackage(pkg: InsertPackage): Promise<Package>;
  
  // Testimonial methods
  getAllTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  
  // Booking methods
  createBooking(booking: InsertBooking): Promise<Booking>;
  getBookingsByDate(date: string): Promise<Booking[]>;
  getAvailableTimeSlots(
    date: string, 
    serviceId?: number, 
    packageId?: number, 
    therapistId?: number
  ): Promise<string[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private services: Map<number, Service>;
  private therapists: Map<number, Therapist>;
  private packages: Map<number, Package>;
  private testimonials: Map<number, Testimonial>;
  private bookings: Map<number, Booking>;
  
  private userCurrentId: number;
  private serviceCurrentId: number;
  private therapistCurrentId: number;
  private packageCurrentId: number;
  private testimonialCurrentId: number;
  private bookingCurrentId: number;

  constructor() {
    this.users = new Map();
    this.services = new Map();
    this.therapists = new Map();
    this.packages = new Map();
    this.testimonials = new Map();
    this.bookings = new Map();
    
    this.userCurrentId = 1;
    this.serviceCurrentId = 1;
    this.therapistCurrentId = 1;
    this.packageCurrentId = 1;
    this.testimonialCurrentId = 1;
    this.bookingCurrentId = 1;
    
    // Initialize with demo data
    this.initializeDemoData();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userCurrentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Service methods
  async getAllServices(): Promise<Service[]> {
    return Array.from(this.services.values());
  }
  
  async getService(id: number): Promise<Service | undefined> {
    return this.services.get(id);
  }
  
  async createService(service: InsertService): Promise<Service> {
    const id = this.serviceCurrentId++;
    const newService: Service = { ...service, id };
    this.services.set(id, newService);
    return newService;
  }
  
  // Therapist methods
  async getAllTherapists(): Promise<Therapist[]> {
    return Array.from(this.therapists.values());
  }
  
  async getTherapist(id: number): Promise<Therapist | undefined> {
    return this.therapists.get(id);
  }
  
  async createTherapist(therapist: InsertTherapist): Promise<Therapist> {
    const id = this.therapistCurrentId++;
    const newTherapist: Therapist = { ...therapist, id };
    this.therapists.set(id, newTherapist);
    return newTherapist;
  }
  
  // Package methods
  async getAllPackages(): Promise<Package[]> {
    return Array.from(this.packages.values());
  }
  
  async getPackage(id: number): Promise<Package | undefined> {
    return this.packages.get(id);
  }
  
  async createPackage(pkg: InsertPackage): Promise<Package> {
    const id = this.packageCurrentId++;
    const newPackage: Package = { ...pkg, id, popular: pkg.popular || false };
    this.packages.set(id, newPackage);
    return newPackage;
  }
  
  // Testimonial methods
  async getAllTestimonials(): Promise<Testimonial[]> {
    return Array.from(this.testimonials.values());
  }
  
  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const id = this.testimonialCurrentId++;
    const newTestimonial: Testimonial = { ...testimonial, id };
    this.testimonials.set(id, newTestimonial);
    return newTestimonial;
  }
  
  // Booking methods
  async createBooking(booking: InsertBooking): Promise<Booking> {
    const id = this.bookingCurrentId++;
    const newBooking: Booking = { 
      ...booking, 
      id, 
      createdAt: new Date(),
      serviceId: booking.serviceId || null,
      packageId: booking.packageId || null,
      therapistId: booking.therapistId || null,
      notes: booking.notes || null
    };
    this.bookings.set(id, newBooking);
    return newBooking;
  }
  
  async getBookingsByDate(date: string): Promise<Booking[]> {
    return Array.from(this.bookings.values()).filter(
      (booking) => booking.date.toString() === date
    );
  }
  
  async getAvailableTimeSlots(
    date: string, 
    serviceId?: number, 
    packageId?: number, 
    therapistId?: number
  ): Promise<string[]> {
    // Default time slots
    const allTimeSlots = [
      "9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM", 
      "3:00 PM", "4:30 PM", "6:00 PM", "7:30 PM"
    ];
    
    // Get bookings for the specified date and therapist
    const bookingsOnDate = Array.from(this.bookings.values()).filter(
      (booking) => 
        booking.date.toString() === date && 
        booking.therapistId === therapistId
    );
    
    // Get booked time slots
    const bookedTimeSlots = bookingsOnDate.map(booking => booking.time);
    
    // Filter available time slots
    return allTimeSlots.filter(slot => !bookedTimeSlots.includes(slot));
  }
  
  // Initialize with demo data
  private initializeDemoData() {
    // Services
    this.createService({
      name: "Swedish Massage",
      description: "A gentle, relaxing massage that uses long strokes, kneading, and circular movements to ease tension and promote relaxation.",
      price: 85,
      duration: 60,
      image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    });
    
    this.createService({
      name: "Deep Tissue Massage",
      description: "Targets the deeper layers of muscles and connective tissue to release chronic tension and help with muscle injuries.",
      price: 95,
      duration: 60,
      image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    });
    
    this.createService({
      name: "Hot Stone Massage",
      description: "Smooth, heated stones are placed on key points of the body combined with massage to promote deep relaxation and ease muscle tension.",
      price: 110,
      duration: 75,
      image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    });
    
    this.createService({
      name: "Aromatherapy Massage",
      description: "Combines the power of essential oils with massage techniques to promote healing, reduce stress and enhance wellbeing.",
      price: 100,
      duration: 60,
      image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    });
    
    this.createService({
      name: "Sports Massage",
      description: "Designed to assist in correcting problems and imbalances in soft tissue that are caused by repetitive physical activity.",
      price: 95,
      duration: 60,
      image: "https://cdn.pixabay.com/photo/2019/11/11/10/26/massage-4618127_1280.jpg"
    });
    
    this.createService({
      name: "Prenatal Massage",
      description: "Tailored for expectant mothers, this gentle massage helps alleviate pregnancy discomforts and promotes relaxation.",
      price: 90,
      duration: 60,
      image: "https://images.unsplash.com/photo-1591343395082-e120087004b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    });
    
    // Therapists
    this.createTherapist({
      name: "Emma Johnson",
      title: "Senior Massage Therapist",
      bio: "Emma specializes in Swedish and Deep Tissue massage with over 8 years of experience. Her approach focuses on stress reduction and pain relief.",
      image: "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      specialties: ["Swedish", "Deep Tissue", "Hot Stone"]
    });
    
    this.createTherapist({
      name: "Daniel Chen",
      title: "Sports Massage Specialist",
      bio: "Daniel has worked with professional athletes and specializes in sports recovery, injury prevention, and performance enhancement techniques.",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      specialties: ["Sports", "Deep Tissue", "Myofascial"]
    });
    
    this.createTherapist({
      name: "Sophia Patel",
      title: "Holistic Wellness Expert",
      bio: "Sophia combines aromatherapy with traditional massage techniques to create deeply relaxing and healing experiences.",
      image: "https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      specialties: ["Aromatherapy", "Swedish", "Prenatal"]
    });
    
    this.createTherapist({
      name: "Marcus Williams",
      title: "Therapeutic Specialist",
      bio: "Marcus focuses on therapeutic techniques that target chronic pain conditions and help improve mobility and function.",
      image: "https://images.unsplash.com/photo-1573879541250-58ae8b322b40?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      specialties: ["Deep Tissue", "Trigger Point", "Therapeutic"]
    });
    
    this.createTherapist({
      name: "Olivia Bennett",
      title: "Luxury Experience Specialist",
      bio: "Olivia creates premium massage experiences combining hot stone therapy with aromatherapy and advanced techniques.",
      image: "https://cdn.pixabay.com/photo/2016/11/18/14/15/woman-1834827_1280.jpg",
      specialties: ["Hot Stone", "Aromatherapy", "Swedish"]
    });
    
    this.createTherapist({
      name: "James Rodriguez",
      title: "Restorative Massage Specialist",
      bio: "James specializes in helping clients recover from injuries and surgeries through gentle yet effective massage techniques.",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      specialties: ["Therapeutic", "Gentle Deep Tissue", "Rehabilitation"]
    });
    
    // Packages
    this.createPackage({
      name: "Essential Package",
      description: "A perfect introduction to our spa services",
      price: 150,
      features: [
        "60-min Swedish Massage",
        "Express Facial Treatment",
        "Aromatherapy Enhancement",
        "Spa Access (2 hours)"
      ],
      popular: false
    });
    
    this.createPackage({
      name: "Premium Package",
      description: "Our most popular comprehensive wellness experience",
      price: 250,
      features: [
        "90-min Deep Tissue or Hot Stone Massage",
        "Custom Facial Treatment",
        "Hand & Foot Treatment",
        "Aromatherapy Enhancement",
        "Spa Access (Full Day)",
        "Complimentary Herbal Tea Service"
      ],
      popular: true
    });
    
    this.createPackage({
      name: "Luxury Package",
      description: "The ultimate spa indulgence for complete rejuvenation",
      price: 350,
      features: [
        "120-min Signature Massage Experience",
        "Premium Facial Treatment",
        "Full Body Scrub",
        "Scalp Treatment",
        "Private Relaxation Room",
        "Spa Access (Full Day)",
        "Gourmet Lunch"
      ],
      popular: false
    });
    
    // Testimonials
    this.createTestimonial({
      name: "Sarah Thompson",
      title: "Monthly Member",
      testimonial: "I've been to many spas, but Zen Spa offers something truly special. Emma's deep tissue massage was exactly what I needed for my chronic back pain. The atmosphere is so peaceful, and the staff is incredibly attentive. I've already booked my next appointment!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    });
    
    this.createTestimonial({
      name: "Michael Reynolds",
      title: "Package Client",
      testimonial: "The Premium Package was the perfect gift for our anniversary. Daniel's sports massage techniques helped with my shoulder injury from tennis, and my wife loved the hot stone treatment. The private relaxation room was a wonderful touch. We'll definitely be returning!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    });
    
    this.createTestimonial({
      name: "Jennifer Lawson",
      title: "Regular Client",
      testimonial: "As someone with a high-stress job, my monthly massage at Zen Spa has become essential for my wellbeing. Sophia's aromatherapy massage is transformative - I feel like a new person afterward. The online booking system makes it so easy to schedule appointments around my busy calendar.",
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    });
  }
}

export const storage = new MemStorage();
