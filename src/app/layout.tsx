import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron, Share_Tech_Mono, Kode_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import NavBar from "@/components/NavBar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Banner } from "@/components/ui/Banner";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-mono-nmc",
  subsets: ["latin"],
  weight: "400",
});

const kodeMono = Kode_Mono({
  variable: "--font-kode-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "THE NEURONOMICON",
  description: "A one-person cinematic universe — stories, lore, and interactive tools set in a far-future humanity building artificial gods to conquer the stars.",
  icons: {
    icon: "/star.png",
    shortcut: "/star.png",
    apple: "/star.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} ${shareTechMono.variable} ${kodeMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Banner />
          {children}
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
