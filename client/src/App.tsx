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
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">
          <Router />
          <WhatsAppButton phoneNumber="254740006578" message="Hello 👋 I’d like to inquire about your massage services and availability. Could you assist me?" />
        </main>
        <Footer />
      </div>
    </TooltipProvider>
  );
}

export default App;
