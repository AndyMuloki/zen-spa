import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-2xl">
      <h1 className="text-3xl font-serif font-bold mb-6 text-primary">Privacy Policy</h1>
      <p className="mb-4 text-gray-200">Your privacy is important to us. This Privacy Policy explains how Mimi Spa collects, uses, and protects your information.</p>
      <h2 className="text-xl font-semibold mt-8 mb-2 text-primary">Information We Collect</h2>
      <ul className="list-disc ml-6 text-gray-200">
        <li>Personal information you provide (name, email, phone, etc.)</li>
        <li>Booking and contact form details</li>
        <li>Usage data (website analytics, cookies)</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2 text-primary">How We Use Your Information</h2>
      <ul className="list-disc ml-6 text-gray-200">
        <li>To provide and improve our services</li>
        <li>To communicate with you about bookings and offers</li>
        <li>To ensure site security and analytics</li>
      </ul>
      <h2 className="text-xl font-semibold mt-8 mb-2 text-primary">Your Rights</h2>
      <ul className="list-disc ml-6 text-gray-200">
        <li>You can request to view, update, or delete your personal data at any time.</li>
        <li>Contact us at info@mimispa.spa for privacy inquiries.</li>
      </ul>
      <p className="mt-8 text-gray-400 text-sm">This policy may be updated from time to time. Please check back for changes.</p>
    </div>
  );
} 