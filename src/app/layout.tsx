import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <AuthProvider>
        <body className={`${inter.className} bg-gradient-to-br from-purple-700 to-blue-950`}>
          <Toaster />
          {children}
        </body>
      </AuthProvider>
    </html>
  );
}
