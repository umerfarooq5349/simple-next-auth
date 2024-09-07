import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@coreui/coreui/dist/css/coreui.min.css";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import AuthProvider from "@/context/authProvider";
import { FlashMessageProvider } from "@/context/flashMessageContext";
import FlashMessage from "@/components/flashMessages/flashMessage";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth",
  description: "Developed by Umer Farooq",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="con">
          <div className="contentttContainer">
            <AuthProvider>
              <FlashMessageProvider>
                <Navbar></Navbar>
                <FlashMessage />
                {children}
              </FlashMessageProvider>
            </AuthProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
