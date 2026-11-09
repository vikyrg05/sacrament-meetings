import type { Metadata } from "next";
import { Suspense } from "react";
import { Geist, Geist_Mono } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sacrament Meeting Planner",
  description: "Plan and view sacrament meetings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Suspense
          fallback={
            <header className="bg-blue-900 px-6 py-5 text-white">
              <div className="mx-auto max-w-6xl">
                <p className="text-sm text-blue-200">Rosedal Ward</p>
                <p className="text-xl font-bold">
                  Sacrament Meeting Planner
                </p>
              </div>
            </header>
          }
        >
          <Header />
        </Suspense>

        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}