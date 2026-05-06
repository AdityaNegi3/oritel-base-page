import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { SiteBackground } from "./components/SiteBackground";
import { LampDemo } from "./components/LampDemo";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Pricing } from "./components/Pricing";
import { CTABanner } from "./components/CTABanner";
import { Footer } from "./components/Footer";
import { AuthModal, type UserInfo } from "./components/AuthModal";

const API = import.meta.env.VITE_API_URL || "";

export default function App() {
  const [authToken, setAuthToken] = useState<string | null>(
    () => localStorage.getItem("oritel_token")
  );
  const [user, setUser] = useState<UserInfo | null>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [pendingCallback, setPendingCallback] = useState<(() => void) | null>(null);

  // Restore user info from stored token on mount
  useEffect(() => {
    const token = localStorage.getItem("oritel_token");
    if (!token) return;
    fetch(`${API}/api/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setUser(data.user))
      .catch(() => {
        // Token invalid/expired — clear it
        localStorage.removeItem("oritel_token");
        setAuthToken(null);
      });
  }, []);

  const requireAuth = (callback: () => void) => {
    if (authToken) {
      callback();
    } else {
      setPendingCallback(() => callback);
      setShowAuthModal(true);
    }
  };

  const handleAuthSuccess = (token: string, userInfo: UserInfo) => {
    setAuthToken(token);
    setUser(userInfo);
    setShowAuthModal(false);
    if (pendingCallback) {
      pendingCallback();
      setPendingCallback(null);
    }
  };

  const handleSignOut = () => {
    setAuthToken(null);
    setUser(null);
    localStorage.removeItem("oritel_token");
  };

  return (
    <SiteBackground>
      <div className="min-h-screen font-inter">
        <style>{`
          .font-playfair { font-family: 'Playfair Display', serif; }
          .font-inter { font-family: 'Inter', sans-serif; }
        `}</style>

        <Navbar
          user={user}
          onSignIn={() => setShowAuthModal(true)}
          onSignOut={handleSignOut}
        />
        <LampDemo />
        <Features />
        <HowItWorks />
        <Pricing authToken={authToken} onAuthRequired={requireAuth} />
        <CTABanner onGetStarted={() => requireAuth(() => {})} />
        <Footer />

        <AuthModal
          open={showAuthModal}
          onClose={() => { setShowAuthModal(false); setPendingCallback(null); }}
          onSuccess={handleAuthSuccess}
        />
      </div>
    </SiteBackground>
  );
}
