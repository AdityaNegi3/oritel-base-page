import { Navbar } from "./components/Navbar";
import { SiteBackground } from "./components/SiteBackground";
import { LampDemo } from "./components/LampDemo";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Pricing } from "./components/Pricing";

import { Footer } from "./components/Footer";

export default function App() {
  return (
    <SiteBackground>
      <div className="min-h-screen font-inter">
        <style>{`
          .font-playfair { font-family: 'Playfair Display', serif; }
          .font-inter { font-family: 'Inter', sans-serif; }
        `}</style>

        <Navbar />
        <LampDemo />
        <Features />
        <HowItWorks />
        <Pricing />
        <Footer />
      </div>
    </SiteBackground>
  );
}
