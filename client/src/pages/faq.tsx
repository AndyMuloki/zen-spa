import React from "react";

export default function FAQ() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-2xl">
      <h1 className="text-3xl font-serif font-bold mb-6 text-primary">Frequently Asked Questions</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2 text-primary">How do I book an appointment?</h2>
        <p className="text-gray-200 mb-4">You can book online through our website or call us directly at +254740006578.</p>
        <h2 className="text-xl font-semibold mb-2 text-primary">What should I bring to my appointment?</h2>
        <p className="text-gray-200 mb-4">Just yourself! We provide everything you need for your spa experience.</p>
        <h2 className="text-xl font-semibold mb-2 text-primary">Can I request a specific therapist?</h2>
        <p className="text-gray-200 mb-4">Yes, you can request a therapist when booking, subject to availability.</p>
        <h2 className="text-xl font-semibold mb-2 text-primary">What is your cancellation policy?</h2>
        <p className="text-gray-200 mb-4">Please notify us at least 24 hours in advance to cancel or reschedule. See our <a href="/cancellation-policy" className="text-primary underline">Cancellation Policy</a> for details.</p>
      </div>
    </div>
  );
} 