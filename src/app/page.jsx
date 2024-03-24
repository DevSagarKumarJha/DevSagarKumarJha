import AboutSection from "@/components/AboutSection";
import IntroSection from "@/components/IntroSection";

export default function Home() {
  return (
    <main className="flex flex-col p-10 bg-gray-900 h-screen">
      <IntroSection/>
      <AboutSection/>
    </main>
  );
}
