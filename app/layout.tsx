import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Daksh Shastri · Frontend Developer & Systems Engineer",
  description: "Portfolio of Daksh Shastri. Frontend developer and competitive programmer building load-bearing web systems in Delhi.",
  openGraph: {
    title: "Daksh Shastri · Portfolio",
    description: "Frontend developer and competitive programmer building load-bearing web systems in Delhi.",
    type: "website",
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
      <body className="min-h-[100dvh] bg-[#0c0e0d] text-[#f2f5f3] antialiased selection:bg-[#c6f19d] selection:text-[#0c0e0d]">
        {children}
      </body>
    </html>
  );
}
