import { Link } from "wouter";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Linkedin,
  Mail
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-serif mb-4">Mimi Spa</h3>
            <p className="text-white opacity-70 mb-4">Experience the perfect harmony of skilled therapists and tranquil surroundings for complete wellness and rejuvenation.</p>
            <div className="flex space-x-4">
              <a href="#" className="text-white opacity-70 hover:opacity-100 transition-opacity">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white opacity-70 hover:opacity-100 transition-opacity">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white opacity-70 hover:opacity-100 transition-opacity">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white opacity-70 hover:opacity-100 transition-opacity">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-serif mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#services" className="text-white opacity-70 hover:opacity-100 transition-opacity">Services</a></li>
              <li><a href="#therapists" className="text-white opacity-70 hover:opacity-100 transition-opacity">Therapists</a></li>
              <li><a href="#packages" className="text-white opacity-70 hover:opacity-100 transition-opacity">Packages</a></li>
              <li><a href="#testimonials" className="text-white opacity-70 hover:opacity-100 transition-opacity">Testimonials</a></li>
              <li><a href="#booking" className="text-white opacity-70 hover:opacity-100 transition-opacity">Book Now</a></li>
              <li><a href="#contact" className="text-white opacity-70 hover:opacity-100 transition-opacity">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-serif mb-4">Spa Policies</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-white opacity-70 hover:opacity-100 transition-opacity">Cancellation Policy</a></li>
              <li><a href="#" className="text-white opacity-70 hover:opacity-100 transition-opacity">Gift Certificates</a></li>
              <li><a href="#" className="text-white opacity-70 hover:opacity-100 transition-opacity">Privacy Policy</a></li>
              <li><a href="#" className="text-white opacity-70 hover:opacity-100 transition-opacity">Terms of Service</a></li>
              <li><a href="#" className="text-white opacity-70 hover:opacity-100 transition-opacity">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-serif mb-4">Newsletter</h3>
            <p className="text-white opacity-70 mb-4">Subscribe to receive special offers and updates from Zen Spa.</p>
            <form className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="py-2 px-3 rounded-l-md border-0 focus:outline-none text-neutral-dark flex-grow"
              />
              <button 
                type="submit" 
                className="bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-r-md transition-colors"
              >
                Join
              </button>
            </form>
          </div>
        </div>
        
        <div className="border-t border-white border-opacity-20 pt-8 text-center">
          <p className="text-white opacity-70">&copy; {new Date().getFullYear()} Mimi Spa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
