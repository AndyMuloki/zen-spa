import React from "react";
import { Helmet } from "react-helmet-async";

export default function FAQ() {
  return (
    <>
      <Helmet>
        <title>FAQ - Mimi Spa</title>
        <meta name="description" content="Find answers to frequently asked questions about booking, appointments, therapists, and our policies at Mimi Spa." />
        <meta property="og:title" content="FAQ - Mimi Spa" />
        <meta property="og:description" content="Find answers to frequently asked questions about booking, appointments, therapists, and our policies at Mimi Spa." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mimispa.spa/faq" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1600334129128-685c5582fd35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=630" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How do I book an appointment?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "You can book online through our website or call us directly at +254740006578."
                }
              },
              {
                "@type": "Question",
                "name": "What should I bring to my appointment?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Just yourself! We provide everything you need for your spa experience."
                }
              },
              {
                "@type": "Question",
                "name": "Can I request a specific therapist?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, you can request a therapist when booking, subject to availability."
                }
              },
              {
                "@type": "Question",
                "name": "What is your cancellation policy?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Please notify us at least 24 hours in advance to cancel or reschedule. See our Cancellation Policy for details."
                }
              }
            ]
          }
        `}</script>
      </Helmet>
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
    </>
  );
} 