import type { Metadata } from "next";
import { Geist, Geist_Mono, Montserrat, Poppins } from "next/font/google";

import TopNavbar from "./components/navbar/topnavbar/TopNavbar";
import BottomNavbar from "./components/navbar/bottomnavbar/BottomNavbar";
import "./globals.css";
import Footer from "./components/footer/Footer";
import "@smastrom/react-rating/style.css";
import NewsLetter from "./components/newsletter/Newsletter";
import ProviderStoreClient from "./features/ProvidorStoreClient.js"
import QueryProvider from "./components/reacrquery/QueryProvider";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap", // Optional: Improves performance
});
const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Tronix | Buy Now",
  description: "Our motto is giving you the best service",
    icons: {
    icon: "/favicon.ico",                      // for regular browser tab icon
    shortcut: "/favicon.ico",                  // for pinned tabs/bookmarks
    apple: "/apple-touch-icon.png",            // for Apple devices
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <div
        className={`
          ${geistSans.variable}
          ${geistMono.variable}
          ${montserrat.variable}
          ${poppins.variable}
          antialiased
        `}
      >
        <QueryProvider>
        <ProviderStoreClient>
             <div className="w-full md:mx-0 lg:mx-auto">
            <div className="lg:mx-40 relative">
              <TopNavbar />
              <hr className="text-gray-300" />
              <BottomNavbar />
              {children}
              <div className="lg:-mx-40 bg-hover-social mt-10 lg:mt-20">
                <div className="lg:mx-40 py-[69px]">
                  <NewsLetter />
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </ProviderStoreClient>
      </QueryProvider>
      </div>
  );
}
