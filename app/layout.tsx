import type { Metadata } from "next";
import { Poppins, Open_Sans } from "next/font/google";
import "./globals.css";
import { TunisProvider } from "@/contexts/TunisContext";
import metadataJson from "@/data/metadata.json";
import Navbar from "@/components/Navbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-open-sans",
});

export const metadata: Metadata = metadataJson;

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TunisProvider>
      <html
        lang="en"
        className={`${poppins.variable} ${openSans.variable} overflow-x-hidden min-h-screen`}
      >
        <head>
          <link rel="stylesheet" href={`${basePath}/assets/css/skins/blue.css`} />
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
            integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
        </head>
        <body className="font-Poppins text-fs-16 font-medium leading-lh-1.6 text-zinc-100 bg-[#08080a]">
          {/* Aurora background dynamic lights */}
          <div className="fixed inset-0 -z-50 overflow-hidden bg-[#070709] pointer-events-none select-none">
            <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-blue-600/10 blur-[130px] animate-aurora-slow" />
            <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-indigo-600/10 blur-[130px] animate-aurora-medium" />
          </div>

          <Navbar />
          <div className="relative w-full min-h-screen">
            {children}
          </div>
        </body>
      </html>
    </TunisProvider>
  );
}
