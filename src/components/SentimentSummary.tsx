import React from "react";
import { motion } from "motion/react";

interface SentimentSummaryProps {
    pros: string[];
    cons: string[];
    warnings: string[];
}

export const SentimentSummary: React.FC<SentimentSummaryProps> = ({ pros, cons, warnings }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 },
        },
    };

    const itemVariants = {
        hidden: { y: 10, opacity: 0 },
        visible: { y: 0, opacity: 1 },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6 font-nunito"
        >
            {/* Red Flags / Warnings */}
            {warnings.length > 0 && (
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-destructive">
                        <span className="text-[20px] material-symbols-outlined">warning</span>
                        <h4 className="font-bold text-xs uppercase tracking-widest">Critical Warnings</h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {warnings.map((w, i) => (
                            <motion.div
                                key={i}
                                variants={itemVariants}
                                className="bg-destructive/10 px-3 py-1.5 border border-destructive/20 rounded-lg font-bold text-[11px] text-destructive"
                            >
                                {w}
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Strengths & Weaknesses */}
            <div className="gap-4 grid grid-cols-1">
                <div className="space-y-3">
                    <div className="flex items-center gap-2 text-success">
                        <span className="text-[20px] material-symbols-outlined">check_circle</span>
                        <h4 className="font-bold text-xs uppercase tracking-widest">Key Strengths</h4>
                    </div>
                    <ul className="space-y-2.5">
                        {pros.map((p, i) => (
                            <motion.li key={i} variants={itemVariants} className="flex gap-3 text-muted-foreground text-sm leading-normal">
                                <span className="pt-0.5 text-success">•</span>
                                {p}
                            </motion.li>
                        ))}
                    </ul>
                </div>

                <div className="space-y-3 pt-2">
                    <div className="flex items-center gap-2 text-warning">
                        <span className="text-[20px] material-symbols-outlined">cancel</span>
                        <h4 className="font-bold text-xs uppercase tracking-widest">Recurring Issues</h4>
                    </div>
                    <ul className="space-y-2.5">
                        {cons.map((c, i) => (
                            <motion.li key={i} variants={itemVariants} className="flex gap-3 text-muted-foreground text-sm leading-normal">
                                <span className="pt-0.5 text-warning">•</span>
                                {c}
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
};
