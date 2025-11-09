"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav
      className="bg-gray-800 text-white py-3 px-6 flex justify-between items-center"
        style={{
            width: '100%',
            backgroundColor: '#333',
            padding: '10px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'white',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}
    >
        <Link href="/" style={{ color: 'white', textDecoration: 'none' }}>
          <h2>Home</h2>
        </Link>
        <div className="flex gap-4">
          <Link href="/favorites" className="hover:underline">
           <h2>Favorites</h2>
          </Link>
        </div>
    </nav>
  );
}
