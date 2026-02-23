import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "BookStore — Discover Your Next Great Read",
  description:
    "Browse and shop from our curated collection of books across all genres.",
  keywords: ["books", "bookstore", "reading", "fiction", "non-fiction"],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans min-h-screen flex flex-col antialiased`}
      >
        <CartProvider>
          <Navbar />
          {/* ✅ Changed: flex-grow → grow */}
          <main className="grow">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}