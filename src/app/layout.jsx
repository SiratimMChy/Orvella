import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layouts/Navbar";
import Footer from "@/components/layouts/Footer";
import NextAuthProvider from "@/components/providers/NextAuthProvider";
import { Suspense } from "react";

const poppins = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["100", "200", "400", "500", "600", "700", "800"],
});


export const metadata = {
  metadataBase: new URL("https://orvella.vercel.app"),
  title: {
    default: "Orvella | Men, Women & Kids Clothing",
    template: "%s | Orvella",
  },
  description: "Shop premium fashion at Orvella. Discover trendy clothing for men, women & kids. Quality garments, best prices, fast delivery. Your style destination in Bangladesh.",
  keywords: [
    "Orvella",
    "fashion store",
    "premium clothing",
    "men's fashion",
    "women's fashion",
    "kids clothing",
    "online shopping Bangladesh",
    "trendy clothes",
    "best sellers",
    "new arrivals",
    "quality garments",
    "affordable fashion",
    "clothing store",
    "fashion trends",
    "style destination"
  ],
  authors: [{ name: "Orvella Fashion Team" }],
  creator: "Orvella",
  publisher: "Orvella Fashion Store",
  applicationName: "Orvella",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },

  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Orvella - Premium Fashion for Everyone",
    description: "Discover premium fashion at Orvella. Shop the latest trends in men's, women's, and kids' clothing. Quality guarantee & fast delivery.",
    url: "https://orvella.vercel.app",
    siteName: "Orvella Fashion Store",
    images: [
      {
        url: "https://i.ibb.co.com/hJbk51BM/image.png",
        width: 1200,
        height: 630,
        alt: "Orvella - Premium Fashion Store Homepage",
        type: "image/png",
      },
      {
        url: "https://i.ibb.co.com/bjYxg5HB/image.png",
        width: 1200,
        height: 630,
        alt: "Orvella - Product Collection",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "Bangladesh",
  },
  twitter: {
    card: "summary_large_image",
    title: "Orvella - Premium Fashion for Everyone",
    description: "Shop premium fashion at Orvella. Quality clothing for men, women & kids with fast delivery.",
    images: ["https://i.ibb.co.com/hJbk51BM/image.png"],
    creator: "@orvella_fashion",
    site: "@orvella_fashion",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/safari-pinned-tab.svg",
        color: "#ef4444",
      },
    ],
  },
  manifest: "/site.webmanifest",
  other: {
    "msapplication-TileColor": "#ef4444",
    "theme-color": "#ffffff",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Orvella",
    "mobile-web-app-capable": "yes",
    "msapplication-starturl": "/",
  },
  verification: {
    google: "your-google-site-verification",
    other: {
      "facebook-domain-verification": "your-facebook-verification",
    },
  },
  category: "shopping",
  classification: "Fashion & Clothing",
};

export default function RootLayout({ children }) {
  return (
    <NextAuthProvider>
    <html lang="en">
      <body
        className={`${poppins.className} antialiased`}
      >
          <header className="shadow-md">
            <div className="py-2 md:w-11/12 mx-auto">
              <Navbar />
            </div>
          </header>
          <main className="py-2 md:w-11/12 mx-auto min-h-[calc(100svh-285px)]">
            <Suspense fallback={<div>Loading...</div>}>
              {children}
            </Suspense>
          </main>
          <footer className="bg-amber-100">
            <div className="py-2 md:w-11/12 mx-auto">
              <Footer />
            </div>
          </footer>
        
      </body>
    </html>
    </NextAuthProvider>
  );
}
