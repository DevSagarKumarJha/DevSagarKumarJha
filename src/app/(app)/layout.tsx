import Navbar from "@/components/MainComponents/Navbar";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        <Navbar/>
        {children}
    </main>
  );
}
