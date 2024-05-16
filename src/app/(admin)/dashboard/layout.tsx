import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Dashboard | Portfolio",
  description: "This is a user dashboard for my portfolio website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
        {children}
    </main>
  );
}
