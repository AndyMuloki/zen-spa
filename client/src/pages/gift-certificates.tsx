import React from "react";

export default function GiftCertificates() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-2xl">
      <h1 className="text-3xl font-serif font-bold mb-6 text-primary">Gift Certificates</h1>
      <p className="mb-4 text-gray-200">Give the gift of relaxation and wellness with a Mimi Spa gift certificate.</p>
      <ul className="list-disc ml-6 text-gray-200">
        <li>Available in any amount or for specific services/packages</li>
        <li>Beautifully presented and easy to purchase</li>
        <li>Perfect for birthdays, anniversaries, and special occasions</li>
        <li>Contact us at info@mimispa.spa or visit our spa to purchase</li>
      </ul>
      <p className="mt-8 text-gray-400 text-sm">Gift certificates are non-refundable and valid for one year from the date of purchase.</p>
    </div>
  );
} 