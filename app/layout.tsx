import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Premium Real Estate Platform | Find Your Dream Property",
  description:
    "Discover exceptional real estate investment opportunities with proven ROI. Browse featured properties, commercial spaces, and prime land plots.",
  keywords: [
    "real estate",
    "property investment",
    "commercial real estate",
    "land plots",
    "ROI calculator",
  ],
  authors: [{ name: "Real Estate Platform" }],
  openGraph: {
    type: "website",
    title: "Premium Real Estate Platform",
    description:
      "Discover exceptional real estate investment opportunities with proven ROI",
    siteName: "Real Estate Platform",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
