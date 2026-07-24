import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Prabesh Tamang — Nepal Guides, Civic Tips & Everyday How-Tos",
  description:
    "Practical guides, civic how-tos, travel tips, and free tools for everyday life in Nepal.",
};

const defaultSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Prabesh Tamang",
  url: "https://prabeshlamatamang.com.np",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(defaultSchema) }}
        />
      </head>
      <body className="flex min-h-screen flex-col font-body">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
