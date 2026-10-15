import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daksh Shastri — Frontend Developer & Competitive Programmer",
  description: "Frontend developer and competitive programmer building load-bearing web systems in Delhi.",
  openGraph: {
    title: "Daksh Shastri — Frontend Developer",
    description: "Frontend developer and competitive programmer building load-bearing web systems in Delhi.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daksh Shastri — Frontend Developer",
    description: "Frontend developer and competitive programmer building load-bearing web systems in Delhi.",
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
