import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import ClientShell from "@/app/components/client-shell"; // <-- newly created component

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chat App",
  description: "A modern chat application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}
