import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pro Learning | Civil Engineering Education Platform",
  description:
    "Master ETABS, SAP2000, RC Design & more. 200+ courses, Excel tools, and engineering resources.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
