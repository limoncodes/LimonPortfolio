import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "Limon Islam — Frontend Developer & Aspiring Full Stack Developer",
  description:
    "Personal portfolio of Limon Islam (Limon Codes) — Frontend Developer & Aspiring Full Stack Developer. Building modern, responsive, and user-friendly web experiences.",
  keywords: [
    "Limon Islam",
    "Limon Codes",
    "Frontend Developer",
    "Full Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Web Developer Bangladesh",
    "Portfolio",
  ],
  authors: [{ name: "Limon Islam", url: "https://limoncodes.dev" }],
  creator: "Limon Islam",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://limoncodes.dev",
    title: "Limon Islam — Frontend Developer & Aspiring Full Stack Developer",
    description:
      "Personal portfolio of Limon Islam — building modern, responsive, and user-friendly web experiences.",
    siteName: "Limon Codes",
  },
  twitter: {
    card: "summary_large_image",
    title: "Limon Islam — Frontend Developer",
    description:
      "Personal portfolio of Limon Islam — building modern, responsive web experiences.",
    creator: "@limoncodes",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full`}
    >
      <body className="min-h-full antialiased" style={{ backgroundColor: "#09070B", color: "#F5F0FA" }}>
        {children}
      </body>
    </html>
  );
}
