import React from "react";
import { HistoryItem as IHistoryItem, useSentimentStore } from "@/store/sentiment-store";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";

interface Props {
    item: IHistoryItem;
    index: number;
}

export const HistoryItem: React.FC<Props> = ({ item, index }) => {
    const { setResult, setBottomSheetOpen } = useSentimentStore();

    const getScoreColor = (score: number) => {
        if (score >= 80) return "text-success bg-success/10 border-success/20";
        if (score >= 60) return "text-warning bg-warning/10 border-warning/20";
        return "text-destructive bg-destructive/10 border-destructive/20";
    };

    const getSentimentIcon = (score: number) => {
        if (score >= 80) return "sentiment_very_satisfied";
        if (score >= 60) return "sentiment_satisfied";
        return "sentiment_dissatisfied";
    };

    const formatTimestamp = (timestamp: number) => {
        const now = Date.now();
        const diff = now - timestamp;
        const hours = Math.floor(diff / 3600000);
        if (hours < 1) return "Just now";
        if (hours < 24) return `${hours}h ago`;
        const days = Math.floor(hours / 24);
        if (days === 1) return "Yesterday";
        return `${days}d ago`;
    };

    const handleClick = () => {
        setResult(item.result);
        setBottomSheetOpen(true);
    };

    return (
        <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={handleClick}
            className="group flex justify-between items-center bg-card hover:bg-muted/50 shadow-sm p-4 border border-border rounded-xl w-full text-left active:scale-[0.98] transition-all"
        >
            <div className="flex items-center gap-3 min-w-0">
                <div className={cn(
                    "flex justify-center items-center border rounded-lg size-10 shrink-0",
                    getScoreColor(item.result.bsScore)
                )}>
                    <span className="text-[20px] material-symbols-outlined">
                        {getSentimentIcon(item.result.bsScore)}
                    </span>
                </div>

                <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="font-bold text-[9px] text-primary truncate uppercase tracking-widest">
                            {item.product.brand || "Product"}
                        </span>
                        <span className="font-medium text-[9px] text-muted-foreground">•</span>
                        <span className="font-medium text-[9px] text-muted-foreground uppercase tracking-widest">
                            {formatTimestamp(item.timestamp)}
                        </span>
                    </div>
                    <h3 className="font-bold text-foreground group-hover:text-primary text-sm truncate transition-colors">
                        {item.product.name}
                    </h3>
                </div>
            </div>

            <div className="flex flex-col items-end pl-2 shrink-0">
                <span className={cn(
                    "px-2 py-0.5 border rounded-full font-bold text-xs",
                    getScoreColor(item.result.bsScore)
                )}>
                    {item.result.bsScore}
                </span>
                <span className="mt-1 font-medium text-[10px] text-muted-foreground capitalize">
                    {item.result.trustLevel}
                </span>
            </div>
        </motion.button>
    );
};
