"use client";

import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode, useState } from "react";
import { PokemonProvider } from "./context/PokemonContext";
import { PaginationProvider } from "./context/PaginationContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const queryClient = new QueryClient();

export default function RootLayout({children}: { children: ReactNode }) {

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <QueryClientProvider client={queryClient}>
          <PaginationProvider> 
            <PokemonProvider>
              <Navbar />
              <div style={{ flex: 1 }}>{children}</div>
              <Footer />
            </PokemonProvider>
          </PaginationProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
