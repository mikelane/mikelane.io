import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Michael Lane — The Workshop",
    template: "%s | Michael Lane",
  },
  description:
    "I build tools that make complex systems accessible, fast, and invisible.",
  metadataBase: new URL("https://mikelane.io"),
  openGraph: {
    title: "Michael Lane — The Workshop",
    description:
      "I build tools that make complex systems accessible, fast, and invisible.",
    url: "https://mikelane.io",
    siteName: "Michael Lane",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Lane — The Workshop",
    description:
      "I build tools that make complex systems accessible, fast, and invisible.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <body className={`${GeistSans.className} antialiased`}>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-[var(--color-accent)] focus:px-4 focus:py-2 focus:text-black focus:font-medium"
        >
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
