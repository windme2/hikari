import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const title = "Hikari | Made-to-measure curtains & blinds in Bangkok";
const description =
  "Curtains, sheers and blinds made to measure for your windows. Free home measuring and installation across greater Bangkok.";

export const metadata: Metadata = {
  // Share images need absolute URLs. Set SITE_URL in production; on Vercel, Next.js falls back to the project URL.
  metadataBase: process.env.SITE_URL ? new URL(process.env.SITE_URL) : undefined,
  title,
  description,
  // The image itself comes from app/opengraph-image.tsx
  openGraph: { type: "website", siteName: "Hikari", locale: "en_US", title, description },
  twitter: { card: "summary_large_image", title, description },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${sans.variable} antialiased`}>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
