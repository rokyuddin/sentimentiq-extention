import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Header } from "@/components/Header";
import { BottomSheet } from "@/components/BottomSheet";
import { BSMeter } from "@/components/BSMeter";
import { SentimentSummary } from "@/components/SentimentSummary";
import { useSentimentStore } from "@/store/sentiment-store";

const MOCK_RESULT = {
  score: 84,
  label: "high" as const,
  pros: ["Premium comfort", "Great sound", "Durable hinge"],
  cons: ["High price", "Heavyweight"],
  warnings: ["Stock levels low"],
  platforms: ["Reddit"]
};

import { BottomNav } from "@/components/BottomNav";

import { HistoryView } from "@/components/history/HistoryView";
import { SettingsView } from "@/components/settings/SettingsView";

import { AuthView } from "@/components/auth/AuthView";

export const App: React.FC = () => {
  const {
    currentProduct, sentimentResult, isLoading, dailyLimit, scansUsed, isBottomSheetOpen, isAuthenticated,
    currentView, activeTab, setView, setLoading, setProduct, setResult, setBottomSheetOpen
  } = useSentimentStore();

  useEffect(() => {
    setProduct({
      name: "SoundMaster Pro Wireless Headphones",
      brand: "AudioTech",
    });
  }, [setProduct]);

  const handleAnalyze = () => {
    setLoading(true);
    setTimeout(() => {
      setResult(MOCK_RESULT);
    }, 1500);
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
            className="flex flex-col"
          >
            <div className="px-6 pt-4 pb-2">
              <div className="flex justify-between items-center mb-3">
                <span className="font-bold text-[9px] text-muted-foreground uppercase tracking-widest">Usage Limit</span>
                <span className="bg-primary/10 px-2 py-0.5 rounded-full font-bold text-[9px] text-primary">
                  {scansUsed} / {dailyLimit} scans
                </span>
              </div>

              <h1 className="pt-1 font-bold text-foreground text-xl leading-tight tracking-tight">
                Analyze Product
              </h1>
              <p className="pt-1 font-normal text-muted-foreground text-xs leading-normal">
                Detecting sentiment from Reddit and forums...
              </p>
            </div>

            <div className="px-6 py-6 transition-all">
              {currentProduct && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card shadow-sm p-4 border border-border rounded-lg"
                >
                  <div className="space-y-1">
                    <span className="font-bold text-[9px] text-primary uppercase tracking-widest">{currentProduct.brand}</span>
                    <h3 className="font-bold text-card-foreground text-sm truncate leading-tight">
                      {currentProduct.name}
                    </h3>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="px-6 pb-6">
              <button
                onClick={handleAnalyze}
                disabled={isLoading || !currentProduct}
                className="flex justify-center items-center gap-3 bg-primary hover:opacity-90 disabled:opacity-50 shadow px-5 rounded-xl w-full h-12 font-bold text-primary-foreground text-sm active:scale-[0.98] transition-all cursor-pointer"
              >
                {isLoading ? (
                  <div className="border-2 border-primary-foreground/20 border-t-primary-foreground rounded-full size-4 animate-spin" />
                ) : (
                  <>
                    <span>Analyze with AI</span>
                    <span className="text-[18px] material-symbols-outlined">arrow_forward</span>
                  </>
                )}
              </button>
            </div>

            <footer className="space-y-4 px-6 pb-6 text-center">
              <p className="text-[10px] text-muted-foreground">
                Already have an account?
                <button
                  onClick={() => setView('AUTH')}
                  className="ml-1 font-bold text-primary hover:underline cursor-pointer"
                >
                  Sign in
                </button>
              </p>
              <p className="px-4 text-[9px] text-muted-foreground">
                Powered by Sentiment IQ AI
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
    <div className="flex flex-col bg-background border border-border rounded-xl w-[360px] h-[550px] overflow-hidden font-nunito">
      <AnimatePresence mode="wait">
        {currentView === 'AUTH' ? (
          <AuthView key="auth" />
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
              <div className="flex flex-col items-center gap-6">
                <BSMeter score={sentimentResult?.score || 0} size={140} />
                <SentimentSummary
                  pros={sentimentResult?.pros || []}
                  cons={sentimentResult?.cons || []}
                  warnings={sentimentResult?.warnings || []}
                />
              </div>
            </BottomSheet>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
