import { db } from "./db";
import { services, packages, therapists, testimonials } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Clear existing data
  await db.delete(services);
  await db.delete(packages);
  await db.delete(therapists);
  await db.delete(testimonials);
  console.log("Cleared existing data.");

  // Seed Services
  await db.insert(services).values([
    {
      name: "Swedish Massage",
      description: "A gentle, relaxing massage that uses long strokes, kneading, and circular movements to ease tension and promote relaxation.",
      price: 85,
      duration: 60,
      image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    },
    {
      name: "Deep Tissue Massage",
      description: "Targets the deeper layers of muscles and connective tissue to release chronic tension and help with muscle injuries.",
      price: 95,
      duration: 60,
      image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    },
    {
      name: "Hot Stone Massage",
      description: "Smooth, heated stones are placed on key points of the body combined with massage to promote deep relaxation and ease muscle tension.",
      price: 110,
      duration: 75,
      image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    },
    {
      name: "Aromatherapy Massage",
      description: "Combines the power of essential oils with massage techniques to promote healing, reduce stress and enhance wellbeing.",
      price: 100,
      duration: 60,
      image: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    },
    {
      name: "Sports Massage",
      description: "Designed to assist in correcting problems and imbalances in soft tissue that are caused by repetitive physical activity.",
      price: 95,
      duration: 60,
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    },
    {
      name: "Prenatal Massage",
      description: "Tailored for expectant mothers, this gentle massage helps alleviate pregnancy discomforts and promotes relaxation.",
      price: 90,
      duration: 60,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500"
    }
  ]);
  console.log("Seeded services.");

  // Seed Therapists
  await db.insert(therapists).values([
    {
      name: "Emma Johnson",
      title: "Senior Massage Therapist",
      bio: "Emma specializes in Swedish and Deep Tissue massage with over 8 years of experience. Her approach focuses on stress reduction and pain relief.",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      specialties: ["Swedish", "Deep Tissue", "Hot Stone"]
    },
    {
      name: "Daniel Chen",
      title: "Sports Massage Specialist",
      bio: "Daniel has worked with professional athletes and specializes in sports recovery, injury prevention, and performance enhancement techniques.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      specialties: ["Sports", "Deep Tissue", "Myofascial"]
    },
    {
      name: "Sophia Patel",
      title: "Holistic Wellness Expert",
      bio: "Sophia combines aromatherapy with traditional massage techniques to create deeply relaxing and healing experiences.",
      image: "https://images.pexels.com/photos/4167541/pexels-photo-4167541.jpeg?auto=compress&cs=tinysrgb&w=800&h=500",
      specialties: ["Aromatherapy", "Swedish", "Prenatal"]
    },
    {
      name: "Marcus Williams",
      title: "Therapeutic Specialist",
      bio: "Marcus focuses on therapeutic techniques that target chronic pain conditions and help improve mobility and function.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      specialties: ["Deep Tissue", "Trigger Point", "Therapeutic"]
    },
    {
      name: "Olivia Bennett",
      title: "Luxury Experience Specialist",
      bio: "Olivia creates premium massage experiences combining hot stone therapy with aromatherapy and advanced techniques.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      specialties: ["Hot Stone", "Aromatherapy", "Swedish"]
    },
    {
      name: "James Rodriguez",
      title: "Restorative Massage Specialist",
      bio: "James specializes in helping clients recover from injuries and surgeries through gentle yet effective massage techniques.",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=500",
      specialties: ["Therapeutic", "Gentle Deep Tissue", "Rehabilitation"]
    }
  ]);
  console.log("Seeded therapists.");

  // Seed Packages
  await db.insert(packages).values([
    {
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
    },
    {
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
    },
    {
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
    }
  ]);
  console.log("Seeded packages.");

  // Seed Testimonials
  await db.insert(testimonials).values([
    {
      name: "Sarah Thompson",
      title: "Monthly Member",
      testimonial: "I've been to many spas, but Zen Spa offers something truly special. Emma's deep tissue massage was exactly what I needed for my chronic back pain. The atmosphere is so peaceful, and the staff is incredibly attentive. I've already booked my next appointment!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      name: "Michael Reynolds",
      title: "Package Client",
      testimonial: "The Premium Package was the perfect gift for our anniversary. Daniel's sports massage techniques helped with my shoulder injury from tennis, and my wife loved the hot stone treatment. The private relaxation room was a wonderful touch. We'll definitely be returning!",
      rating: 5,
      image: "https://images.unsplash.com/photo-1566492031773-4f4e44671d66?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    },
    {
      name: "Jennifer Lawson",
      title: "Regular Client",
      testimonial: "As someone with a high-stress job, my monthly massage at Zen Spa has become essential for my wellbeing. Sophia's aromatherapy massage is transformative - I feel like a new person afterward. The online booking system makes it so easy to schedule appointments around my busy calendar.",
      rating: 5,
      image: "https://images.unsplash.com/photo-1494790108755-2616c04707e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100"
    }
  ]);
  console.log("Seeded testimonials.");

  console.log("Database seeded successfully!");
  process.exit(0);
}

seed().catch((error) => {
  console.error("Failed to seed database:", error);
  process.exit(1);
}); 