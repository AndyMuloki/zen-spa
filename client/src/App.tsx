import { Switch, Route, useLocation } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import BookingSuccess from "@/pages/booking-success";
import AdminPage from "@/pages/admin";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import WhatsAppButton from "@/components/ui/whatsapp-button";
import ReactGA from "react-ga4";
import PrivacyPolicy from "@/pages/privacy-policy";
import TermsOfService from "@/pages/terms-of-service";
import CancellationPolicy from "@/pages/cancellation-policy";
import FAQ from "@/pages/faq";
import GiftCertificates from "@/pages/gift-certificates";
import { useEffect } from "react";

// Initialize Google Analytics 4 (replace with your GA4 Measurement ID)
ReactGA.initialize("G-B531HTTM0Q");

function Router() {
  const [location] = useLocation();
  const params = new URLSearchParams(window.location.search);

  if (location === "/admin" && params.get("key") === import.meta.env.VITE_ADMIN_SECRET_KEY) {
    return <AdminPage />;
  }

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/booking-success" component={BookingSuccess} />
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/cancellation-policy" component={CancellationPolicy} />
      <Route path="/faq" component={FAQ} />
      <Route path="/gift-certificates" component={GiftCertificates} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [location] = useLocation();

  useEffect(() => {
    // Track page view on every route change
    ReactGA.send({ hitType: "pageview", page: location });
  }, [location]);

  return (
    <TooltipProvider>
      <Toaster />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Router />
          <WhatsAppButton phoneNumber="254743087666" message="Hello 👋 I’d like to inquire about your massage services and availability. Could you assist me?" />
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  );
}

export default App;
