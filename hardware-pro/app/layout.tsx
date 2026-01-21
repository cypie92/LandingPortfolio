import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import CartDrawer from "./components/CartDrawer";
import WhatsAppWidget from "./components/WhatsAppWidget";
import Footer from "./components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  display: "swap",
});

export const metadata: Metadata = {
  title: "HardwarePro - Built for the Bold",
  description: "Professional grade tools for your next masterpiece.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`} suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-body bg-background-light dark:bg-background-dark text-slate-900 dark:text-text-main">
        {children}
        <CartDrawer />
        <WhatsAppWidget />
        <Footer />
      </body>
    </html>
  );
}
