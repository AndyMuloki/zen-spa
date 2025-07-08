import { Link } from "wouter";

export default function NotFound() {
  return (
    <div
      className="relative min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1510027580951-31747e2371a9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        fontFamily: "'Montserrat', sans-serif",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative z-10 bg-black bg-opacity-50 p-10 rounded-lg text-center">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-8">Page Not Found</p>
        <p className="mb-8">The tranquility you seek is on another path.</p>
        <Link href="/">
          <a className="bg-white text-gray-800 font-bold py-2 px-4 rounded hover:bg-gray-200 transition-colors">
            Return to Homepage
          </a>
        </Link>
          </div>
    </div>
  );
}
