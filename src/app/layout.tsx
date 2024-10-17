import "./globals.css";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import Navbar from "@/components/navbar";

interface Props {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Nextjs Boilerplate",
  description:
    "A production-ready boilerplate for building modern web applications using Next.js",
};

export default function RootLayout({ children }: Props) {
  return (
    <SessionProvider>
      <html lang="en">
        <body>
          <Navbar />
          {children}
        </body>
      </html>
    </SessionProvider>
  );
}
