import type { Metadata } from "next";
import "./globals.css";
import { TunisProvider } from "@/contexts/TunisContext";
import metadataJson from "@/data/metadata.json";

export const metadata: Metadata = metadataJson;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TunisProvider>
      <html
        lang="en"
        className="overflow-x-hidden h-full"
      >
        <head>
          <link rel="stylesheet" href="/assets/css/skins/blue.css" />
        </head>
        <body className="font-Poppins text-fs-16 font-medium leading-lh-1.6">
          <div className="home dark bg-black text-white relative w-full h-full overflow-hidden anim--effect-3 animation-top">
            {children}
          </div>
        </body>
      </html>
    </TunisProvider>
  );
}
