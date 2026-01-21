import React from "react";
import { useSentimentStore } from "@/store/sentiment-store";
import { HistoryItem } from "./HistoryItem";
import { motion, AnimatePresence } from "motion/react";

export const HistoryView: React.FC = () => {
    const { history, clearHistory, setActiveTab } = useSentimentStore();

    return (
        <div className="flex flex-col bg-background h-full font-nunito">
            {/* Header Section */}
            <div className="flex justify-between items-center px-6 pt-4 pb-4">
                <div>
                    <h2 className="font-bold text-foreground text-xl leading-tight tracking-tight">
                        Recent Analyses
                    </h2>
                    <p className="mt-0.5 text-muted-foreground text-xs">
                        {history.length} items found
                    </p>
                </div>
                {history.length > 0 && (
                    <button
                        onClick={clearHistory}
                        className="font-bold text-[10px] text-muted-foreground hover:text-destructive uppercase tracking-wider transition-colors cursor-pointer"
                    >
                        Clear All
                    </button>
                )}
            </div>

            {/* Main List Area */}
            <div className="flex-1 space-y-3 px-6 pb-6 overflow-y-auto custom-scrollbar">
                <AnimatePresence mode="popLayout" initial={false}>
                    {history.length > 0 ? (
                        history.map((item, index) => (
                            <HistoryItem key={item.id} item={item} index={index} />
                        ))
                    ) : (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex flex-col justify-center items-center pt-12 text-center"
                        >
                            <div className="flex justify-center items-center bg-muted mb-4 rounded-full size-16">
                                <span className="text-muted-foreground text-3xl material-symbols-outlined">history</span>
                            </div>
                            <h3 className="font-bold text-foreground text-base">No history yet</h3>
                            <p className="mt-1 px-8 text-muted-foreground text-xs">
                                Your analyzed products will appear here for quick access.
                            </p>
                            <button
                                onClick={() => setActiveTab('home')}
                                className="bg-primary hover:opacity-90 shadow-sm mt-6 px-5 py-2.5 rounded-lg font-bold text-primary-foreground text-xs active:scale-95 transition-all cursor-pointer"
                            >
                                Back to Home
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
