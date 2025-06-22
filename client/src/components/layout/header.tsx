import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHomePage = location === "/";

  // Close mobile menu when clicking on a link
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-400 ${
        isScrolled ? "bg-white shadow-md" : ""
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-primary text-2xl md:text-3xl font-serif font-medium">Zen Spa</span>
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {isHomePage && (
            <>
              <a href="#services" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-primary transition-colors font-medium`}>Services</a>
              <a href="#therapists" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-primary transition-colors font-medium`}>Therapists</a>
              <a href="#packages" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-primary transition-colors font-medium`}>Packages</a>
              <a href="#testimonials" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-primary transition-colors font-medium`}>Testimonials</a>
              <a href="#contact" className={`${isScrolled ? 'text-gray-800' : 'text-white'} hover:text-primary transition-colors font-medium`}>Contact</a>
            </>
          )}
          <a href={isHomePage ? "#booking" : "/#booking"} className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-colors">Book Now</a>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          className={`md:hidden ${isScrolled ? 'text-neutral-dark' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white absolute w-full border-b border-neutral">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {isHomePage && (
              <>
                <a 
                  href="#services" 
                  className="text-neutral-dark hover:text-primary transition-colors font-medium py-2"
                  onClick={closeMobileMenu}
                >
                  Services
                </a>
                <a 
                  href="#therapists" 
                  className="text-neutral-dark hover:text-primary transition-colors font-medium py-2"
                  onClick={closeMobileMenu}
                >
                  Therapists
                </a>
                <a 
                  href="#packages" 
                  className="text-neutral-dark hover:text-primary transition-colors font-medium py-2"
                  onClick={closeMobileMenu}
                >
                  Packages
                </a>
                <a 
                  href="#testimonials" 
                  className="text-neutral-dark hover:text-primary transition-colors font-medium py-2"
                  onClick={closeMobileMenu}
                >
                  Testimonials
                </a>
                <a 
                  href="#contact" 
                  className="text-neutral-dark hover:text-primary transition-colors font-medium py-2"
                  onClick={closeMobileMenu}
                >
                  Contact
                </a>
              </>
            )}
            <a 
              href={isHomePage ? "#booking" : "/#booking"} 
              className="bg-primary text-white px-6 py-3 rounded-md hover:bg-primary-dark transition-colors text-center mt-2"
              onClick={closeMobileMenu}
            >
              Book Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
