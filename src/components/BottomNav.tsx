import React from "react";
import { useSentimentStore } from "@/store/sentiment-store";
import { cn } from "@/lib/utils";

const tabs = [
    { id: "home", label: "Home", icon: "home" },
    { id: "history", label: "History", icon: "history" },
    { id: "settings", label: "Settings", icon: "settings" },
] as const;

export const BottomNav: React.FC = () => {
    const { activeTab, setActiveTab } = useSentimentStore();

    return (
        <nav className="flex justify-between items-center bg-background shadow-[0_-2px_10px_rgba(0,0,0,0.02)] px-4 py-2 border-border border-t">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                        "flex flex-col items-center gap-1 px-3 py-1 rounded-lg active:scale-95 transition-all cursor-pointer",
                        activeTab === tab.id
                            ? "text-primary bg-primary/5"
                            : "text-muted-foreground hover:text-foreground"
                    )}
                >
                    <span className={cn(
                        "text-[20px] material-symbols-outlined",
                        activeTab === tab.id && "fill-1"
                    )}>
                        {tab.icon}
                    </span>
                    <span className="font-bold text-[10px] uppercase tracking-wider">{tab.label}</span>
                </button>
            ))}
        </nav>
    );
};
