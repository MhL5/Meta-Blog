import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import SvgBackground from "@/components/SvgBackground";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import Providers from "@/Providers/Providers";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import { type ReactNode } from "react";
import TempUnderDev from "./TempUnderDev";

type layoutProps = Readonly<{
  children: ReactNode;
}>;

const fontSans = FontSans({ subsets: ["latin-ext"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL(String(process.env.NEXT_PUBLIC_APPLICATION_DOMAIN)),
  title: "Meta Blog",
  description:
    "Meta blog is a blog application full of articles about various topics, completely free.",
  keywords: [
    "Meta Blog",
    "blog",
    "articles",
    "free articles",
    "code",
    "javascript",
    "react",
    "git",
    "github",
    "frontend",
    "coding blog",
    "coding articles",
  ],
  authors: [
    { name: "Mohammad Hosein Lashani", url: "https://github.com/MhL5" },
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Meta Blog",
    description:
      "Meta blog is a blog application full of articles about various topics, completely free.",
    url: String(process.env.NEXT_PUBLIC_APPLICATION_DOMAIN),
    type: "website",
    images: [
      {
        url: "/meta-blog-thumbnail.png",
        width: 800,
        height: 600,
        alt: "Meta Blog Thumbnail",
      },
    ],
  },
};

export default function RootLayout({ children }: layoutProps) {
  return (
    // suppressHydrationWarning only works on level deep
    // it's safe to use, we are using it for Theme functionality
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers>
          <SvgBackground>
            <TempUnderDev />
            <Header />
            <main className="mx-auto w-full max-w-7xl">{children}</main>
          </SvgBackground>
          <Footer />
        </Providers>

        <Toaster />
      </body>
    </html>
  );
}
