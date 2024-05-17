import { Footer } from "@/components/MainComponents/Footer";
import Navbar from "@/components/MainComponents/Navbar";
import { Metadata } from "next";


export const metadata: Metadata={
  title: "Sagar Kumar Jha | Home page"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        <Navbar/>
        {children}
        <Footer/>
    </main>
  );
}
