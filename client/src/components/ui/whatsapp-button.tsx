import { FaWhatsapp } from "react-icons/fa";

interface WhatsAppButtonProps {
  phoneNumber: string; // In international format, e.g. "15551234567"
  message?: string;    // Optional pre-filled message
}

export default function WhatsAppButton({ phoneNumber, message }: WhatsAppButtonProps) {
  // WhatsApp link format
  const baseUrl = "https://wa.me/";
  const url =
    baseUrl +
    phoneNumber +
    (message ? `?text=${encodeURIComponent(message)}` : "");

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="
        fixed z-50 bottom-6 right-6
        bg-green-500 hover:bg-green-600 active:bg-green-700
        rounded-full shadow-lg
        w-16 h-16 flex items-center justify-center
        transition-all duration-200
        hover:scale-110 active:scale-95
        focus:outline-none focus:ring-4 focus:ring-green-300
        group
      "
    >
      <FaWhatsapp className="text-white text-3xl group-hover:animate-bounce" />
      <span className="sr-only">Chat with us on WhatsApp</span>
    </a>
  );
}
