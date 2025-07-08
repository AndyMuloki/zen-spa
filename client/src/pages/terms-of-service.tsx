import React from "react";

export default function TermsOfService() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-2xl">
      <h1 className="text-3xl font-serif font-bold mb-6 text-primary">Terms of Service</h1>
      <p className="mb-4 text-gray-200">By using Mimi Spa’s website and services, you agree to the following terms and conditions.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2 text-primary">Bookings & Cancellations</h2>
      <ul className="list-disc ml-6 text-gray-200">
        <li>Appointments can be booked online or by phone.</li>
        <li>Please notify us at least 24 hours in advance to cancel or reschedule.</li>
        <li>Late cancellations may incur a fee.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2 text-primary">Spa Etiquette</h2>
      <ul className="list-disc ml-6 text-gray-200">
        <li>Please arrive 10 minutes before your appointment.</li>
        <li>Respect the privacy and comfort of other guests.</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2 text-primary">Liability</h2>
      <ul className="list-disc ml-6 text-gray-200">
        <li>Mimi Spa is not responsible for lost or stolen items.</li>
        <li>All services are provided by certified professionals.</li>
      </ul>
      <p className="mt-8 text-gray-400 text-sm">These terms may be updated at any time. Continued use of our services constitutes acceptance of the latest terms.</p>
    </div>
  );
} 