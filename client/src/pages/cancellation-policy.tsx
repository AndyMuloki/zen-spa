import React from "react";

export default function CancellationPolicy() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-2xl">
      <h1 className="text-3xl font-serif font-bold mb-6 text-primary">Cancellation Policy</h1>
      <p className="mb-4 text-gray-200">We understand that plans can change. Please review our cancellation policy below.</p>
      <ul className="list-disc ml-6 text-gray-200">
        <li>Notify us at least 24 hours in advance to cancel or reschedule your appointment.</li>
        <li>Late cancellations (less than 24 hours) may incur a fee.</li>
        <li>No-shows may be charged the full service amount.</li>
        <li>Contact us at info@mimispa.spa for assistance.</li>
      </ul>
      <p className="mt-8 text-gray-400 text-sm">Thank you for your understanding and cooperation.</p>
    </div>
  );
} 