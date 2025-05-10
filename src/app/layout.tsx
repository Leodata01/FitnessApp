import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "@/providers/ConvexClerkProvider";
import { Navbar } from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

// Define primary and secondary fonts using Geist
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Define monospace font using Geist Mono
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Define metadata for the application
export const metadata: Metadata = {
  title: "Fitness App - Get Jacked",
  description: "Modern fitness app to get you jacked for free",
};

// Root layout component for the application
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Provides Convex and Clerk context to the application
    <ConvexClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {/* Application Navbar */}
          <Navbar />
          {/* Background styling with gradient and grid */}
          <div className="fixed inset-0 -z-1">
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-background"></div>
            <div className="absolute inset-0 bg-[linear-gradient(var(--cyber-grid-color)_1px,transparent_1px),linear-gradient(90deg,var(--cyber-grid-color)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          </div>
          {/* Main content area */}
          <main className="pt-24 flex-grow">{children}</main>
          {/* Application Footer */}
          <Footer />
        </body>
      </html>
    </ConvexClerkProvider>
  );
}
