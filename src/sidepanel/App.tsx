import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "@/components/Header";
import { BottomSheet } from "@/components/BottomSheet";
import { BSMeter } from "@/components/BSMeter";
import { SentimentSummary } from "@/components/SentimentSummary";
import { useSentimentStore } from "@/store/sentiment-store";

// Mock Data for demonstration
const MOCK_RESULT = {
  score: 84,
  label: "high" as const,
  pros: [
    "Incredible clarity and soundstage",
    "Best-in-class comfort for long use",
    "Seamless switching between devices"
  ],
  cons: [
    "Higher price point than competitors",
    "Foldable design feels a bit stiff initially",
    "Limited color options at launch"
  ],
  warnings: ["High fake review density", "Limited warranty in some regions"],
  platforms: ["Reddit", "TrustPilot"]
};

import { AuthView } from "@/components/auth/AuthView";
import { BottomNav } from "@/components/BottomNav";
import { HistoryView } from "@/components/history/HistoryView";
import { SettingsView } from "@/components/settings/SettingsView";

export const App: React.FC = () => {
  const {
    currentProduct, sentimentResult, isLoading, dailyLimit, scansUsed, isBottomSheetOpen, isAuthenticated,
    currentView, activeTab, setView, setLoading, setProduct, setResult, setBottomSheetOpen,
  } = useSentimentStore();

  useEffect(() => {
    // Simulate detecting a product on the page
    setProduct({
      name: "SoundMaster Pro Wireless Headphones",
      brand: "AudioTech",
      category: "Electronics",
    });
  }, [setProduct]);

  const handleAnalyze = () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setResult(MOCK_RESULT);
    }, 2000);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <motion.div
            key="home"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col flex-1"
          >
            {/* Usage Indicator & Headline */}
            <div className="px-6 pt-4 pb-2">
              <div className="flex justify-between items-center mb-4">
                <span className="font-bold text-[10px] text-muted-foreground uppercase tracking-widest">Daily Scans</span>
                <span className="bg-primary/10 px-2 py-0.5 rounded-full font-bold text-[10px] text-primary">
                  {scansUsed} / {dailyLimit} Used
                </span>
              </div>

              <h1 className="pt-2 font-bold text-foreground text-2xl leading-tight tracking-tight">
                Get started
              </h1>
              <p className="pt-2 font-normal text-muted-foreground text-sm leading-normal">
                Analyze e-commerce sentiment instantly with our AI tools.
              </p>
            </div>

            {/* Current Product Card */}
            <div className="flex-1 px-6 py-8">
              <AnimatePresence mode="wait">
                {currentProduct ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-4 bg-card shadow-sm p-5 border border-border rounded-xl"
                  >
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <span className="font-bold text-[10px] text-primary uppercase tracking-widest">{currentProduct.brand}</span>
                        <h3 className="font-bold text-card-foreground text-base leading-tight">
                          {currentProduct.name}
                        </h3>
                      </div>
                      <div className="flex justify-center items-center bg-muted rounded-lg size-8 shrink-0">
                        <span className="text-muted-foreground scale-75 material-symbols-outlined">category</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-muted-foreground text-xs">
                      <span className="text-sm material-symbols-outlined">public</span>
                      Scanning 5+ platforms...
                    </div>
                  </motion.div>
                ) : (
                  <div className="flex flex-col justify-center items-center h-48 text-muted-foreground text-sm italic">
                    No product detected on current page.
                  </div>
                )}
              </AnimatePresence>
            </div>

            {/* Action Button */}
            <div className="px-6 py-8">
              <button
                onClick={handleAnalyze}
                disabled={isLoading || !currentProduct}
                className="flex justify-center items-center gap-3 bg-primary hover:opacity-90 disabled:opacity-50 shadow-lg shadow-primary/20 px-5 rounded-xl w-full h-14 overflow-hidden font-bold text-primary-foreground text-base leading-normal tracking-tight active:scale-[0.98] transition-all cursor-pointer disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full size-5 animate-spin" />
                    <span>Analyzing Product...</span>
                  </>
                ) : (
                  <>
                    <span className="truncate">Analyze with Sentiment IQ</span>
                    <span className="text-[20px] material-symbols-outlined">arrow_forward</span>
                  </>
                )}
              </button>
            </div>

            <footer className="space-y-4 px-6 pb-8 text-center">
              <p className="text-muted-foreground text-sm">
                Already have an account?
                <button
                  onClick={() => setView('AUTH')}
                  className="ml-1 font-bold text-primary hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </p>
              <p className="px-4 text-[10px] text-muted-foreground">
                By continuing, you agree to Sentiment IQ's <br />
                <a className="underline" href="#">Terms of Service</a> and <a className="underline" href="#">Privacy Policy</a>.
              </p>
            </footer>
          </motion.div>
        );
      case 'history':
        return <HistoryView />;
      case 'settings':
        return <SettingsView />;
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col bg-background selection:bg-primary/10 h-screen overflow-hidden font-nunito text-foreground transition-colors">
      <AnimatePresence mode="wait">
        {currentView === 'AUTH' ? (
          <div key="auth" className="flex flex-col flex-1 overflow-hidden">
            <AuthView />
          </div>
        ) : (
          <div className="flex flex-col h-full overflow-hidden">
            <Header />

            <main className="flex-1 overflow-y-auto">
              <AnimatePresence mode="wait">
                {renderContent()}
              </AnimatePresence>
            </main>

            {isAuthenticated && (
              <BottomNav />
            )}

            <BottomSheet
              isOpen={isBottomSheetOpen}
              onClose={() => setBottomSheetOpen(false)}
              title="Analysis Result"
            >
              <div className="flex flex-col items-center gap-8">
                <BSMeter score={sentimentResult?.score || 0} size={180} />
                <SentimentSummary
                  pros={sentimentResult?.pros || []}
                  cons={sentimentResult?.cons || []}
                  warnings={sentimentResult?.warnings || []}
                />
                <button
                  onClick={() => setBottomSheetOpen(false)}
                  className="bg-secondary hover:opacity-90 rounded-xl w-full h-12 font-bold text-secondary-foreground transition-colors"
                >
                  Close Result
                </button>
              </div>
            </BottomSheet>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
