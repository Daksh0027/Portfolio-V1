import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YOUR NAME — Independent Brand & Web Designer",
  description: "YOUR NAME is an independent brand and web designer helping SaaS and AI companies communicate with clarity.",
  openGraph: {
    title: "YOUR NAME — Independent Brand & Web Designer",
    description: "Independent brand and web design for SaaS and AI companies.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "YOUR NAME — Independent Brand & Web Designer",
    description: "Independent brand and web design for SaaS and AI companies.",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body className="min-h-[100dvh] bg-black text-white antialiased selection:bg-[#fc7814] selection:text-white">
        {children}
      </body>
    </html>
  );
}
