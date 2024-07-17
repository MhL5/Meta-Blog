import type { Metadata } from "next";
import { type ReactNode } from "react";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import SvgBackground from "@/components/SvgBackground";
import Header from "@/components/layout/Header";
import Providers from "@/Providers/Providers";
import "@/styles/globals.css";
import Footer from "@/components/layout/Footer";

type layoutProps = Readonly<{
  children: ReactNode;
}>;

const fontSans = FontSans({ subsets: ["latin-ext"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Meta Blog",
  description:
    "Meta blog is a blog application full of articles about various topics, completely free.",
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
