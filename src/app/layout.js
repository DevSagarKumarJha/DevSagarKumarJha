import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "DevSagarKumarJha",
  description: "FullStack web/app developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
      <Script src="https://kit.fontawesome.com/ada3756beb.js"/>
    </html>
  );
}
